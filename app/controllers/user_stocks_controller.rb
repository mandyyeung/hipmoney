# UserStocksController
class UserStocksController < ApplicationController
	def create
		@stock = Stock.find_by(name: params[:name])
		@user_stock = UserStock.create(stock_id: @stock.id, user_id: current_user.id)
		respond_to do |format|
			format.js
		end
	end
end
