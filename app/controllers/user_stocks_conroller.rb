class UserStocksController < ApplicationController

	def create
  	binding.pry
  	#add stock to user's watchlist
  	@stock = Stock.find_by(name: params[:name])
  	@user_stock = UserStock.create(stock_id: @stock.id, user_id: current_user.id)
  	# @stock = Stock.find_by(name: params[:name])
  	# current_user.stocks << @stock
  	respond_to do |format|
  		format.js
  	end
  end

end