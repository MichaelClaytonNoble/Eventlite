class Follow < ApplicationRecord
  

  belongs_to :events,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Event

  belongs_to: :users,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User
    
end
