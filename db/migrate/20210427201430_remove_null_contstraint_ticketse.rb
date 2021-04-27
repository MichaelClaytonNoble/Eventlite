class RemoveNullContstraintTicketse < ActiveRecord::Migration[5.2]
  def change
    remove_column :tickets, :paid
    add_column :tickets, :paid, :boolean
  end
end
