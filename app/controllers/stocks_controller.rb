class StocksController < ApplicationController
  def index
    @stocks = Stock.where('name LIKE ? OR ticker LIKE ?', "%#{params[:query]}%", "%#{params[:query]}%")
    respond_to do |format|
      format.json { render json: @stocks }
    end
  end

  private 

  def stock_params
     params.require(:stock).permit(:query)
  end
end