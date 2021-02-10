class Api::SessionsController < ApplicationController

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])

    if @user
      login(@user)
      #render some message 
      render json: {id: @user.id}
    else
      render json: {messages: "INVALID USERNAME OR PASSWORD"}, status: 422
    end
  end

  def destroy
    if(logged_in?)
      logout
      render json: {}
    else
      render json: {messages: "No user logged in"}, status: 404
    end
  end 
end
