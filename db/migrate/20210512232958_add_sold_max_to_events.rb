class AddSoldMaxToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :tickets_sold, :integer
    add_column :events, :max_tickets, :integer
  end
end
