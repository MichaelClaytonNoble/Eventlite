class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create]

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
  
  def getByType
    col = params[:column]
    val = params[:value]
    @events = Event.where("#{col} = ?", val) if whitelist(col.downcase);

    if @events
      render :event_list
    else
      render json: ["No Events Found"], status: 422
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
              :address, :venue, :recurring, :start, :end, :timezone, :creator_id, :about, :image)
  end

  def whitelist(column)
    {'title'=>true, 'description'=>true, 'category_id'=>true, 'location'=>true, 'address'=>true, 'venue'=>true, 'recurring'=>true, 'start'=>true, 'end'=>true, 'timezone'=>true, 'creator_id'=>true, 'about'=>true, 'organizer'=>true}[column]
  end 

  def whitelist2(column)
    Event.columns.map(&name).to_set.include?(column)
  end
end
