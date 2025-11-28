import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { body } from 'express-validator';

const router = express.Router();

// Validation rules
const validateRegister = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role')
];

const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Public routes
router.post('/register', validate(validateRegister), register);
router.post('/login', validate(validateLogin), login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, validate([body('name').optional().trim(), body('email').optional().isEmail()]), updateProfile);
router.put('/change-password', protect, changePassword);

export default router;

