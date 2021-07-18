# [Eventlite](http://eventlite-mako.herokuapp.com/)
 [<img src="https://raw.githubusercontent.com/MichaelClaytonNoble/Eventlite/main/app/assets/images/favicon.png" width="120" height="120">](http://eventlite-mako.herokuapp.com/)
1. [Technologies](#Technologies)
2. [Landing Page](#Landing-Page)
3. [User Authentication](#User-Authentication)
4. [Suggestions](#Suggestions)
5. [Browse](#Browse)
6. [Create Events](#Create-Events)
7. [Managing Events](#Managing-Events)
8. [View Events](#View-Events)
9. [Like Events](#Like-Events)
10. [Future Provisions](#Future-Provisions)


## Introduction

Eventlite is a clone of the self service ticketing and event promotion website. Anyone can create or find events to attend that they have a passion for or to enrich their lives. Events range from fundraisers to gaming competitions to live music events and guitar lessons. Events can be virtual or in person. 


## Technologies
### Frontend 
 * React.js
 * Redux.js
 * SCSS
 * HTML5
 * Javascript

### Backend
 * Ruby on Rails -v: 2.5.1
 * JBuilder
 * Postgresql

### Hosting
 * Heroku
 * AWS
 
## Landing Page
The landing page welcomes users and shows the most relevant events based on recent events and the date. The featured events section presents users with ideas for events that they may want to explore. 
![Landing Page](https://user-images.githubusercontent.com/31423958/116631327-b320c080-a909-11eb-8379-b4cbcccd96d3.gif)

## User Authentication
** Users can sign up, sign in, and sign out.
 * A demo account is available to try login and test all the Eventlite features
 * Error messages will be displayed if there is an error signing up or in. 
![Sign up](https://user-images.githubusercontent.com/31423958/116792773-9e623b00-aa77-11eb-8c57-d427c31f846c.gif)

## Suggestions
Events are suggested to the user based upon the events viewed during the session.

## Browse
Users and visitors can browse through events. The browse page provides the following filters: multiple date options, categories, event title, event location, and price.
![browse](https://user-images.githubusercontent.com/31423958/116792893-57c11080-aa78-11eb-8b8f-85298a1f50fa.gif)


## Create Events
Logged in users can create events that will appear on the website. The event creator can also create multiple tickets to sell for other users to register for the event.
![Create tickets](https://user-images.githubusercontent.com/31423958/116764319-99e54600-a9d5-11eb-9f22-4f99163cb4c3.gif)

## Managing Events
Logged in users can edit event details or delete their events on my Manage my events page. Events in this menu can be sorted and displays relevant information like the total amount of remaining tickets and the amount of revenue generated through ticket sales. The events are marked as incomplete if there are no tickets created yet for the event or past if the event is in the past. 
![Manage events page](https://user-images.githubusercontent.com/31423958/116764247-60143f80-a9d5-11eb-802c-549562eb752e.gif)

## View events
The full event details are displayed on the event show page. Here users can register for the event by purchasing tickets. Other similar events are provided to the user at the bottom of the page. 
![showevent](https://user-images.githubusercontent.com/31423958/116794015-0ec08a80-aa7f-11eb-8a37-4ced6abc6ea1.gif)

## Like Events
Events can be liked if the user is interested in attending.
![likes](https://user-images.githubusercontent.com/31423958/116793611-8f31bc00-aa7c-11eb-95c2-5981bd6f45db.gif)

## Future Provisions
- [ ] Google Maps integration
  * Event location will be more specific. Events in the same location as the visitor or user will be recommended first.
- [ ] Search Bar
  * Users can search the events by address or location.
