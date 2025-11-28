import { Employee } from '../models/Employee.js';
import { Task } from '../models/Task.js';

// Get all employees with optional filters
export const getAllEmployees = async (req, res, next) => {
  try {
    const { department, role, search } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }

    if (role) {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const employees = await Employee.find(query)
      .sort({ createdAt: -1 });

    // Get task counts and tasks for each employee
    const employeesWithTasks = await Promise.all(
      employees.map(async (employee) => {
        const tasks = await Task.find({ assigned_to: employee._id })
          .select('title status priority deadline')
          .sort({ createdAt: -1 });
        const taskCount = tasks.length;
        return {
          ...employee.toObject(),
          tasks,
          taskCount
        };
      })
    );

    res.json({
      success: true,
      data: employeesWithTasks,
      count: employeesWithTasks.length
    });
  } catch (error) {
    next(error);
  }
};

// Get single employee with tasks
export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    
    if (employee) {
      const tasks = await Task.find({ assigned_to: employee._id })
        .select('title description status priority deadline createdAt')
        .sort({ createdAt: -1 });
      employee.tasks = tasks;
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }
    next(error);
  }
};

// Create new employee
export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, role, department, phone, avatar_url } = req.body;

    const employee = await Employee.create({
      name,
      email,
      role,
      department,
      phone: phone || null,
      avatar_url: avatar_url || null
    });

    res.status(201).json({
      success: true,
      data: employee,
      message: 'Employee created successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    next(error);
  }
};

// Update employee
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, department, phone, avatar_url } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Update fields
    if (name) employee.name = name;
    if (email) employee.email = email;
    if (role) employee.role = role;
    if (department) employee.department = department;
    if (phone !== undefined) employee.phone = phone;
    if (avatar_url !== undefined) employee.avatar_url = avatar_url;

    await employee.save();

    res.json({
      success: true,
      data: employee,
      message: 'Employee updated successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    next(error);
  }
};

// Delete employee
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    // Unassign all tasks from this employee
    await Task.updateMany(
      { assigned_to: id },
      { $set: { assigned_to: null } }
    );

    await Employee.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid employee ID'
      });
    }
    next(error);
  }
};
