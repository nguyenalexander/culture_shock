# speaktome
WDI Seattle 02 Project #1

##Concept
###The user:
This project was made for people living in a predominantly English speaking community, as a resource to find others who speak the same language as them. It's easy to cmopletely forget the skill of speaking a foreign language, as well as forgetting the culture behind it. This project aims to take the first step, and connect people through their language.

###The functionality:
Users can sign up, either through the site, or through Facebook. Upon signing up, the user will be prompted to make a username and input their location. Then, they can find their language or languages from a list of languages. Then they must rate themselves on their reading/writing fluency and speaking fluency for each language. After the sign up process is complete, they will be redirected to a home page, where they can see their subscribed languages and all the users within each language. Users can view other users profiles, and at the time being, can send them emails.

##Technologies
* Node Modules
	* Async, used for multiple calls to the database to render specific information in page.
	* bcrypt, password security.
	* body-parser
	* cloudinary (user avatars)
	* connect-flash for graceful errors
	* ejs
	* express
	* express sessions
	* geocoder (to plot user inputted locations.)
	* multer
	* parseurl
	* passport, passport-facebook, passport-local (for user authentication and creation.)
	* pg, pg-hstore
	* request
	* sequelize
* APIs
	* Facebook's API, primarily for user sign-up, but i would like to incorporate their messenger/chat API.
	* Mapbox, for graphical representation of user locations.
	
##Approach & Challenges
My process was very chronological. I had to get the user sign up working completely before I could move on to anything else. The order in which I created each page and the server-side code for each was main (sign up, sign in, about) -> signup -> sign up 1/facebook sign up 1 -> sign up 2/facebook sign up 2 -> home -> user profile -> unique user profiles.

The largest part of my project was the signup process and the database data fetching associated with each part. Authentication through passport was quite easy, but retrieving the data specific to each user proved to be a challenge. For example, in my home page, I am rendering only the signed in user's subscribed languages, and each other user associated with those languages. At first, I used simple for each methods on the database calls, but I couldn't render those results in the page. Then I moved on to async, but tried to improperly use two async each methods. Finally, the process that worked for me was writing a huge SQL query inside of sequelize, to get the data I needed on server-side, then filtering out the necessary information on client side with simple logic.

###Wireframes
![](http://imgur.com/gMs8VKt.jpg)
![](http://imgur.com/QKGKwbc.jpg)
![](http://imgur.com/1v1zxDr.jpg)
###ER Relationship map
####This is an outdated ER map, which was made for my previous idea. It is essentialy the same as my finished product. Replace culture with language, and take out the events table.
![](http://imgur.com/EVj55M4.jpg)

##The finished product
You can see my semi-finished project at:
https://speak-to-me.herokuapp.com
It is still visually rough around the edges, but the necessary functionality is there.

##What still needs to be done
I still need to have validations for each form, as well as default user images if the user decides to not upload an avatar, as the profile pages will crash if the user does not have a defined user image. I also have not implemented user-friend functionality, where users can add others as their friends, and view their friends activity. I would also like to implement comments under each language, so users can talk about events and invite others. I also must make the languages specific to a locale, so users can view global users as well as users from their area. I need to make my site more responsive, for mobile and desktop, as well as clean up the user interface. I also need to annotate my code because as of right now, it is a mess.