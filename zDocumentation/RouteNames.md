
Booth api's - /api/booths:-

GET /   -> gets all booths in a event. (admin) **exhibitor may access as well if required check later**
POST /  -> creates booth for an event. (admin) *exhibitor and status value is given during booth booking not when creating, till then defualt val is accepted.
DELETE /boothID -> delets the booth. (admin).
POST /booking   -> books booth for exhibitior. (exhibitor, admin) 