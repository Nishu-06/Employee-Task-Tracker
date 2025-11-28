import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, CheckSquare, Moon, Sun, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Layout = ({ children, darkMode, setDarkMode }) => {
  const location = useLocation()
  const { user, logout, isAdmin } = useAuth()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/employees', label: 'Employees', icon: Users },
    { path: '/tasks', label: 'Tasks', icon: CheckSquare },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Animated Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <style>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .blob-animation {
            animation: blob 7s ease-in-out infinite;
          }
          .blob-animation-delay-2 {
            animation: blob 7s ease-in-out infinite 2s;
          }
          .blob-animation-delay-4 {
            animation: blob 7s ease-in-out infinite 4s;
          }
        `}</style>
        
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"></div>
        
        {/* Animated gradient orbs - More visible */}
        <div 
          className="blob-animation absolute top-0 -left-4 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: darkMode ? 'rgba(14, 165, 233, 0.2)' : 'rgba(125, 211, 252, 0.6)',
            mixBlendMode: darkMode ? 'soft-light' : 'multiply',
          }}
        ></div>
        <div 
          className="blob-animation-delay-2 absolute top-0 -right-4 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(196, 181, 253, 0.6)',
            mixBlendMode: darkMode ? 'soft-light' : 'multiply',
          }}
        ></div>
        <div 
          className="blob-animation-delay-4 absolute -bottom-8 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(147, 197, 253, 0.6)',
            mixBlendMode: darkMode ? 'soft-light' : 'multiply',
          }}
        ></div>
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.05) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md border-b border-gray-200/50 dark:border-gray-700/50" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  TaskFlow ProU
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                        isActive(item.path)
                          ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <div className="flex items-center gap-2 mr-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isAdmin() ? 'Admin' : 'User'}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              {user && (
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-700 dark:text-primary-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ zIndex: 1 }}>
        {children}
      </main>
    </div>
  )
}

export default Layout
