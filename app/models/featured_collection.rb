class FeaturedCollection < ApplicationRecord
  validates :title, :description, :collection_name, presence: true

  has_one_attached :image
end
