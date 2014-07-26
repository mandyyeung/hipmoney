class StocksController < ApplicationController
  def index
    @stocks = Stock.where('name LIKE ? OR ticker LIKE ?', "%#{params[:query]}%", "%#{params[:query]}%")
    respond_to do |format|
      format.json { render json: @stocks }
    end
  end

  def create
    current_user.stocks << Stock.find(params[:id])
    redirect_to root_path
  end

  private 

  def stock_params
     params.require(:stock).permit(:query)
  end
end