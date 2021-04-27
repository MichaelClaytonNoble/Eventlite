class Api::TicketsController < ApplicationController
  before_action :require_logged_in, only:[:myIndex, :create, :update, :destroy]

  def index
    @event = Event.find_by(event_id: params[:event_id])
    if @event 
      @tickets = @event.tickets
      render :ticket_list
    else
      render json: ["User was not found"], status: 422
    end
  end

  def myIndex
    @user = User.find_by(id: current_user.id);
    if @user
      @tickets = @user.tickets
      render :ticket_list
    else
      render json: ["User was not found"], status: 422
    end
  end

  def show
    @ticket = Ticket.find_by(id: params[:id])
    if @ticket
      render :ticket_info
    else
      render json: @ticket.errors.full_messages, status: 422
    end
  end 

  def create
    @ticket = Ticket.new(ticket_params)
    
    if @ticket.save
      render :ticket_info
    else
      render json: @ticket.errors.full_messages, status: 422
    end
  end

  def update
    @ticket = Event.find_by(id: params[:id])
    if @ticket
      if @ticket.update(ticket_params)
        render :ticket_info
      else
        render json: @ticket.error.full_messages, status: 422
      end
    else
      render json: ["This ticket does not exist"], status: 422
    end
  end

  def destroy
    @ticket = Ticket.find_by(id: params[:id])
    if @ticket
      if @ticket.destroy
        render :ticket_info
      else
        render json: @ticket.errors.full_messages, status: 422
      end
    else
      render json: ["This ticket does not exist"], status: 422
    end
  end

  def ticket_params
    params.require(:ticket).permit(:id, :name, :price, :max_quantity, :event_id)
  end


end
