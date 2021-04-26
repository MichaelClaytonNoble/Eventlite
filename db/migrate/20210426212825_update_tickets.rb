class UpdateTickets < ActiveRecord::Migration[5.2]
  def change
    remove_column :tickets, :quantity_purchased
    rename_column :tickets, :user_id, :registration_id
  end
end
