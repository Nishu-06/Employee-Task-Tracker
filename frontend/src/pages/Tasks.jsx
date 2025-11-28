import { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, X, Calendar } from 'lucide-react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from '../api/tasks'
import { getEmployees } from '../api/employees'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

const Tasks = () => {
  const { isAdmin } = useAuth()
  const [tasks, setTasks] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ priority: '', assigned_to: '' })
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    assigned_to: '',
    deadline: ''
  })

  const statusColumns = [
    { id: 'To Do', title: 'To Do', color: 'bg-blue-100 dark:bg-blue-900/30 border-blue-500' },
    { id: 'In Progress', title: 'In Progress', color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-500' },
    { id: 'Completed', title: 'Completed', color: 'bg-green-100 dark:bg-green-900/30 border-green-500' }
  ]

  useEffect(() => {
    fetchTasks()
    if (isAdmin()) {
      fetchEmployees()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filters])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const response = await getTasks({
        search: searchTerm || undefined,
        priority: filters.priority || undefined,
        assigned_to: filters.assigned_to || undefined
      })
      // Backend returns { success: true, data: tasks, count: ... }
      // getTasks returns response.data which is the backend response object
      // So response.data is the tasks array (based on console output)
      let tasksData = []
      if (response) {
        // Response structure: { success: true, data: Array, count: number }
        if (response.data && Array.isArray(response.data)) {
          tasksData = response.data
        } else if (response.success && response.data && Array.isArray(response.data)) {
          tasksData = response.data
        } else {
          tasksData = []
        }
      }
      setTasks(tasksData)
      console.log('Tasks loaded:', tasksData.length, 'Tasks:', tasksData)
      console.log('Task statuses:', tasksData.map(t => ({ id: t._id || t.id, title: t.title, status: t.status, statusType: typeof t.status })))
      console.log('Status columns:', statusColumns.map(c => c.id))
    } catch (error) {
      console.error('Error fetching tasks:', error) // Debug log
      toast.error(error.message || 'Failed to load tasks')
      setTasks([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployees = async () => {
    try {
      // Only fetch employees if admin (for assigning tasks)
      if (isAdmin()) {
        const response = await getEmployees()
        setEmployees(response.data)
      }
    } catch (error) {
      console.error('Failed to load employees:', error)
    }
  }

  const handleOpenModal = (task = null) => {
    if (task) {
      setSelectedTask(task)
      // Handle assigned_to - could be object (populated) or ID
      let assignedToId = ''
      if (task.assigned_to) {
        if (typeof task.assigned_to === 'object' && task.assigned_to._id) {
          assignedToId = task.assigned_to._id.toString()
        } else {
          assignedToId = task.assigned_to.toString()
        }
      }
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        assigned_to: assignedToId,
        deadline: task.deadline ? format(new Date(task.deadline), 'yyyy-MM-dd') : ''
      })
    } else {
      setSelectedTask(null)
      setFormData({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'Medium',
        assigned_to: '',
        deadline: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTask(null)
    setFormData({
      title: '',
      description: '',
      status: 'To Do',
      priority: 'Medium',
      assigned_to: '',
      deadline: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Clean up the data before sending
      const taskData = {
        title: formData.title,
        description: formData.description || null,
        status: formData.status || 'To Do',
        priority: formData.priority || 'Medium',
        assigned_to: formData.assigned_to && formData.assigned_to !== '' ? formData.assigned_to : null,
        deadline: formData.deadline && formData.deadline !== '' ? formData.deadline : null
      }
      if (selectedTask) {
        const taskId = selectedTask._id || selectedTask.id
        await updateTask(taskId, taskData)
        toast.success('Task updated successfully')
      } else {
        await createTask(taskData)
        toast.success('Task created successfully')
      }
      handleCloseModal()
      // Refresh tasks list immediately after a short delay to ensure backend has processed
      setTimeout(() => {
        fetchTasks()
      }, 300)
    } catch (error) {
      // Show detailed validation errors if available
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.message || err.msg).join(', ')
        toast.error(`Validation failed: ${errorMessages}`)
      } else {
        toast.error(error.message || 'Failed to save task')
      }
      console.error('Task creation error:', error.response?.data || error)
    }
  }

  const handleDelete = async () => {
    try {
      const taskId = selectedTask._id || selectedTask.id
      await deleteTask(taskId)
      toast.success('Task deleted successfully')
      setIsDeleteDialogOpen(false)
      setSelectedTask(null)
      fetchTasks()
    } catch (error) {
      toast.error(error.message || 'Failed to delete task')
    }
  }

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // draggableId is already a string from MongoDB _id
    const taskId = draggableId
    const newStatus = destination.droppableId

    try {
      await updateTaskStatus(taskId, newStatus)
      toast.success('Task status updated')
      fetchTasks()
    } catch (error) {
      toast.error(error.message || 'Failed to update task status')
      fetchTasks() // Revert on error
    }
  }

  const getTasksByStatus = (status) => {
    const filtered = tasks.filter(task => {
      const taskStatus = task.status?.trim()
      const matchStatus = status?.trim()
      return taskStatus === matchStatus
    })
    return filtered
  }

  // Helper to get task ID (handle both _id and id)
  const getTaskId = (task) => {
    return task._id || task.id
  }

  // Helper to get assigned employee (handle both populated object and ID)
  const getAssignedEmployee = (task) => {
    if (!task.assigned_to) return null
    // If assigned_to is populated (object), use it directly
    if (typeof task.assigned_to === 'object' && task.assigned_to !== null) {
      return task.assigned_to
    }
    // If assigned_to is an ID, find in employees array
    const employeeId = task.assigned_to.toString()
    return employees.find(emp => {
      const empId = emp._id || emp.id
      return empId && empId.toString() === employeeId
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'Low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isOverdue = (deadline) => {
    if (!deadline) return false
    return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString()
  }

  const clearFilters = () => {
    setFilters({ priority: '', assigned_to: '' })
    setSearchTerm('')
  }

  const hasActiveFilters = filters.priority || filters.assigned_to || searchTerm

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {isAdmin() ? 'Manage and track your team\'s tasks' : 'View your assigned tasks'}
          </p>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="input-field"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {isAdmin() && (
              <select
                value={filters.assigned_to}
                onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })}
                className="input-field"
              >
                <option value="">All Assignees</option>
                <option value="unassigned">Unassigned</option>
                {employees.map(emp => {
                  const empId = emp._id || emp.id
                  return (
                    <option key={empId} value={empId.toString()}>{emp.name}</option>
                  )
                })}
              </select>
            )}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn-secondary flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {statusColumns.map((column) => {
              const columnTasks = getTasksByStatus(column.id)
              return (
                <div key={column.id} className="flex flex-col">
                  <div className={`${column.color} border-l-4 p-4 rounded-t-lg`}>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      {column.title}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {columnTasks.length} task{columnTasks.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 min-h-[400px] p-4 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg ${
                          snapshot.isDraggingOver ? 'bg-gray-100 dark:bg-gray-800' : ''
                        }`}
                      >
                        {columnTasks.length === 0 ? (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                            No tasks
                          </div>
                        ) : (
                          columnTasks.map((task, index) => {
                            const assignedEmployee = getAssignedEmployee(task)
                            const taskId = getTaskId(task)
                            return (
                              <Draggable
                                key={taskId}
                                draggableId={taskId.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`card mb-4 cursor-move ${
                                      snapshot.isDragging ? 'shadow-2xl rotate-2' : ''
                                    }`}
                                  >
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="font-semibold text-gray-900 dark:text-white flex-1">
                                        {task.title}
                                      </h3>
                                      {isAdmin() && (
                                        <div className="flex gap-1 ml-2">
                                          <button
                                            onClick={() => handleOpenModal(task)}
                                            className="p-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                            title="Edit task"
                                          >
                                            <Edit className="h-3 w-3" />
                                          </button>
                                          <button
                                            onClick={() => {
                                              setSelectedTask(task)
                                              setIsDeleteDialogOpen(true)
                                            }}
                                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                            title="Delete task"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                    {task.description && (
                                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                        {task.description}
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                      <span className={`badge ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                      </span>
                                      {assignedEmployee && (
                                        <div className="flex items-center gap-1">
                                          <img
                                            src={assignedEmployee.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedEmployee.name)}&background=random`}
                                            alt={assignedEmployee.name}
                                            className="h-5 w-5 rounded-full"
                                            onError={(e) => {
                                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(assignedEmployee.name)}&background=random`
                                            }}
                                          />
                                          <span className="text-xs text-gray-600 dark:text-gray-400">
                                            {assignedEmployee.name ? assignedEmployee.name.split(' ')[0] : 'Unknown'}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {task.deadline && (
                                      <div className={`mt-2 flex items-center gap-1 text-xs ${
                                        isOverdue(task.deadline)
                                          ? 'text-red-600 dark:text-red-400'
                                          : 'text-gray-600 dark:text-gray-400'
                                      }`}>
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(task.deadline), 'MMM dd, yyyy')}
                                        {isOverdue(task.deadline) && ' (Overdue)'}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            )
                          })
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </div>
        </DragDropContext>
      )}

      {/* Add/Edit Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedTask ? 'Edit Task' : 'Add New Task'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="input-field"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="input-field"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className={isAdmin() ? "grid grid-cols-2 gap-4" : ""}>
            {isAdmin() && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Assign To
                </label>
                <select
                  value={formData.assigned_to}
                  onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  className="input-field"
                >
                  <option value="">Unassigned</option>
                  {employees.map(emp => {
                    const empId = emp._id || emp.id
                    return (
                      <option key={empId} value={empId.toString()}>{emp.name}</option>
                    )
                  })}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {selectedTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedTask(null)
        }}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  )
}

export default Tasks

