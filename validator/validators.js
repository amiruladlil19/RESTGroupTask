const { body } = require('express-validator');

exports.validateRegister = [
    body('id', 'Cannot be empty').notEmpty(),
    body('id', 'NaN').isNumeric(),
    body('username', 'Cannot be empty').notEmpty(),
    body('username', 'Must a string').isString(),
    body('username', 'Must be minimal 6 characters').isLength({ min: 6 }),
    body('username', 'Must be maximal 12 characters').isLength({ max: 12 }),
    body('password', 'Must be minimal 8 characters').isLength({ min: 8 }),
    body('password', 'Must be maximal 16 characters').isLength({ max: 16 })
]

exports.validateLogin = [
    body('username', 'Cannot be empty').notEmpty(),
    body('username', 'Must a string').isString(),
    body('password', 'Cannot be empty').notEmpty(),
    body('password', 'Must a string').isString()
]

exports.validateFriend = [
    body('id', 'NaN').isNumeric(),
    body('id', 'Cannot be empty').notEmpty(),
    body('userId', 'NaN').isNumeric(),
    body('userId', 'Cannot be empty').notEmpty(),
    body('name', 'Must a string').isString(),
    body('name', 'Cannot be empty').notEmpty(),
    body('name', 'Must be minimal 3 characters').isLength({ min: 3 }),
    body('name', 'Must be maximal 30 characters').isLength({ max: 30 })
]

exports.validateItem = [
    body('id', 'NaN').isNumeric(),
    body('id', 'Cannot be empty').notEmpty(),
    body('userId', 'NaN').isNumeric(),
    body('userId', 'Cannot be empty').notEmpty(),
    body('name', 'Must a string').isString(),
    body('name', 'Cannot be empty').notEmpty(),
    body('name', 'Must be minimal 3 characters').isLength({ min: 3 }),
    body('name', 'Must be maximal 30 characters').isLength({ max: 30 })
]