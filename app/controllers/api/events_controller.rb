class Api::EventsController < ApplicationController
  include Api::EventsHelper
  before_action :require_logged_in, only: [:create, :destroy]

  def index
    if logged_in?
      @events = Event.where('start >= ?', DateTime.now)
      .where("creator_id != ?", current_user.id)
    else
      @events = Event.where('start >= ?', DateTime.now)
    end

    @events.each do |event|
        registrations = event.registrations
        gross = 0
        ticketInfo = Ticket.joins(:registrations)
        .select('sum(quantity_purchased * tickets.price) AS "gross", sum(quantity_purchased) AS "tickets_sold"')
        .where('tickets.event_id = ?', event.id)[0]

        gross = ticketInfo.gross || 0
        
        ticketInfo2 = event.tickets.select('sum(price) AS "cost", sum(max_quantity) AS "max_tickets"')[0]
        cost = ticketInfo2.cost || 0

        event.paid = "Free"
        event.gross = 0;
        event.status = 'Incomplete'
        event.max_tickets = ticketInfo2.max_tickets || 0
        event.tickets_sold = ticketInfo.tickets_sold || 0
        if event.tickets.any?
          event.status = 'Complete'
          event.gross = gross
        end
        if gross > 0
          event.paid = "Paid"
          event.gross = gross
        end
        if cost > 0
          event.paid = "Paid"
        end
        if (event.end < DateTime.now)
          event.status = 'Past'
        end
        # event.update(event.as_json)
      end

    render :event_list
  end

 
  def create
    @event = Event.new(event_params)
    @event.creator_id = current_user.id
    
    if @event.save
      updateEventData([@event])
      render :event_basic_info
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:event][:id])
    if @event
        if @event.update(event_params)
          updateEventData([@event])
          render :event_all_info
        else
          render json: @event.errors.full_messages, status: 422
        end
    else
      render json: ["This event does not exist"], status: 422
    end
  end

  def destroy
    
    @event = Event.find_by(id: params[:id])
    if @event
      if @event.destroy
        render :event_all_info
      else
        render json: @event.errors.full_messages, status: 422
      end
    else
      render json: ["This event does not exist"], status: 422
    end
  end

  def getByType
    col = params[:column]
    val = params[:value]
    if col == 'any_id'
      @events = Event.where('id = ?', val)
      
    elsif(col == 'creator_id')
      @creator_id = val
      @events = Event.where("#{col} = ?", val) if whitelist(col.downcase)
    else
      if current_user
        @events = Event.where("#{col} = ?", val)
        .where('start >= ?', DateTime.now)
        .where("creator_id != ?", current_user.id) if whitelist(col.downcase)
     # elsif col == 'relevant_creator'
       # @events = Event.where("creator_id", val).
        #  .where(' start >= ? ', DateTime.now).sample(5)
      else
        @events = Event.where("#{col} = ?", val)
        .where('start >= ?', DateTime.now) if whitelist(col.downcase)
      end
    end
    if @events
      render :event_list
    else
      render json: ["No Events Found"], status: 422
    end
  end

  def getMineByType
    col = params[:column]
    val = params[:value]

    if(col == 'followed_events')
      @events = getFollows
    end
    if(col == 'creator_id')
      @creator_id = val
      @events = Event.includes(:registrations, :tickets).where("#{col} = ?", val) if whitelist(col.downcase)
     updateEventData(@events)

    else
      if current_user
        @events = Event.where("#{col} = ?", val)
        .where("creator_id = ?", current_user.id) if whitelist(col.downcase)
      else
        @events = Event.where("#{col} = ?", val)
        .where('start >= ?', DateTime.now) if whitelist(col.downcase)
      end
    end
    if @events
      render :event_list
    else
      render json: ["No Events Found"], status: 422
    end
  end


  def browse

    options = params[:options]

    if logged_in?
      @creator_id = current_user.id
      options[:logged_in] = true
    else
      options[:logged_in] = nil
    end

    if !options[:per_page]
      options[:per_page] = 10
    end
    # if options[:column] == "creator_id"
    #   options[:value] = current_user.id
    # end



    @events = Event

    @events = @events.where("#{options[:column]} = ?", options[:value]) if options[:by_column] && whitelist(options[:column].downcase)
    
    # @events = findEventByDate(options[:date]) if options[:date]
    # @events = @events.where(paid: options[:paid]) if options[:paid]
    # @events = @events.where(location: options[:location]) if options[:location]

    @events = @events.where("creator_id = ?", current_user.id) if options[:creator_id] && options["logged_in"]
    @events = @events.where("creator_id != ?", current_user.id) if options["logged_in"] && !options["creator_id"] && logged_in?
    
    @events = @events.where("start >= ?", DateTime.now) if options["future"]

    @events = @events.where(Event.arel_table[:title].lower.matches("%#{options[:search]}%")) if options[:search] != "" && options[:search]

    if options[:creator_id]
      # updateEventData(@events)
    end
    @events = @events.where("status = ?", options[:status]) if options[:status] != "All" && options[:status]

    @events = @events.paginate(:page => options[:page], :per_page => options[:per_page]).order("start ASC") if options["page"]

    @events = @events.order(start: :asc)

    if @events
      render :event_list
    else
      render json: ["No Events Found"], status: 422
    end
  end


  private
 
  def getFollows
    if logged_in?
      @user = User.find_by(id: current_user.id)
      @followed_events = @user.followed_events

      return @followed_events
    else
      return []
    end
  end
  
  def event_params_basic_info
    params.require(:event).permit(:id, :title, :venue, :recurring, :category_id, :location, :start, :end, :timezone)
  end

  def event_params_details
    params.require(:event).permit(:id, :imageURL, :description, :about)
  end

  def event_params
    params.require(:event).permit(:id, :title, :description, :category_id, :location, :organizer,
              :venue, :recurring, :start, :end, :timezone, :creator_id, :about, :image)
  end

  def whitelist(column)
    {'title'=>true, 'description'=>true, 'category_id'=>true, 'location'=>true, 'venue'=>true, 'recurring'=>true, 'start'=>true, 'end'=>true, 'timezone'=>true, 'creator_id'=>true, 'about'=>true, 'organizer'=>true, 'id'=>true}[column]
  end 

  def whitelist2(column)
    Event.columns.map(&name).to_set.include?(column)
  end
end



# filterEventsByDate(relevantEvents){

#     //day of the week => days away from the weekend 
#     const weekendOffset = {
#       0: -2, 1:4, 2:3, 3:2, 4:1, 5:0, 6:-1
#     }
#     switch(this.state.dateFilter){
#       case 'Pick a date...':
#         break;
#       case 'Today':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today)); 
#           if(start.getMonth() === today.getMonth() && start.getYear() === today.getYear() && start.getDate() === today.getDate()){
#             if(start >= today){return true;}
#           }
#         });
#         break;
#       case 'Tomorrow':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today)); 
#           if(start.getMonth() === today.getMonth() && start.getYear() === today.getYear() && start.getDate() === today.getDate()+1){
#             return true;
#           }
#         });
#         break;
#       case 'This weekend':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today)); 

#           let friday = new Date(today.toJSON());
#           let sunday = new Date(today.toJSON());
#           friday.setDate(today.getDate()+weekendOffset[today.getDay()]);
#           sunday.setDate(today.getDate()+weekendOffset[today.getDay()]+2);
#           sunday.setHours(23,59,59);

#           if(today > friday){
#             friday = today;
#           }
#           if(start <= sunday && start >= friday){
#             return true;
#           }
#         });
#         break;
#       case 'This week':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today));  

#           let monday = new Date(today.toJSON());
#           let sunday = new Date(today.toJSON());

#           monday.setDate(today.getDate()-today.getDay()+1);
#           monday.setHours(0,0,0);
#           sunday.setDate(monday.getDate()+6);
#           sunday.setHours(23,59,59);
#           if(today > monday){
#             monday = today;
#           }
#           if(start <= sunday && start >= monday){
#             return true;
#           }
#         });
#         break;
#       case 'Next week':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today));  

#           let monday = new Date(today.toJSON());
#           let sunday = new Date(today.toJSON());

#           monday.setDate(today.getDate()-today.getDay()+1+7);
#           monday.setHours(0,0,0);

#           sunday.setDate(monday.getDate()+6);
#           sunday.setHours(23,59,59);

#           if(today > monday){
#             monday = today;
#           }
#           if(start <= sunday && start >= monday){
#             return true;
#           }
#         });
#         break;
#       case 'This month':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today));  

#           if(start >= today && start.getMonth()=== today.getMonth()){
#             return true;
#           }
#         });
#         break;
#       case 'Next month':
#         relevantEvents = relevantEvents.filter( event => {
#           let today = JSON.stringify(this.getCurrentDateTime());
#           let start = JSON.stringify(new Date(this.convertDateToLocalAsJSON(new Date(event.start))));

#           start = new Date(JSON.parse(start));
#           today = new Date(JSON.parse(today));  

#           if(start >= today && start.getMonth()=== today.getMonth()+1){
#             return true;
#           }
#         });
#         break;
#       default:
#         break;
#     }
#     return relevantEvents;
#   }

#  
  # convertDateToLocalAsJSON(date){
  #   return (date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON()).slice(0,16);
  # }

  # getCurrentDateTime(){
  #   return this.convertDateToLocalAsJSON(new Date()).slice(0,16);
  # }
