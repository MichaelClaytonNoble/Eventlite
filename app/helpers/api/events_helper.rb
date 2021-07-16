module Api::EventsHelper

  def updateEventData(events)

    events.each do |event|

      registrations = event.registrations
      gross = 0
  
      ticketInfo = Ticket.joins(:registrations)
      .select('sum(quantity_purchased * tickets.price) AS "gross", sum(quantity_purchased) AS "tickets_sold"')
      .where('tickets.event_id = ?', event.id)[0]

      gross = ticketInfo.gross || 0
      
      ticketInfo2 = event.tickets.select('sum(price) AS "cost", sum(max_quantity) AS "max_tickets"')[0]
      cost = ticketInfo2.cost || 0

      event.paid = false
      event.gross = 0
      event.status = 'Incomplete'
      event.max_tickets = ticketInfo2.max_tickets || 0
      event.tickets_sold = ticketInfo.tickets_sold || 0

      if event.tickets.any?
        event.status = 'Complete'
        event.gross = gross
      end
      if gross > 0
        event.paid = true
        event.gross = gross
      end
      if cost > 0
        event.paid = true
      end
      if (event.end < DateTime.now)
        event.status = 'Past'
      end
      event.update(event.as_json)
    end
  end
end
