
@tickets.each do |ticket|
  json.set! ticket.id do 
    json.partial! "ticket_info", ticket: ticket
  end
end
