class AddOrganizerColumnToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :organizer, :string 
  end
end
