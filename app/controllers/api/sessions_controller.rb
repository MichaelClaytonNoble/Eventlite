class Api::SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      #render some message 
    else
      render json: {messages: @user.errors.full_messages}
    end
  end

  def destroy
    if(logged_in?)
      logout
      render json: {messages: "logged out"}
    else
      render json: {messages: "No user logged in"}
    end
  end 
end
