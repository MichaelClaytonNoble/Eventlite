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
      @follow = Follow.create(event_id: params[:event_id], user_id: current_user.id);
      if @follow.save
        render json: [@follow.event_id]
      else
        render json: @follow.full_messages, status: 422
      end
    end
  end

  def destroy
    if !logged_in?
      render json: []
    else
      @follow = Follow.where('event_id = ? and user_id = ?', 0, 0)
        # .where('user_id = ?', current_user.id)
        debugger
      if @follow
        @follow.destroy
        render json: [@follow.event_id]
      else
        render json: @follow.full_messages, status: 422
      end
    end
  end


end
