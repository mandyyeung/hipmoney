class User < ActiveRecord::Base
  has_many :user_stocks
  has_many :stocks, through: :user_stocks


  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.oauth_token = auth.credentials.token
      user.oauth_expires_at = Time.at(auth.credentials.expires_at)
      user.profile_pic = auth.info.image
      user.save!
    end
  end

  def stocktwits_feed
      user_stocks = self.stocks
      feed = []
      user_stocks.each do |t|
        source = %{https://api.stocktwits.com/api/2/streams/symbol/#{t.ticker}.json}
        resp = Net::HTTP.get_response(URI.parse(source))
        data = resp.body
        result = JSON.parse(data)["messages"]
        result.each do |msg|
          info = {}
          info[:user] = msg["user"]["username"]
          info[:user_pic] = msg["user"]["avatar_url"]
          info[:body] = msg["body"]
          info[:time] = Time.parse(msg["created_at"])
          # @discuss = msg["conversation"]["replies"]
          # @likes = msg["likes"]["total"] || nil
          feed << info
        end
      end
      feed.sort_by{|hsh| hsh[:time]}.reverse!
  end

end
