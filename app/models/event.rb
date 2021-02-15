class Event < ApplicationRecord
  validates :title, :location, :start, :end, :timezone, presence: true
  validates :location, inclusion: {in: ["TBA", "ONLINE", "VENUE"]}
  validates :recurring, inclusion: {in: [true, false]}

  belongs_to :creator,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: :User
  #belongs_to categories
  #has many tickets
  #has many attendees through tickets
  #has many followers through f

end
