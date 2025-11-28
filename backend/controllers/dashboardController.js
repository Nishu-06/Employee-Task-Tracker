import { Employee } from '../models/Employee.js';
import { Task } from '../models/Task.js';
import { User } from '../models/User.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res, next) => {
  try {
    // All users (admin and regular) see global dashboard summary
    // Regular users can see all employees and all tasks in dashboard
    const totalEmployees = await Employee.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    const pendingTasks = await Task.countDocuments({
      status: { $in: ['To Do', 'In Progress'] }
    });

    // Tasks by status using aggregation (global for all users)
    const tasksByStatus = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          status: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Tasks by priority using aggregation (global for all users)
    const tasksByPriority = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          priority: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    // Recent tasks (last 10) - global for all users
    const recentTasks = await Task.find()
      .populate({
        path: 'assigned_to',
        model: 'Employee',
        select: 'name email role department avatar_url'
      })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        overview: {
          totalEmployees,
          totalTasks,
          completedTasks,
          pendingTasks
        },
        tasksByStatus: tasksByStatus.map(item => ({
          status: item.status,
          count: item.count
        })),
        tasksByPriority: tasksByPriority.map(item => ({
          priority: item.priority,
          count: item.count
        })),
        recentTasks
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get employee workload (task count per employee)
export const getEmployeeWorkload = async (req, res, next) => {
  try {
    // Use aggregation to get task count per employee
    const workloadData = await Task.aggregate([
      {
        $match: {
          assigned_to: { $ne: null }
        }
      },
      {
        $group: {
          _id: '$assigned_to',
          taskCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: {
          path: '$employee',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          id: '$_id',
          name: '$employee.name',
          email: '$employee.email',
          role: '$employee.role',
          department: '$employee.department',
          avatar_url: '$employee.avatar_url',
          taskCount: 1,
          _id: 0
        }
      },
      {
        $sort: { taskCount: -1 }
      }
    ]);

    // Also get employees with 0 tasks
    const employeesWithTasks = workloadData.map(item => item.id.toString());
    const employeesWithoutTasks = await Employee.find({
      _id: { $nin: employeesWithTasks }
    }).select('name email role department avatar_url');

    const allEmployees = [
      ...workloadData,
      ...employeesWithoutTasks.map(emp => ({
        id: emp._id,
        name: emp.name,
        email: emp.email,
        role: emp.role,
        department: emp.department,
        avatar_url: emp.avatar_url,
        taskCount: 0
      }))
    ];

    res.json({
      success: true,
      data: allEmployees
    });
  } catch (error) {
    next(error);
  }
};
