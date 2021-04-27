class Ticket < ApplicationRecord
  validates :max_quantity, :price, :name, presence: true
  validates :max_quantity, numericality: {only_integer: true}
   validates :price, numericality: { greater_than: 0, less_than: 1000001 }


  belongs_to :events,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Event

  has_many :registrations,
    primary_key: :id,
    foreign_key: :ticket_id,
    class_name: :Registration

  has_many :users,
    through: :registrations,
    source: :user

end
