# ApplicationController
class ApplicationController < ActionController::Base
  helper_method :current_user
  protect_from_forgery except: :show
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
    if @current_user && @current_user.stocks.count == 0
      @current_user.stocks << Stock.find_by(ticker: 'AAPL')
    end
    @current_user
  end
end
