class Api::EventsController < ApplicationController
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
      render :event_basic_info
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:event][:id])
    if @event
        if @event.update(event_params)
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
    
    @events = @events.where("creator_id = ?", current_user.id) if options[:creator_id]
    @events = @events.where("creator_id != ?", current_user.id) if options["logged_in"] && !options["creator_id"]
    
    @events = @events.where("start >= ?", DateTime.now) if options["future"]

    @events = @events.where(Event.arel_table[:title].lower.matches("%#{options[:search]}%")) if options[:search] != "" && options[:search]

    if options[:creator_id]
      updateEventData(@events)
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
  def updateEventData(events)

      events.each do |event|

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
        event.update(event.as_json)
      end
    end

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
