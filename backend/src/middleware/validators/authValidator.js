import { body } from "express-validator";

export const registerValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Enter is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters.")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores."),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(), // converts the email to standard format

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Pasword is required")
    .isLength({ min: 7, max: 20 })
    .withMessage("Password must be between 7 and 20 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character."),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role cannot be empty")
    .isIn(["Visitor", "Admin", "Exhibitor"])
    .withMessage("Invlaid role"),
];
