class AddAboutToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :events, :about, :text
  end
end
