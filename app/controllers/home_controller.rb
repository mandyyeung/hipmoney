class HomeController < ApplicationController
  def show
    if !current_user
      render 'login'
    end
  end
end
