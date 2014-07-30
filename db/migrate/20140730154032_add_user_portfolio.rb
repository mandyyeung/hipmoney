class AddUserPortfolio < ActiveRecord::Migration
  def change
    add_column :user_stocks, :purchase_date, :date
    add_column :user_stocks, :purchase_price, :decimal
    add_column :user_stocks, :shares, :decimal
  end
end
