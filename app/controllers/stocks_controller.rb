require 'csv'
class StocksController < ApplicationController
  def index
    @stocks = Stock.where('UPPER(name) LIKE UPPER(?) OR UPPER(ticker) LIKE UPPER(?)', "%#{params[:query]}%", "%#{params[:query]}%")
    respond_to do |format|
      format.json { render json: @stocks }
    end
  end

  def show
    @stock = Stock.find(params[:id])
    respond_to do |format|
      format.json { render json: @stock }
    end
  end

  def bitcoin
    @bitcoin = JSON.load(open("https://www.bitstamp.net/api/ticker/"))
    respond_to do |format|
      format.json { render json: @bitcoin }
    end
  end

  def history
    @history = []
      url = "http://ichart.yahoo.com/table.csv?s=#{params[:id]}&a=6&b=1&c=2014&d=7&e=30&f=2014&g=d&ignore=.csv"
      CSV.new(open(url), :headers => :first_row).each do |line|
        data = []
        data << line[0].gsub('-','').to_i
        data <<  line[4].to_i
        @history << data
      end
    respond_to do |format|
      format.json { render json: @history.reverse }
    end
  end

  def create
    @stock = Stock.find(params[:id])
    current_user.stocks << @stock
    respond_to do |format|
      format.json { render json: @stock }
    end
  end

  def destroy
  	@stock = Stock.find(params[:id])
  	current_user.stocks.delete(@stock)
  	respond_to do |format|
  		format.js
  	end
  end

  private

  def stock_params
     params.require(:stock).permit(:query, :id)
  end
end
