class Api::EventsController < ApplicationController
  before_action :require_logged_in, only: [:create]

  def create
    @event = Event.new(event_params_basic_info)
    @event.creator_id = current_user.id
    if @event.save
      render :event_basic_info
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def update
    @event = Event.find_by(id: params[:id])

    if @event
      if @event.update(event_params)
        render :event_info
      else
        render json: @event.errors.full_messages, status: 422
      end
    else
      render json: ["This event does not exist"], status: 422
    end
  end
  
  def getByType
    @events = Event.find_by(params[:column]: params[:value]);
    render json: @events
  end
  
  def event_params_basic_info
    params.require(:event).permit(:id, :title, :venue, :recurring, :category_id, :location, :start, :end, :timezone)
  end
  def event_params
    params.require(:event).permit(:id, :title, :description, :category_id, :location,
              :address, :venue, :recurring, :start, :end, :timezone, :creator_id, :about)
  end
end