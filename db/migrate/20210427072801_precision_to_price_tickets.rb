class PrecisionToPriceTickets < ActiveRecord::Migration[5.2]
  def change
        change_column :tickets, :price, :numeric, precision: 8, scale: 2

  end
end
