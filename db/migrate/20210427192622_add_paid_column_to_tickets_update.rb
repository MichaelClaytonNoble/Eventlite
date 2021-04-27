class AddPaidColumnToTicketsUpdate < ActiveRecord::Migration[5.2]
  def change
    change_column :tickets, :paid, :boolean, null: false
  end
end
