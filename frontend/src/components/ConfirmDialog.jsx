import Modal from './Modal'

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) => {
  const variantClasses = {
    danger: 'bg-red-600 hover:bg-red-700',
    primary: 'bg-primary-600 hover:bg-primary-700'
  }

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="py-4">
        <p className="text-gray-700 dark:text-gray-300">{message}</p>
      </div>
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="btn-secondary"
        >
          {cancelText}
        </button>
        <button
          onClick={handleConfirm}
          className={`${variantClasses[variant]} text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog

