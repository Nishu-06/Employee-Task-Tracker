import { Task } from '../models/Task.js';
import { Employee } from '../models/Employee.js';
import { User } from '../models/User.js';
import mongoose from 'mongoose';

// Get all tasks with optional filters
export const getAllTasks = async (req, res, next) => {
  try {
    const { status, priority, assigned_to, search } = req.query;
    const query = {};

    // Regular users can only see tasks assigned to them
    if (req.user.role !== 'admin') {
      // Get the employee ID associated with the user
      const currentUser = await User.findById(req.user.userId).populate('employeeId');
      
      if (!currentUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      if (!currentUser.employeeId) {
        // User has no employee record - try to find or create one
        let employee = await Employee.findOne({ email: currentUser.email });
        
        if (!employee) {
          // Create employee record for existing user
          employee = await Employee.create({
            name: currentUser.name || 'User',
            email: currentUser.email,
            role: 'Developer',
            department: 'Engineering'
          });
        }
        
        // Link employee to user
        currentUser.employeeId = employee._id;
        await currentUser.save();
      }

      // Use the employee ID for query
      const employeeId = currentUser.employeeId._id || currentUser.employeeId;
      query.assigned_to = mongoose.Types.ObjectId.isValid(employeeId) 
        ? new mongoose.Types.ObjectId(employeeId)
        : employeeId;
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (assigned_to && req.user.role === 'admin') {
      // Only admins can filter by assigned_to
      if (assigned_to === 'unassigned') {
        query.assigned_to = null;
      } else {
        // Convert string ID to ObjectId if valid
        if (mongoose.Types.ObjectId.isValid(assigned_to)) {
          query.assigned_to = new mongoose.Types.ObjectId(assigned_to);
        } else {
          query.assigned_to = assigned_to;
        }
      }
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const tasks = await Task.find(query)
      .populate({
        path: 'assigned_to',
        model: 'Employee',
        select: 'name email role department avatar_url'
      })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).populate({
      path: 'assigned_to',
      model: 'Employee',
      select: 'name email role department avatar_url phone'
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }
    next(error);
  }
};

// Create new task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, assigned_to, deadline } = req.body;

    // Validate assigned_to if provided (and not null/empty)
    if (assigned_to && assigned_to !== '' && assigned_to !== null) {
      const employee = await Employee.findById(assigned_to);
      if (!employee) {
        return res.status(400).json({
          success: false,
          message: 'Invalid employee ID'
        });
      }
    }

    const task = await Task.create({
      title,
      description: description || null,
      status: status || 'To Do',
      priority: priority || 'Medium',
      assigned_to: (assigned_to && assigned_to !== '') ? assigned_to : null,
      deadline: (deadline && deadline !== '') ? deadline : null
    });

    const taskWithEmployee = await Task.findById(task._id).populate({
      path: 'assigned_to',
      model: 'Employee',
      select: 'name email role department avatar_url'
    });

    res.status(201).json({
      success: true,
      data: taskWithEmployee,
      message: 'Task created successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, deadline } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Validate assigned_to if provided
    if (assigned_to !== undefined && assigned_to !== null) {
      const employee = await Employee.findById(assigned_to);
      if (!employee) {
        return res.status(400).json({
          success: false,
          message: 'Invalid employee ID'
        });
      }
    }

    // Update fields
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (assigned_to !== undefined) task.assigned_to = assigned_to;
    if (deadline !== undefined) task.deadline = deadline;

    await task.save();

    const updatedTask = await Task.findById(id).populate({
      path: 'assigned_to',
      model: 'Employee',
      select: 'name email role department avatar_url'
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }
    next(error);
  }
};

// Update task status only
export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['To Do', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: To Do, In Progress, or Completed'
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Regular users can only update status of tasks assigned to them
    if (req.user.role !== 'admin') {
      const currentUser = await User.findById(req.user.userId).populate('employeeId');
      if (!currentUser.employeeId || task.assigned_to?.toString() !== currentUser.employeeId._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You can only update tasks assigned to you'
        });
      }
    }

    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(id).populate({
      path: 'assigned_to',
      model: 'Employee',
      select: 'name email role department avatar_url'
    });

    res.json({
      success: true,
      data: updatedTask,
      message: 'Task status updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }
    next(error);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID'
      });
    }
    next(error);
  }
};
