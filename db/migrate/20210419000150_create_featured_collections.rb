class CreateFeaturedCollections < ActiveRecord::Migration[5.2]
  def change
    create_table :featured_collections do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.string :collection_name, null: false

      t.timestamps
    end
    add_index :featured_collections, :title
    add_index :featured_collections, :collection_name
  end
end
