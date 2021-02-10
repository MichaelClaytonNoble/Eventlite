class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_logged_out
    if logged_in?
      render json: ["Already Logged into an account"], status: 422
    end
  end

  def require_logged_in
    if !logged_in?
      render json: ["User must be logged in "], status: 422
    end
  end

  def login(user)
    session[:session_token]=user.reset_session_token!
  end

  def logout
    @current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

end
