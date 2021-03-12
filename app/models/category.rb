class Category < ApplicationRecord
  validates :name, presence: true
  validates :name, inclusion: {in: ["Food & Drink", "Health", "Music", "Community", "Film & Media", "Travel & Outdoor", "Performing & Visual Arts", "Science & Tech"]}


  has_many :events,
    primary_key: :id, 
    foreign_key: :category_id,
    class_name: :Event


end
