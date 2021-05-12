json.set! event.id
json.extract! event, :id, :title, :description, :category_id, :location,
              :venue, :recurring, :start, :end, :timezone, :creator_id,
              :about, :organizer, :status, :gross, :paid, :max_tickets,
              :tickets_sold

if event.image.attached?
  json.imageUrl url_for(event.image)
end