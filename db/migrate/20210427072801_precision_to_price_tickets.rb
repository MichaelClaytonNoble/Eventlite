class PrecisionToPriceTickets < ActiveRecord::Migration[5.2]
  def change
        change_column :tickets, :price, :decimal, scale: 2

  end
end
