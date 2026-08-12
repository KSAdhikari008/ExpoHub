import { param } from "express-validator";

export const registrationIdValidator = [
    param('registrationId')    
        .isMongoId()
        .withMessage('Invalid parameter.')
]   