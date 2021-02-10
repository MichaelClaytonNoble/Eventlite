class Api::SessionsController < ApplicationController
  before_action :require_logged_out, only:[:create]
  before_action :require_logged_in, only:[:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if @user
        login(@user)
        #render some message 
        render :create
    else
      render json: ["INVALID USERNAME OR PASSWORD"], status: 422
    end
  end

  def destroy
    logout
    render json: {}
  end 
end
