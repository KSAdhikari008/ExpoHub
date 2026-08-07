import { body, param } from "express-validator";

export const boothValidator = [
    body('boothName')
        .trim()
        .notEmpty()
        .withMessage('Booth name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Booth name must be between 3 and 100 characters'),
        
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 500 })
        .withMessage('Description must be between 10 and 500 characters'),

    body('boothNumber')
        .notEmpty()
        .withMessage('Booth number is required')
        .isInt({ min: 1 })
        .withMessage('Booth number must be a positive integer'),


    body('size')
        .trim()
        .notEmpty()
        .withMessage('Size is required')
        .isIn(['Small', 'Medium', 'Large'])
        .withMessage('Size must be Small, Medium, or Large'),

    body('event')
        .isMongoId()
        .withMessage('Invalid event id'),

    body('poster').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Poster image is required');
        }
        return true;
    })
];

export const boothIdValidator = [
    param('boothId')
        .isMongoId()
        .withMessage('Invalid parameter.')
]