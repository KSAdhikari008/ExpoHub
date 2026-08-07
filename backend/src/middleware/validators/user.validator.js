import { param } from "express-validator";


export const userIdValidator = [
    param('userId')
        .isMongoId()
        .withMessage('Invalid parameter.')
]