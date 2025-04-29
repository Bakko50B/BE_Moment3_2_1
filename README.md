# Exempel-API med Express
Ett skal för ett REST-API som använder NodeJs och Express.  
Cors används för att tillåta alla anrop från alla domäner (fungerar ok som expempel, men är inte att rekommendera i en riktig webbplats).

## Installation
Kör: 
**npm install**
Starta sedan applikationen med: 
**npm run serve**

## Uppdatering och nyheter
Installation av nodemon   
Nya och förändrade routes

## Routes
Dessa "endpoints" används:
* GET: 	http://localhost:3000/api/ 						-> Returnerar hälsningsfras  
* GET: 	http://localhost:3000/reviews 				    -> Visas alla bokrecensioner  
* POST: http://localhost:3000/reviews 			        -> Lägg till bokrecension  
* PUT: 	http://localhost:3000/reviews/:id			    -> Uppdatera en bokrecension  
* DELETE: http://localhost:3000/reviews/:id	            -> Radera en bokrecension  
* GET: http://localhost:3000/vadsomhelst                -> Visar ett meddelande om routen saknas  
Om någon annan route än ovan anropas ges ett felmeddelande som svar.  

## Av
Av Mattias Dahlgren, Mittuniversitetet, mattias.dahlgren@miun.se  
### Förvaltat av  
Torbjörn Lundberg, student Mittuniversitete, tolu2403@student.miun.se  