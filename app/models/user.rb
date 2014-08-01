require 'json'
require 'net/http'
require 'open-uri'

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

  #def stocktwits_feed_old
      # user_stocks = self.stocks
      # feed = []
      # user_stocks.each do |t|
      #   source = %{https://api.stocktwits.com/api/2/streams/symbol/#{t.ticker}.json}
      #   resp = Net::HTTP.get_response(URI.parse(source))
      #   data = resp.body
      #   result = JSON.parse(data)["messages"]
      #   if result
      #     result.each do |msg|
      #       info = {}
      #       info[:user] = msg["user"]["username"]
      #       info[:user_pic] = msg["user"]["avatar_url"]
      #       info[:body] = msg["body"]
      #       info[:time] = Time.parse(msg["created_at"])
      #       feed << info
      #     end
        # else
  #         feed = [{:user => "Bartenderman", :user_pic => "http://avatars.stocktwits.net/production/85541/thumb-1402238472.png", :body => "$AAPL Sold my weekly covered calls at $100 strike. Thinking we stay around here til new catalyst...", :time => "2014-07-28T15:49:17Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "&quot;@NOHe: $AAPL short 98&quot; Hows that short working? LOL. When will you give up", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "&quot;@NOHe: $AAPL short 98&quot; Hows that short working? LOL. When will you give up", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "&quot;@NOHe: $AAPL short 98&quot; Hows that short working? LOL. When will you give up", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "&quot;@NOHe: $AAPL short 98&quot; Hows that short working? LOL. When will you give up", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "&quot;@NOHe: $AAPL short 98&quot; Hows that short working? LOL. When will you give up", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "RealFanboy101", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "@GCerva: $AAPL is abt to clear new highs.. And really soon'Yes you r right Bullish'", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "Kinji", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "$GTAT $AAPL Apple eyes solar to power the cloud and iPhone 6 sapphire manufacturing  http://stks.co/a0oaN  Food for the bulls", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "Tradesmart123", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "$AAPL...bummer", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "mjhtradepro", :user_pic => "http://avatars.stocktwits.net/production/327809/thumb-1394700286.png", :body => "Correction time. Might get one more push up but think we pull back till Aug Opex ends. Then one hell of a fall run imho", :time => "2014-07-28T15:47:42Z"},
  #           {:user => "siavashirani", :user_pic => "http://avatars.stocktwits.net/production/218532/thumb-1376657631.png", :body => "$AAPL surprised to see APPL in red seeing all of the positive and optimistic acquisitions and words. I am sure will be higher AH and tom. Bullish", :time => "2014-07-28T15:46:46Z"},
  #           {:user => "SamChase", :user_pic => "http://avatars.stocktwits.net/images/default_avatar_thumb.jpg", :body => "$AAPL Last hour looks like ... well, just about everything else.", :time => "2014-07-27T15:46:46Z"}
  #           ]
  #        end
  #      end
  #     feed.sort_by{|hsh| hsh[:time]}.reverse!
  #     feed.shuffle
  # end

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
