class Api::SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if @user
      login(@user)
      #render some message 
      render json: {user: @user, messages: "logged in as #{@user.email}"}
    else
      render json: {messages: "INVALID USERNAME OR PASSWORD"}
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
