class DeleteImageUrLfromEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :imageURL
  end
end
