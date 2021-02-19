
@events.each do |event|
  json.set! event.id do
    json.partial! "event_info", event: event
  end
end