class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
      t.string :ticker
      t.string :name
      t.string :sector
      t.string :industry
      t.string :logo
      t.timestamps
    end
  end
end
