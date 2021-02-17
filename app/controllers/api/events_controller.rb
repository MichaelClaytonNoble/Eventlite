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
end


def event_params_basic_info
  params.require(:event).permit(:id, :title, :venue, :recurring, :category_id, :location, :start, :end, :timezone)
end