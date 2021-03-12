class AddImageUrlToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :imageURL, :string
  end
end
