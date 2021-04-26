class Registration < ApplicationRecord
  validates :quantity_purchased, presence: true

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :ticket,
    primary_key: :id,
    foreign_key: :ticket_id,
    class_name: :Ticket

  has_many :events,
    through: :ticket,
    source: :events



  
end
