require 'csv'
require 'net/http'

class GenerateSeed

  def get_logo_urls
    l = []
    CSV.foreach('db/companylist.csv') do |row|
      url_str = %{http://content.nasdaq.com/logos/#{row[0]}.gif}
      response = Net::HTTP.get_response(URI(url_str))
      l << %{Stock.find_by(ticker: "#{row[0]}").update(logo: #{url_str})} if response.kind_of?(Net::HTTPSuccess)
    end
    l
  end

  def generate_data
    d = []
    CSV.foreach('db/companylist.csv') do |row|
      d << %{Stock.create(ticker: "#{row[0]}", name: "#{row[1]}", sector: "#{row[6]}", industry: "#{row[7]}")}
    end
    d
  end

  def write_basic_data
    File.open('db/seeds.rb', 'w+') do |f|
      f.puts generate_data
    end
  end

  def write_logo_data
    File.open('db/seeds-logos.rb', 'w+') do |f|
      f.puts get_logo_urls
    end
  end

end

#GenerateSeed.new.write_basic_data
#GenerateSeed.new.write_logo_data
