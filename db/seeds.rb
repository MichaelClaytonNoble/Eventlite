# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.destroy_all

User.create!({id: 1, email: "Example.Account@demo.com", password: "123456", first_name: "Demo", last_name: "Login"}); 
User.create!({id: 2, email: "000@000.000", password: "123456", first_name: "000", last_name: "000"}); 
User.create!({id: 3, email: "111@111.111", password: "123456", first_name: "111", last_name: "111"}); 
User.create!({id: 4, email: "222@222.222", password: "123456", first_name: "222", last_name: "222"}); 


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
Event.create!({id: 1, title: "An evening with Kazuo Ishiguro", 
description: "In his first global in-conversation event, Nobel laureate Kazuo Ishiguro will talk about his much-anticipated new novel, Klara and the Sun.", 
about: "On awarding Ishiguro the Nobel Prize in literature in 2017, the committee praised him for his novels which “uncovered the abyss beneath our illusory sense of connection with the world” and were driven by a “great emotional force”. From the Booker-winning The Remains of the Day, to the dystopian parable of Never Let Me Go, his novels explore profound ideas about the human experience.

Klara and the Sun is the story of an 'Artificial Friend' who awaits the day a human customer will select her for companionship. When it becomes evident that her circumstances may change forever, Klara is warned not to invest too much in the promises of humans.

A luminous narrative about humanity, hope and the human heart, Klara and the Sun is the first novel from Ishiguro since his Nobel award. Join him for a livestreamed discussion with writer and critic Alex Clark, and the rare opportunity to put your questions to one of our most loved writers.

We have a limited number of tickets including a signed copy of the novel, priced £26. All other books bought with tickets will be bookplate signed editions - please check the description of your ticket. Books will be shipped by Waterstones on 3 March.

Kazuo Ishiguro is published by Faber. Visit their website to find out more about Faber Members.

Running time: 75 minutes

This event will not be recorded and will not be available to watch after the time at which it is livestreamed.

If you live in the UK, you may purchase a ticket with a signed copy of Klara and the Sun at checkout .

This event will be hosted on a third-party live streaming platform BlueJeans, please refer to their privacy policy before purchasing a ticket to the event. After registering, please refer to your confirmation email for access to the event.

If you require closed captions to be available on this event notify us on your booking form when making your purchase.

*Books will be dispatched on 3 March 2021. However, please note that in the current circumstances, some books may be delayed. If we experience any delay in getting your copy to you, we will contact you by email to let you know",
category_id: 1, 
location: "ONLINE", 
recurring: false, 
start: DateTime.new(2021, 3, 2, 11, 0, 0, "PST"), 
end: DateTime.new(2021, 3, 2, 14, 30, 0, "PST"), 
timezone: "PST", 
creator_id: 1});
