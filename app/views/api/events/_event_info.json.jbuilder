json.set! event.id
json.extract! event, :id, :title, :description, :category_id, :location,
              :venue, :recurring, :start, :end, :timezone, :creator_id,
              :about, :organizer, :status, :gross, :paid
# if event.status
#   json.status event.status
# end
# if event.gross
#   json.gross event.gross
# end
# if event.paid
#   json.paid event.paid
# end
if event.image.attached?
  json.imageUrl url_for(event.image)
end