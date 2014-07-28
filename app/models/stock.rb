require 'json'
require 'net/http'

class Stock < ActiveRecord::Base
  has_many :user_stocks
  has_many :users, through: :user_stocks


end
