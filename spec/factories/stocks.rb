require 'faker'
FactoryGirl.define do
  factory :stock do |f|
    f.ticker "AAPL"
    f.name "Apple"
  end
end
