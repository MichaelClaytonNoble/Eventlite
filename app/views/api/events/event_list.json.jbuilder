if @creator_id
  json.set! @creator_id do
    @events.each do |event|
      json.set! event.id do
        json.partial! "event_info", event: event
      end
    end
  end
else
  @events.each do |event|
    json.set! event.id do
      json.partial! "event_info", event: event
    end
  end
end