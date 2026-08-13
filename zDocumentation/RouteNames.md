
Booth api's - /api/booths:-

GET /:eventId            -> gets all booths in a event. (admin) **exhibitor may access as well if required check later**
POST /                   -> creates booth for an event. (admin) *exhibitor and status value is given during booth booking not when creating, till then defualt val is accepted.
DELETE /:boothId         -> delets the booth. (admin).
POST /booking/:boothId   -> books booth for exhibitior. (exhibitor) 


REGISDTRATION api's - /api/registrations:-

GET /             -> gets all registrations of a user. (admin, visitor)
GET /             -> get reg of user by eventId and id in token. (visitor)
POST /:eventId    -> registers a user for an event. (visitor)


EVENT - /api/events :-

GET /                           -> gets all events. (all)
GET /:eventId                   -> gets a single event using id. (all)
POST /                          -> creates a new event. (admin)


USER - /api/users :-

GET /                           -> gets all users. (admin)
GET /me                         -> gets the logged in user info. (admin, exhibitor, visitor)
GET /:userId                    -> gets a single user using id. (admin)


AUTH - /api/auth :-

POST /register                  -> registers a new user. (visitor)
POST /login                     -> logs in the user. (visitor)
POST /logout                    -> logs out the user. (any)
GET /me                         -> gets the role of logged in user. (admin, exhibitor, visitor)