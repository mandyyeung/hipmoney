# Home Controller
class HomeController < ApplicationController
  def show
    render 'login' unless current_user
  end
end
