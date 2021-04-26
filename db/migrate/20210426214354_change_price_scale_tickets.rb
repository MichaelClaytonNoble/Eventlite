class ChangePriceScaleTickets < ActiveRecord::Migration[5.2]
  def change
    change_column :tickets, :price, :numeric, scale: 2
  end
end
