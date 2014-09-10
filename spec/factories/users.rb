require 'faker'
FactoryGirl.define do
  factory :user do |f|
    f.name { Faker::Name.name }
  end
end
