class UpdateStringToTextFeaturedColl < ActiveRecord::Migration[5.2]
  def change
    change_column :featured_collections, :description, :text, null: false
  end
end
