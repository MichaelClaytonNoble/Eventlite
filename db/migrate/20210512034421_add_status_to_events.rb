class AddStatusToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :paid, :boolean
    add_column :events, :status, :string
    add_column :events, :gross, :numeric
  end
end
