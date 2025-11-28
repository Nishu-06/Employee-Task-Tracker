import { connectDB } from '../config/database.js';
import { Employee } from '../models/Employee.js';
import { Task } from '../models/Task.js';
import { User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const employees = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@taskflow.com',
    role: 'Manager',
    department: 'Engineering',
    phone: '+91-98765-43210',
    avatar_url: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0ea5e9&color=fff'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@taskflow.com',
    role: 'Developer',
    department: 'Engineering',
    phone: '+91-98765-43211',
    avatar_url: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff'
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@taskflow.com',
    role: 'Developer',
    department: 'Engineering',
    phone: '+1-555-0103',
    avatar_url: 'https://ui-avatars.com/api/?name=Michael+Chen&background=10b981&color=fff'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@taskflow.com',
    role: 'Designer',
    department: 'Design',
    phone: '+1-555-0104',
    avatar_url: 'https://ui-avatars.com/api/?name=Emily+Davis&background=f59e0b&color=fff'
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@taskflow.com',
    role: 'Designer',
    department: 'Design',
    phone: '+1-555-0105',
    avatar_url: 'https://ui-avatars.com/api/?name=David+Wilson&background=ef4444&color=fff'
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.anderson@taskflow.com',
    role: 'Manager',
    department: 'Marketing',
    phone: '+1-555-0106',
    avatar_url: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=ec4899&color=fff'
  },
  {
    name: 'Robert Taylor',
    email: 'robert.taylor@taskflow.com',
    role: 'Developer',
    department: 'Engineering',
    phone: '+1-555-0107',
    avatar_url: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=14b8a6&color=fff'
  },
  {
    name: 'Jessica Martinez',
    email: 'jessica.martinez@taskflow.com',
    role: 'Designer',
    department: 'Design',
    phone: '+1-555-0108',
    avatar_url: 'https://ui-avatars.com/api/?name=Jessica+Martinez&background=f97316&color=fff'
  },
  {
    name: 'James Brown',
    email: 'james.brown@taskflow.com',
    role: 'Manager',
    department: 'HR',
    phone: '+1-555-0109',
    avatar_url: 'https://ui-avatars.com/api/?name=James+Brown&background=6366f1&color=fff'
  },
  {
    name: 'Amanda White',
    email: 'amanda.white@taskflow.com',
    role: 'Intern',
    department: 'Engineering',
    phone: '+1-555-0110',
    avatar_url: 'https://ui-avatars.com/api/?name=Amanda+White&background=06b6d4&color=fff'
  },
  {
    name: 'Christopher Lee',
    email: 'christopher.lee@taskflow.com',
    role: 'Developer',
    department: 'Engineering',
    phone: '+1-555-0111',
    avatar_url: 'https://ui-avatars.com/api/?name=Christopher+Lee&background=84cc16&color=fff'
  },
  {
    name: 'Michelle Garcia',
    email: 'michelle.garcia@taskflow.com',
    role: 'Designer',
    department: 'Design',
    phone: '+1-555-0112',
    avatar_url: 'https://ui-avatars.com/api/?name=Michelle+Garcia&background=a855f7&color=fff'
  },
  {
    name: 'Daniel Rodriguez',
    email: 'daniel.rodriguez@taskflow.com',
    role: 'Intern',
    department: 'Marketing',
    phone: '+1-555-0113',
    avatar_url: 'https://ui-avatars.com/api/?name=Daniel+Rodriguez&background=22c55e&color=fff'
  },
  {
    name: 'Jennifer Lopez',
    email: 'jennifer.lopez@taskflow.com',
    role: 'Manager',
    department: 'Design',
    phone: '+1-555-0114',
    avatar_url: 'https://ui-avatars.com/api/?name=Jennifer+Lopez&background=eab308&color=fff'
  },
  {
    name: 'Kevin Harris',
    email: 'kevin.harris@taskflow.com',
    role: 'Developer',
    department: 'Engineering',
    phone: '+1-555-0115',
    avatar_url: 'https://ui-avatars.com/api/?name=Kevin+Harris&background=3b82f6&color=fff'
  }
];

// Tasks with employee index references (will be converted to ObjectIds)
const tasksData = [
  {
    title: 'Implement user authentication system',
    description: 'Create JWT-based authentication with login and registration endpoints',
    status: 'In Progress',
    priority: 'High',
    assigned_to: 1, // Sarah Johnson (index 1)
    deadline: new Date('2024-02-15')
  },
  {
    title: 'Design new landing page',
    description: 'Create modern and responsive landing page design',
    status: 'To Do',
    priority: 'High',
    assigned_to: 3, // Emily Davis (index 3)
    deadline: new Date('2024-02-20')
  },
  {
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'Completed',
    priority: 'Medium',
    assigned_to: 2, // Michael Chen (index 2)
    deadline: new Date('2024-01-30')
  },
  {
    title: 'Write API documentation',
    description: 'Document all API endpoints with examples',
    status: 'In Progress',
    priority: 'Medium',
    assigned_to: 6, // Robert Taylor (index 6)
    deadline: new Date('2024-02-18')
  },
  {
    title: 'Create marketing campaign materials',
    description: 'Design banners, social media posts, and email templates',
    status: 'To Do',
    priority: 'Low',
    assigned_to: 4, // David Wilson (index 4)
    deadline: new Date('2024-02-25')
  },
  {
    title: 'Optimize database queries',
    description: 'Review and optimize slow database queries',
    status: 'To Do',
    priority: 'Medium',
    assigned_to: 2, // Michael Chen
    deadline: new Date('2024-02-22')
  },
  {
    title: 'Conduct employee training session',
    description: 'Organize training on new company policies',
    status: 'Completed',
    priority: 'High',
    assigned_to: 8, // James Brown (index 8)
    deadline: new Date('2024-01-25')
  },
  {
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout issues on mobile devices',
    status: 'In Progress',
    priority: 'High',
    assigned_to: 1, // Sarah Johnson
    deadline: new Date('2024-02-12')
  },
  {
    title: 'Create brand identity guidelines',
    description: 'Document logo usage, colors, and typography',
    status: 'Completed',
    priority: 'Medium',
    assigned_to: 7, // Jessica Martinez (index 7)
    deadline: new Date('2024-01-28')
  },
  {
    title: 'Implement dark mode feature',
    description: 'Add dark mode toggle with theme persistence',
    status: 'To Do',
    priority: 'Low',
    assigned_to: 10, // Christopher Lee (index 10)
    deadline: new Date('2024-03-01')
  },
  {
    title: 'Setup monitoring and logging',
    description: 'Configure error tracking and application monitoring',
    status: 'In Progress',
    priority: 'Medium',
    assigned_to: 6, // Robert Taylor
    deadline: new Date('2024-02-16')
  },
  {
    title: 'Design mobile app mockups',
    description: 'Create wireframes and high-fidelity designs for mobile app',
    status: 'To Do',
    priority: 'High',
    assigned_to: 11, // Michelle Garcia (index 11)
    deadline: new Date('2024-02-28')
  },
  {
    title: 'Review code pull requests',
    description: 'Review and merge pending pull requests',
    status: 'In Progress',
    priority: 'Medium',
    assigned_to: 0, // John Smith (index 0)
    deadline: new Date('2024-02-14')
  },
  {
    title: 'Plan Q2 marketing strategy',
    description: 'Develop marketing plan for Q2 2024',
    status: 'To Do',
    priority: 'High',
    assigned_to: 5, // Lisa Anderson (index 5)
    deadline: new Date('2024-02-19')
  },
  {
    title: 'Update employee handbook',
    description: 'Revise employee handbook with latest policies',
    status: 'Completed',
    priority: 'Low',
    assigned_to: 8, // James Brown
    deadline: new Date('2024-01-20')
  },
  {
    title: 'Implement search functionality',
    description: 'Add advanced search with filters',
    status: 'To Do',
    priority: 'Medium',
    assigned_to: 10, // Christopher Lee
    deadline: new Date('2024-02-24')
  },
  {
    title: 'Create onboarding documentation',
    description: 'Write guides for new employee onboarding',
    status: 'In Progress',
    priority: 'Medium',
    assigned_to: 13, // Jennifer Lopez (index 13)
    deadline: new Date('2024-02-17')
  },
  {
    title: 'Design email newsletter template',
    description: 'Create responsive email template for monthly newsletter',
    status: 'To Do',
    priority: 'Low',
    assigned_to: 4, // David Wilson
    deadline: new Date('2024-02-26')
  },
  {
    title: 'Refactor legacy code',
    description: 'Improve code structure and remove technical debt',
    status: 'In Progress',
    priority: 'Low',
    assigned_to: 14, // Kevin Harris (index 14)
    deadline: new Date('2024-03-05')
  },
  {
    title: 'Setup automated testing',
    description: 'Write unit and integration tests',
    status: 'To Do',
    priority: 'High',
    assigned_to: 9, // Amanda White (index 9)
    deadline: new Date('2024-02-21')
  },
  {
    title: 'Organize team building event',
    description: 'Plan and coordinate team building activities',
    status: 'Completed',
    priority: 'Low',
    assigned_to: 8, // James Brown
    deadline: new Date('2024-01-15')
  },
  {
    title: 'Create video tutorials',
    description: 'Produce tutorial videos for product features',
    status: 'To Do',
    priority: 'Medium',
    assigned_to: 12, // Daniel Rodriguez (index 12)
    deadline: new Date('2024-02-27')
  },
  {
    title: 'Implement caching layer',
    description: 'Add Redis caching for improved performance',
    status: 'In Progress',
    priority: 'Medium',
    assigned_to: 2, // Michael Chen
    deadline: new Date('2024-02-19')
  },
  {
    title: 'Design new logo variations',
    description: 'Create alternative logo designs for different use cases',
    status: 'To Do',
    priority: 'Low',
    assigned_to: 3, // Emily Davis
    deadline: new Date('2024-03-02')
  },
  {
    title: 'Conduct security audit',
    description: 'Review and fix security vulnerabilities',
    status: 'To Do',
    priority: 'High',
    assigned_to: 0, // John Smith
    deadline: new Date('2024-02-23')
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ Database connected');

    console.log('🔄 Clearing existing data...');
    await Employee.deleteMany({});
    await Task.deleteMany({});
    await User.deleteMany({});
    console.log('✅ Existing data cleared');

    console.log('🔄 Seeding employees...');
    const createdEmployees = await Employee.insertMany(employees);
    console.log(`✅ Created ${createdEmployees.length} employees`);

    console.log('🔄 Seeding tasks...');
    // Map employee indices to ObjectIds
    const tasks = tasksData.map(taskData => {
      const task = {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        deadline: taskData.deadline,
        assigned_to: taskData.assigned_to !== undefined 
          ? createdEmployees[taskData.assigned_to]._id 
          : null
      };
      return task;
    });

    const createdTasks = await Task.insertMany(tasks);
    console.log(`✅ Created ${createdTasks.length} tasks`);

    console.log('🔄 Creating default admin user...');
    const adminUser = await User.create({
      name: 'Rajesh Kumar',
      email: 'admin@taskflow.com',
      password: 'admin123',
      role: 'admin',
      employeeId: createdEmployees[0]._id // Link to first employee
    });
    console.log(`✅ Created admin user: ${adminUser.email} (password: admin123) - Name: Rajesh Kumar`);

    console.log('🔄 Creating default regular user...');
    const regularUser = await User.create({
      name: 'Priya Sharma',
      email: 'priya.sharma@taskflow.com',
      password: 'user123',
      role: 'user',
      employeeId: createdEmployees[1]._id // Link to second employee (Priya Sharma)
    });
    console.log(`✅ Created regular user: ${regularUser.email} (password: user123) - Name: Priya Sharma`);

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📝 Default Login Credentials:');
    console.log('   Admin: admin@taskflow.com / admin123');
    console.log('   User:  user@taskflow.com / user123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
