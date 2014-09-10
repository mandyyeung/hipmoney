require 'json'
require 'net/http'
require 'open-uri'

# User
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

  def stocktwits_urls
    urls = []
    self.stocks.each do |s|
      urls << "http://stocktwits.com/symbol/#{s.ticker}"
    end
    urls
  end

  def visit_urls
    messages = []
    stocktwits_urls.each do |url|
      doc = Nokogiri::HTML(open(url))
      doc.xpath('//ol/li').each do |item|
        messages << item.values
      end
    end
    messages
  end

  def stocktwits_feed
    msgs = []
    visit_urls.each do |m|
      message = {}
      full_message = JSON.parse(m[0])
      message[:time] = Time.parse(full_message["created_at"])
      message[:avatar] = full_message["avatar_url"]
      message[:body] = full_message["body"]
      message[:user] = full_message["user"]["username"]
      msgs << message
    end
    msgs.uniq.sort_by{|hsh| hsh[:time]}.reverse!
  end

  def get_price
    quotes = YahooFinance.quotes(self.stocks.pluck(:ticker).reverse, [:ask])
  end

  def portfolio_show
    @stocks = UserStock.where(user_id: self.id).reverse
  end
end
