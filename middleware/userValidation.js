import { check, validationResult } from 'express-validator';

//middleware function that checks user input for registration
export const validateUserSignUp = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must have a valid name!')
        .isLength({ min: 3 })
        .withMessage('name must be at least 3 digits'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .isLength({ min: 6, max: 35 })
        .withMessage('password must be between 6 and 35 characters'),
    check('confirmpassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('must have same password');
            }
            return true;
        }),
];

//outputs errors of user validation
export const UserValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
};

export const validateUserlogin = [
    check('email').normalizeEmail().isEmail().withMessage('Invalid email'),
    check('password').trim().not().isEmpty().withMessage('insert password'),
];
