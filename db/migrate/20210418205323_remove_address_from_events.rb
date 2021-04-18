class RemoveAddressFromEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :address
  end
end
