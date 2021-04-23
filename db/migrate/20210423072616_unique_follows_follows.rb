class UniqueFollowsFollows < ActiveRecord::Migration[5.2]
  def change
    add_index :follows, [:user_id, :event_id], unique: true
  end
end
