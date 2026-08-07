import { body, param } from "express-validator";

export const eventValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body('description')
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 10, max: 500 })
        .withMessage("Description must be between 10 and 500 characters"),

    body('venue')
        .trim()
        .notEmpty()
        .withMessage("Venue is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Venue must be between 3 and 100 characters"),

    body('startDate')
        .notEmpty()
        .withMessage("Start date is required")
        .isISO8601() 
        .withMessage("Start date must be a valid ISO 8601 date")
        .toDate(), // html form sends iso format but string type.Coverts to date data type.

    body('endDate')
        .notEmpty()
        .withMessage("End date is required")
        .isISO8601()
        .withMessage("End date must be a valid ISO 8601 date")
        .toDate() // converted to a js date obj.
        .custom((value, { req }) => {
            if (req.body.startDate && value < req.body.startDate) { // start and end date have both been coverted to datee by now hence can be direclty compared.
                throw new Error("End date must be the same or after start date");
            }
            return true;
        }),

    body('status')
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["Upcoming", "Ongoing", "Ended"])
        .withMessage("Status must be Upcoming, Ongoing, or Ended"),

    body('banner').custom((value, { req }) => { // multer dont throw err if no file is attacked by the user.
        if (!req.file) {
            throw new Error("Banner image is required");
        }
        return true;
    })
];

export const eventIdValidator = [
    param('eventId')    
        .isMongoId()
        .withMessage('Invalid parameter.')
]