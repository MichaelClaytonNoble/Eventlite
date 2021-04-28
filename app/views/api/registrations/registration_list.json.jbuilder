@registrations.each do |registration|
  json.set! registration.id do
    json.partial! "registration_info", registration: registration
  end
end
