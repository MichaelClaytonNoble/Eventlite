# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

 require 'faker'



User.destroy_all

User.create!({id: 1, email: "Example.Account@demo.com", password: "123456", first_name: "Demo", last_name: "Login"})
User.create!({id: 2, email: "000@000.000", password: "123456", first_name: "000", last_name: "000"})
User.create!({id: 3, email: "111@111.111", password: "123456", first_name: "111", last_name: "111"}) 
User.create!({id: 4, email: "222@222.222", password: "123456", first_name: "222", last_name: "222"}) 


# Event.create!({id: , title: , 
# description: , 
# category_id: , 
# location: , 
# venue: , 
# recurring: , 
# start: , 
# end: , 
# timezone: , 
# creator_id: });

Event.destroy_all; 
locations = ['ONLINE', 'VENUE', 'TBA']
address =['']
-
title = 'An Event Comming Soon'
description ='To city near you'


(0...20).each do |i|

  location = locations.sample
  venue = ''
  if location == 'VENUE'
    venue = Faker::Address.full_address
  end
  start = Date.today + rand(1...29)
  stopDate = start + rand(1...7)
  creator = rand(1..2)
  e = Event.create!({id: i, 
    title: title, 
    description: description, 
    category_id: rand(1..8), 
    location: location, 
    venue: venue, 
    recurring: [false, true].sample, 
    start: start, 
    end: stopDate, 
    timezone: 'PST', 
    creator_id: creator})
  if creator == 1 
    e.image.attach(io: File.open('app/assets/images/red.png'), filename: 'red.png')
  elsif creator==2
    e.image.attach(io: File.open('app/assets/images/blue.png'), filename: 'blue.png')
  end
end



Category.destroy_all; 

Category.create!({id: 1, name: "Food & Drink"})
Category.create!({id: 2, name: "Health"})
Category.create!({id: 3, name: "Community"}); 
Category.create!({id: 4, name: "Film & Media"}); 
Category.create!({id: 5, name: "Travel & Outdoor"}); 
Category.create!({id: 6, name: "Music"}); 
Category.create!({id: 7, name: "Performing & Visual Arts"}); 
Category.create!({id: 8, name: "Science & Tech"}); 