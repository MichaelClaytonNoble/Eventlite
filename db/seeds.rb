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

def details(n)
  case n
    when 1
      return food_and_drink
    when 2
      return health
    when 3
      return community
    when 4
      return film_and_media
    when 5
      return travel_and_outdoor
    when 6
      return music
    when 7
      return performing_and_visual_arts
    when 8
      return science_and_tech
  else
    return -1
  end


end

def food_and_drink
  food = Faker::Food
  title = "Learn to make " + food.dish
  about = "Cooking tutorial"
  description = "Learn to make " + food.dish + ". A dish of " + food.description

  restaurant = Faker::Restaurant
  title2 = restaurant.name + " Grand opening!"
  about2 = restaurant.name + " is a " + restaurant.type + " restaurant re-opening!."
  description2 = restaurant.description + " . Review: " + restaurant.review
  return [{'title'=> title, 'about'=> about, 'description'=> description}, {'title'=> title2, 'about'=> about2,'description'=> description2}].sample
end

def health
  i = rand(0..2)
  titles = ["Marathon !", "Yoga in the Park", "Outdoors playground Gym Bonanza!"]
  about = ["Run to raise awareness!", "De-stress in the park with yoga!", "Learn how to turn a playground into a free gym"]
  description = ["Run run run run run! Run around and get sponsored. Raise awareness!", 
                 "Life is sometimes stressful. This entry level yoga class can help you!",
                 "Gyms are expensive!, Why pay if you can get a better work out on a playground! "]
  return {'title'=>titles[i], 'about'=>about[i], 'description'=>description[i]}
end

def community
  philosopher = Faker::GreekPhilosophers
  title = "Local museum exhibit on " + philosopher.name
  about= "Learn and experience the life of " + philosopher.name
  description = "Come by this weekend to experience the life of " + philosopher.name + ". When " + philosopher.name + " said " + philosopher.quote+ " what did they mean?. Come find out!"
  return {'title'=> title, 'about'=>about, 'description'=>description}
end
def film_and_media
  book = Faker::Book
  title = book.author + ' reads her book, ' + book.title
  about = "Book reading and interview with " + book.author
  description = "Come join us as we go into the world of our favorite author. 
  This event is going to be a good one and will feature many of her most famous works like " + book.title + "."
  return {'title'=> title, 'about'=>about, 'description'=>description}
end

def travel_and_outdoor
  nation = Faker::Nation
  title = "Experience " + nation.nationality + " Art, Cuisine & Culture " + nation.flag
  about = "Tour and vacation in the beautiful " + nation.nationality + " nation"
  description = "Discover a new place. In this tour you get to experience both cuisine and culture, art and history. " +
    "Attend a game of " + nation.national_sport + " and even learn" + nation.language
  return {'title'=> title, 'about'=>about, 'description'=>description}
end

def music
  music = Faker::Music
  title = "Live performance by " + music.band
  about = music.band + " performs their greatest hits"
  description = "Come out for a day of sunshine and good music" + music.band +
        " performs some of their greatest hits from their new album " + music.album
  return {'title'=> title, 'about'=>about, 'description'=>description}
end

def performing_and_visual_arts
  artist = Faker::Artist
  title = "Recreate history with " + artist.name
  about = "Watch a live reconstruction of " + artist.name + "'s greatest work."
  description = "Come for a holistic day of education and history in your local museum. This event is great for kids" 
  return {'title'=> title, 'about'=>about, 'description'=>description}
end

def science_and_tech
  spacecraft = Faker::Space.nasa_space_craft
  title = "Watch the " + spacecraft + " launch"
  about = "NASA space craft launch!!"
  description = "NASA's "+ spacecraft + " will be launching. This will be the first probe sent to " + Faker::Space.moon
  return {'title'=> title, 'about'=>about, 'description'=>description}
end


Event.destroy_all; 
locations = ['ONLINE', 'VENUE', 'TBA']
address =['']

(0...60).each do |i|

  location = locations.sample
  venue = ''
  if location == 'VENUE'
    venue = Faker::Address.full_address
  end
  start = Date.today + rand(1...29)
  stopDate = start + rand(1...7)
  creator = rand(1..2)
  category = rand(1..8)
  detail = details(category)

  e = Event.create!({id: i, 
    title: detail['title'], 
    description: detail['description'], 
    about: detail['about'],
    category_id: category, 
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