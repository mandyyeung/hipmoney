class UpdateUserPortfolio < ActiveRecord::Migration
  def change
    add_column :user_stocks, :portfolio?, :boolean, default: true
  end
end
