class Api::UsersController < ApplicationController


  def index
    @users = User.all
  end

  def show
    @user = User.find_by(id: params(:id))
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render json: {messages: "created a new user, logged in"}
      #render show page for user
    else
      render json: {messages: @user.errors.full_messages}
    end
  end

  def update
    @user = User.new(user_params)
    if @user.update
      #render show page for user 
    else
      render json: {messages: @user.errors.full_messages}
    end
  end

  private
  def user_params
    params.require(:user).permit(:id, :email, :first_name, :last_name, :password)
  end
end
