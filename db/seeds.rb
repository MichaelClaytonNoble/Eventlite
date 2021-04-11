# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

User.create!({id: 1, email: "Example.Account@demo.com", password: "123456", first_name: "Demo", last_name: "Login"})
User.create!({id: 2, email: "000@000.000", password: "123456", first_name: "000", last_name: "000"})
User.create!({id: 3, email: "111@111.111", password: "123456", first_name: "111", last_name: "111"}) 
User.create!({id: 4, email: "222@222.222", password: "123456", first_name: "222", last_name: "222"}) 


# Event.create!({id: , title: , 
# description: , 
# category_id: , 
# location: , 
# address: , 
# venue: , 
# recurring: , 
# start: , 
# end: , 
# timezone: , 
# creator_id: });

Event.destroy_all; 

title = 'comming soon...'
description ='To city near you'
j = 0;
(0...20).each do |i|
  Event.create!({id: j+1, title: title, 
  description: description, 
  category_id: 1, 
  location: "ONLINE", 
  address: '', 
  venue: '', 
  recurring: false, 
  start: Date.today + rand(1...10), 
  end: Date.today + 11, 
  timezone: 'PST', 
  creator_id: 1})
  j+=1
end
(0...20).each do |i|
  Event.create!({id: j+1, title: title, 
  description: description, 
  category_id: 2, 
  location: "TBA", 
  address: '', 
  venue: '', 
  recurring: false, 
  start: Date.today + rand(10...20), 
  end: Date.today + 21, 
  timezone: 'PST', 
  creator_id: 1})
  j+=1
end
(0...20).each do |i|
  Event.create!({id: j+1, title: title, 
  description: description, 
  category_id: 3, 
  location: "VENUE", 
  address: '111 main st', 
  venue: '', 
  recurring: false, 
  start: Date.today + rand(20...30), 
  end: Date.today + 31, 
  timezone: 'PST', 
  creator_id: 1})
  j+=1
end
(0...20).each do |i|
  Event.create!({id: j+1, title: title, 
  description: description, 
  category_id: 4, 
  location: "ONLINE", 
  address: '111 main st', 
  venue: '', 
  recurring: false, 
  start: Date.today + rand(30...40), 
  end: Date.today + 41, 
  timezone: 'PST', 
  creator_id: 1})
  j+=1
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