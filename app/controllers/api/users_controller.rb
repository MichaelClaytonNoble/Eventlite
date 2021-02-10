class Api::UsersController < ApplicationController

  before_action :require_logged_out, only:[:create]

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
      render :user
      #render show page for user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.new(user_params)
    if @user.update
      #render show page for user 
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:id, :email, :first_name, :last_name, :password)
  end
end
