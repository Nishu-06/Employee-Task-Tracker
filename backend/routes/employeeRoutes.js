import express from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';
import {
  validateEmployee,
  validateEmployeeUpdate,
  validateId
} from '../middleware/validation.js';
import { validate } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getAllEmployees);
router.get('/:id', validate(validateId), getEmployeeById);
router.post('/', restrictTo('admin'), validate(validateEmployee), createEmployee);
router.put('/:id', restrictTo('admin'), validate([...validateId, ...validateEmployeeUpdate]), updateEmployee);
router.delete('/:id', restrictTo('admin'), validate(validateId), deleteEmployee);

export default router;

