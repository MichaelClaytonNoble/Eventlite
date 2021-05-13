# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

 require 'faker'


def seedUser
  User.destroy_all

  User.create!({id: 1, email: "Example.Account@demo.com", password: "123456", first_name: "Demo", last_name: "Login"})
  User.create!({id: 2, email: "000@000.000", password: "123456", first_name: "000", last_name: "000"})
  User.create!({id: 3, email: "111@111.111", password: "123456", first_name: "111", last_name: "111"}) 
  User.create!({id: 4, email: "222@222.222", password: "123456", first_name: "222", last_name: "222"}) 
end

# Event.create!({id: , title: , 
# description: , 
# category_id: , 
# location: , 
# venue: , 
# recurring: , 
# start: , 
# end: , 
# timezone: , 
# creator_id: })

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
  description = "Come for a holistic day of education and history in your local museum. ]This event is great for kids" 
  return {'title'=> title, 'about'=>about, 'description'=>description}
end

def science_and_tech
  spacecraft = Faker::Space.nasa_space_craft
  title = "Watch the " + spacecraft + " launch"
  about = "NASA space craft launch!!"
  description = "NASA's "+ spacecraft + " will be launching. This will be the first probe sent to " + Faker::Space.moon
  return {'title'=> title, 'about'=>about, 'description'=>description}
end



def seedEvents 

  category_path = {
      1=> "food_drinks",
      2=> "health",
      3=> "community",
      4=> "film_media",
      5=> "travel_outdoor",
      6=> "music",
      7=> "performing_visual_arts",
      8=> "science_technology"
  }
  
  Event.destroy_all
  locations = ['ONLINE', 'VENUE', 'TBA']
  organizers = ["San Francisco Party Coalition", "Historical Society", "NASA", "SF Ping Pong Group", "Government"]

  idx = 0
  (1..8).each do |category|
    (0...15).each do |i|

      location = locations.sample
      venue = ''
      if location == 'VENUE'
        venue = Faker::Address.full_address
      end
      start = Date.today + rand(1...29)
      stopDate = start + rand(1...7)
      creator = rand(1..2)
      
      detail = details(category)
      description_with_lorem = detail['description']
      description_with_lorem += '\n'
      description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
      description_with_lorem += '\n'
      description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
      description_with_lorem += '\n'
      description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
      
      e = Event.create!({id: idx, 
        title: detail['title'], 
        description: description_with_lorem,
        organizer: organizers.sample,
        about: detail['about'],
        category_id: category, 
        location: location, 
        venue: venue, 
        recurring: [false, true].sample, 
        start: start, 
        end: stopDate, 
        timezone: 'PST', 
        creator_id: creator})

        j = i+1
        path = 'app/assets/images/' + category_path[category] + '/' + j.to_s + ".jpeg"
        filename = j.to_s + '.jpeg'
        e.image.attach(io: File.open(path), filename: filename)
        idx+=1
    end
  end
end


def seedCategory

  Category.destroy_all

  Category.create!({id: 1, name: "Food & Drink"})
  Category.create!({id: 2, name: "Health"})
  Category.create!({id: 3, name: "Community"})
  Category.create!({id: 4, name: "Film & Media"})
  Category.create!({id: 5, name: "Travel & Outdoor"})
  Category.create!({id: 6, name: "Music"})
  Category.create!({id: 7, name: "Performing & Visual Arts"})
  Category.create!({id: 8, name: "Science & Tech"})
end


def seedFeaturedCollections
  FeaturedCollection.destroy_all

  FeaturedCollection.create!({id: 1,
  title: "Educate Yourself: Online Racial Equity Workshops",
  description: "Black History Month is a time for celebrating Black achievement. Black History Month is a time is celebrate and remember important people that are a part of this African diaspora. Come celebrate our brothers by learning and participating in one of many racial equity and history workshops.",
  collection_name: "Black History Month"})
  FeaturedCollection.last.image.attach(io: File.open('app/assets/images/featured_collections/black_history_month.jpeg'), filename: 'black_history_month.jpeg')

  FeaturedCollection.create!({id: 2,
  title: "The Music Never Stops: Virtual Concerts &  DJ Sets",
  description: "Live music lives mostly online these days, but if you're in need of a musical fix, there's still plenty of streaming concerts, virtual dance parties, vocal competitions, history lessons, and music-making classes to keep you dancing in your home.",
  collection_name: "Live Music"})
  FeaturedCollection.last.image.attach(io: File.open('app/assets/images/featured_collections/live_music.jpeg'), filename: 'live_music.jpeg')

  FeaturedCollection.create!({id: 3,
  title: "Learn to Cook: Online cooking classes & More",
  description: "Struggling to entertain yourself while trying to work from home? Eventlite offers a plethora of online classes and fun activities to help keep yourself busy. There's a virtual world of culinary courses and more.",
  collection_name: "Learn to make"})
  FeaturedCollection.last.image.attach(io: File.open('app/assets/images/featured_collections/learn_to_cook.jpeg'), filename: 'learn_to_cook.jpeg')

  FeaturedCollection.create!({id: 4,
  title: "Tour the world: Online museum exhibits & more",
  description:"Even the most active sightseer and museum goer needs a break sometime. Enjoy the wonders of the world without leaving your couch. Go to Egypts amazing pyramid or attend the grand opening of your local museum all with a click of your mouse. Let this curated collection serve as your one-stop shop for all things virtual.",
  collection_name: "Culture"})
  FeaturedCollection.last.image.attach(io: File.open('app/assets/images/featured_collections/culture.jpeg'), filename: 'culture.jpeg')
end

def addDescriptionToEvents
  Event.all.each do |event|
    description_with_lorem = event['description']
    description_with_lorem += '\n'
    description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
    description_with_lorem += '\n'
    description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
    description_with_lorem += '\n'
    description_with_lorem += Faker::Lorem.paragraph_by_chars(number: 256, supplemental: false)
    event.update(description: description_with_lorem)
  end
end

def seedTickets
  Ticket.destroy_all
  Event.all.each do |event|
    if event.id%9 != 0 #make sure there are some incomplete events.
      Ticket.create({max_quantity: 1200, price: 10.00, name: 'General Admission', event_id: event.id, paid: true})
      Ticket.create({max_quantity: 500, price: 0.00, name: 'Day Pass', event_id: event.id, paid: false})
      Ticket.create({max_quantity: 100, price: 45.00, name: "V.I.P. Wknd Pass", event_id: event.id, paid: true})
    end
  end
end

seedUser
seedCategory
seedEvents
seedFeaturedCollections
seedTickets