class Event < ApplicationRecord
  validates :title, :location, :start, :end, :timezone, presence: true
  validates :location, inclusion: {in: ["TBA", "ONLINE", "VENUE"]}
  validates :recurring, inclusion: {in: [true, false]}
  validate :end_after_start 
  attr_accessor :gross, :paid, :status 
  
  belongs_to :creator,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: :User

  belongs_to :category,
    primary_key: :id,
    foreign_key: :category_id, 
    class_name: :Category
  
  has_many :follows,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Follow

  has_many :followers,
    through: :follows,
    source: :users

  has_many :tickets,
    primary_key: :id,
    foreign_key: :event_id,
    class_name: :Ticket

  has_many :registrations,
    through: :tickets,
    source: :registrations

  has_many :attendees,
    through: :tickets,
    source: :users

  
  has_one_attached :image

  private
  def end_after_start
    return if self.end.blank? || self.start.blank?
    if self.end < self.start
      errors.add(:end, "date must be after start date")
    end
  end


end
