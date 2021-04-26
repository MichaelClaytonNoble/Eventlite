class CreateTickets < ActiveRecord::Migration[5.2]
  def change
    create_table :tickets do |t|
      t.integer :max_quantity, null: false
      t.integer :quantity_purchased, null: false
      t.integer :price, null: false
      t.string :name, null: false
      t.integer :event_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :tickets, :user_id
    add_index :tickets, :event_id
  end
end
