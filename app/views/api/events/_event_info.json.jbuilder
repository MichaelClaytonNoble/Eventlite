json.set! event.id
json.extract! event, :id, :title, :description, :category_id, :location,
              :address, :venue, :recurring, :start, :end, :timezone, :creator_id,
              :about, :organizer, :image
if event.image.attached?
  json.imageUrl url_for(event.image)
end