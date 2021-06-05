class Api::RegistrationsController < ApplicationController
  include Api::EventsHelper
  before_action :require_logged_in

  def index

    @user = User.find_by(id: current_user.id)
    @registrations = @user.registrations
    render :registration_list
  end

  def create
    @registration = Registration.new(registration_params)
    @registration.user_id = current_user.id

    @event = Event.where(id: params[:registration][:event_id])
    
    if @registration.save
      updateEventData(@event)
      render :registration_info
    else
      render json: @registration.errors.full_messages
    end
  end

  def show
    @registration = Registration.find_by(id: params[:id])
    if @registration
      render :registration_info
    else
      render json: ["Registration not found"]
    end
  end

  def update
    @registration = Registration.find_by(id: params[:id])
    if @registration 
      if @registration.update(registration_params)
        render :registration_info
      else
        render json: @registration.errors.full_messages
      end
    else
      render json: ["Registration not found"]
    end
  end

  def destroy
    @registration = Registration.find_by(id: params[:id])
    if @registration
      if @registration.destroy
        render :registration_info
      else
        render json: @registration.errors.full_messages
      end
    else
      render json: ["registration not found"]
    end
  end

  private
  def registration_params
    params.require(:registration).permit(:id, :quantity_purchased, :user_id, :ticket_id)
  end

end
