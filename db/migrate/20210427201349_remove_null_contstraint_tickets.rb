class RemoveNullContstraintTickets < ActiveRecord::Migration[5.2]
  def change
    change_column :tickets, :paid, :boolean
  end
end
