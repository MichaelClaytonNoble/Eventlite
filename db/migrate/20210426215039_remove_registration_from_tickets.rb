class RemoveRegistrationFromTickets < ActiveRecord::Migration[5.2]
  def change
    remove_column :tickets, :registration_id
  end
end
