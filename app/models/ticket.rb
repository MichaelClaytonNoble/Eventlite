class Ticket < ApplicationRecord
  validates :max_quantity, :price, :name, presence: true
  validates :max_quantity, numericality: {only_integer: true, greater_than_or_equal_to: 1, less_than: 1000000}
  validates :price, numericality: { greater_than_or_equal_to: 0, less_than: 10000 }
  validates_inclusion_of :paid, in: [true, false], message: "or free must be selected"

  belongs_to :events,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Event

  has_many :registrations,
    primary_key: :id,
    foreign_key: :ticket_id,
    class_name: :Registration,
    dependent: :destroy

  has_many :users,
    through: :registrations,
    source: :user

end
