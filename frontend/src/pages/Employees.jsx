import { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, Filter, X, Users } from 'lucide-react'
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employees'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import toast from 'react-hot-toast'

const Employees = () => {
  const { isAdmin } = useAuth()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({ department: '', role: '' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Developer',
    department: 'Engineering',
    phone: ''
  })

  useEffect(() => {
    fetchEmployees()
  }, [searchTerm, filters])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await getEmployees({
        search: searchTerm || undefined,
        department: filters.department || undefined,
        role: filters.role || undefined
      })
      setEmployees(response.data)
    } catch (error) {
      toast.error(error.message || 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setSelectedEmployee(employee)
      setFormData({
        name: employee.name,
        email: employee.email,
        role: employee.role,
        department: employee.department,
        phone: employee.phone || ''
      })
    } else {
      setSelectedEmployee(null)
      setFormData({
        name: '',
        email: '',
        role: 'Developer',
        department: 'Engineering',
        phone: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEmployee(null)
    setFormData({
      name: '',
      email: '',
      role: 'Developer',
      department: 'Engineering',
      phone: ''
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedEmployee) {
        const employeeId = selectedEmployee._id || selectedEmployee.id
        await updateEmployee(employeeId, formData)
        toast.success('Employee updated successfully')
      } else {
        await createEmployee(formData)
        toast.success('Employee created successfully')
      }
      handleCloseModal()
      fetchEmployees()
    } catch (error) {
      toast.error(error.message || 'Failed to save employee')
    }
  }

  const handleDelete = async () => {
    try {
      const employeeId = selectedEmployee._id || selectedEmployee.id
      await deleteEmployee(employeeId)
      toast.success('Employee deleted successfully')
      setIsDeleteDialogOpen(false)
      setSelectedEmployee(null)
      fetchEmployees()
    } catch (error) {
      toast.error(error.message || 'Failed to delete employee')
    }
  }

  const clearFilters = () => {
    setFilters({ department: '', role: '' })
    setSearchTerm('')
  }

  const hasActiveFilters = filters.department || filters.role || searchTerm

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Employees</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your team members</p>
        </div>
        {isAdmin() && (
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Employee
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
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="input-field"
            >
              <option value="">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="HR">HR</option>
            </select>
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="input-field"
            >
              <option value="">All Roles</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Intern">Intern</option>
            </select>
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

      {/* Employees Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : employees.length === 0 ? (
        <div className="card text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No employees found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => {
            const employeeId = employee._id || employee.id
            return (
              <div key={employeeId} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={employee.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
                    alt={employee.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {employee.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</p>
                  </div>
                </div>
                {isAdmin() && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(employee)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      title="Edit employee"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee)
                        setIsDeleteDialogOpen(true)
                      }}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete employee"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="badge bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400">
                    {employee.role}
                  </span>
                  <span className="badge bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {employee.department}
                  </span>
                </div>
                {employee.phone && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📞 {employee.phone}
                  </p>
                )}
                {employee.tasks && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    📋 {employee.tasks.length} task{employee.tasks.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role *
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="input-field"
              >
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Intern">Intern</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department *
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="input-field"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={handleCloseModal} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {selectedEmployee ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setSelectedEmployee(null)
        }}
        onConfirm={handleDelete}
        title="Delete Employee"
        message={`Are you sure you want to delete ${selectedEmployee?.name}? This action cannot be undone.`}
        confirmText="Delete"
      />
    </div>
  )
}

export default Employees

