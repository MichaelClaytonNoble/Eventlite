class CreateRegistrations < ActiveRecord::Migration[5.2]
  def change
    create_table :registrations do |t|
      t.integer :quantity_purchased, null: false
      t.integer :user_id, null: false
      t.integer :ticket_id, null: false
      t.timestamps
    end
  end
end
