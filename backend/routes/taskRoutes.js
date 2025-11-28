import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} from '../controllers/taskController.js';
import {
  validateTask,
  validateTaskUpdate,
  validateId
} from '../middleware/validation.js';
import { validate } from '../middleware/validation.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getAllTasks);
router.get('/:id', validate(validateId), getTaskById);
router.post('/', restrictTo('admin'), validate(validateTask), createTask);
router.put('/:id', restrictTo('admin'), validate([...validateId, ...validateTaskUpdate]), updateTask);
router.patch('/:id/status', validate(validateId), updateTaskStatus); // Users can update their own task status
router.delete('/:id', restrictTo('admin'), validate(validateId), deleteTask);

export default router;

