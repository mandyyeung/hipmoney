require 'net/http'

class Stock < ActiveRecord::Base
  has_many :user_stocks
  has_many :users, through: :user_stocks

  def stocktwits_feed
      source = %{https://api.stocktwits.com/api/2/streams/symbol/#{self.ticker}.json}
      resp = Net::HTTP.get_response(URI.parse(source))
      data = resp.body
      result = JSON.parse(data)["messages"]
      feed = []
      result.each do |msg|
        info = {}
        info[:user] = msg["user"]["username"]
        info[:user_pic] = msg["user"]["avatar_url"]
        info[:body] = msg["body"]
        info[:time] = msg["created_at"]
        # @discuss = msg["conversation"]["replies"]
        # @likes = msg["likes"]["total"] || nil
        feed << info
      end
      feed[0,3]
  end

end


