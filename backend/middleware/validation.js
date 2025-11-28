import { body, param, query, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format errors for better readability
    const formattedErrors = errors.array().map(err => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors
    });
  };
};

// Employee validation rules
export const validateEmployee = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('role').isIn(['Manager', 'Developer', 'Designer', 'Intern']).withMessage('Invalid role'),
  body('department').isIn(['Engineering', 'Design', 'Marketing', 'HR']).withMessage('Invalid department'),
  body('phone').optional().isString(),
  body('avatar_url').optional().isURL().withMessage('Avatar URL must be valid')
];

export const validateEmployeeUpdate = [
  body('name').optional().trim().notEmpty(),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['Manager', 'Developer', 'Designer', 'Intern']),
  body('department').optional().isIn(['Engineering', 'Design', 'Marketing', 'HR']),
  body('phone').optional().isString(),
  body('avatar_url').optional().isURL()
];

// Task validation rules
export const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['To Do', 'In Progress', 'Completed']),
  body('priority').optional().isIn(['Low', 'Medium', 'High']),
  body('assigned_to')
    .optional()
    .custom((value) => {
      // Allow null, empty string, or valid MongoDB ObjectId string
      if (value === null || value === '' || value === undefined) {
        return true;
      }
      // Check if it's a valid MongoDB ObjectId format (24 hex characters)
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return objectIdRegex.test(value) || value === null;
    })
    .withMessage('Assigned to must be a valid employee ID'),
  body('deadline')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null) {
        return true; // Allow empty/null
      }
      // Check if it's a valid date string
      return !isNaN(Date.parse(value));
    })
    .withMessage('Deadline must be a valid date')
];

export const validateTaskUpdate = [
  body('title').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['To Do', 'In Progress', 'Completed']),
  body('priority').optional().isIn(['Low', 'Medium', 'High']),
  body('assigned_to')
    .optional()
    .custom((value) => {
      // Allow null, empty string, or valid MongoDB ObjectId string
      if (value === null || value === '' || value === undefined) {
        return true;
      }
      // Check if it's a valid MongoDB ObjectId format (24 hex characters)
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return objectIdRegex.test(value) || value === null;
    })
    .withMessage('Assigned to must be a valid employee ID'),
  body('deadline')
    .optional()
    .custom((value) => {
      if (!value || value === '' || value === null) {
        return true; // Allow empty/null
      }
      // Check if it's a valid date string
      return !isNaN(Date.parse(value));
    })
    .withMessage('Deadline must be a valid date')
];

export const validateId = [
  param('id')
    .custom((value) => {
      // Check if it's a valid MongoDB ObjectId format (24 hex characters)
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return objectIdRegex.test(value);
    })
    .withMessage('Invalid ID format')
];

