class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :description
      t.integer :category_id, null: false
      t.string :location, null: false
      t.string :address
      t.string :venue
      t.boolean :recurring, null: false
      t.timestamp :start, null: false
      t.timestamp :end, null: false
      t.string :timezone, null: false
      t.integer :creator_id, null: false 

      t.timestamps
    end
    add_index :events, :title
    add_index :events, :category_id
    add_index :events, :location
    add_index :events, :creator_id
  end
end
