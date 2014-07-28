require 'net/http'

class Stock < ActiveRecord::Base
  has_many :user_stocks
  has_many :users, through: :user_stocks

  def stocktwits_feed(ticker)
      source = %{https://api.stocktwits.com/api/2/streams/symbol/#{ticker}.json}
      resp = Net::HTTP.get_response(URI.parse(source))
      data = resp.body
      result = JSON.parse(data)["messages"]
      result.each do |msg|
        @user = msg["user"]["username"]
        @user_pic = msg["user"]["avatar_url"]
        @body = msg["body"]
        @time = msg["create_at"]
        # @discuss = msg["conversation"]["replies"]
        # @likes = msg["likes"]["total"] || nil
      end
  end

end


