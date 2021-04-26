class ChangePriceToNumericTickets < ActiveRecord::Migration[5.2]
  def change
    change_column :tickets, :price, :numeric, precision: 2
  end
end
