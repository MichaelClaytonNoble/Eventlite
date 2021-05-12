class Api::FollowsController < ApplicationController


  def index
    if !logged_in?
      render json: []
    else
      @follows = Follow.select(:event_id).where('user_id = ?', current_user.id).pluck(:event_id)
      render json: @follows
    end
  end

  def create
    if !logged_in?
      render json: []
    else
      @follow = Follow.create(event_id: params[:event_id], user_id: current_user.id)
      if @follow.save
        render json: @follow.event_id.to_i
      else
        render json: @follow.errors.full_messages, status: 422
      end
    end
  end

  def destroy
    if !logged_in?
      render json: []
    else
      @follow= Follow.where("event_id = ?", params[:id])
        .where('user_id = ?', current_user.id)
        event_id = params[:id]
      if @follow
        Follow.destroy(@follow.pluck('id').pop)
        render json: event_id.to_i
      else
        render json: ["no follow found"], status: 422
      end
    end
  end


end
