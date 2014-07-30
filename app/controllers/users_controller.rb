class UsersController < ApplicationController

    def refreshst
      render :partial => 'partials/sidebar'
    end

    def edit_portfolio
      render :partial => 'partials/portfolioEdit'
    end

end
