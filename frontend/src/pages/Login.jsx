import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogIn, Mail, Lock, Shield, User } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const result = await login(formData.email, formData.password)
    setLoading(false)

    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 relative overflow-hidden">
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
        
        {/* Animated gradient orbs */}
        <div 
          className="blob-animation absolute top-0 -left-4 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: 'rgba(125, 211, 252, 0.6)',
            mixBlendMode: 'multiply',
          }}
        ></div>
        <div 
          className="blob-animation-delay-2 absolute top-0 -right-4 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: 'rgba(196, 181, 253, 0.6)',
            mixBlendMode: 'multiply',
          }}
        ></div>
        <div 
          className="blob-animation-delay-4 absolute -bottom-8 left-20 w-96 h-96 rounded-full blur-3xl"
          style={{
            backgroundColor: 'rgba(147, 197, 253, 0.6)',
            mixBlendMode: 'multiply',
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

      <div className="max-w-md w-full relative" style={{ zIndex: 1 }}>
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
              <LogIn className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Shield className="h-3 w-3" />
                <span>Admin</span>
              </div>
              <span className="text-gray-400">•</span>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <User className="h-3 w-3" />
                <span>User</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-300 font-medium mb-3">Demo Credentials:</p>
              <div className="text-xs text-blue-700 dark:text-blue-400 space-y-3">
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <p className="font-semibold">Admin Account</p>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400">admin@taskflow.com</p>
                  <p className="text-blue-500 dark:text-blue-500">Password: admin123</p>
                  <p className="text-blue-500 dark:text-blue-500 mt-1 text-[10px]">Full access: Manage employees & all tasks</p>
                </div>
                <div className="p-2 bg-white dark:bg-gray-800 rounded border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    <p className="font-semibold">Regular User Account</p>
                  </div>
                  <p className="text-blue-600 dark:text-blue-400">user@taskflow.com</p>
                  <p className="text-blue-500 dark:text-blue-500">Password: user123</p>
                  <p className="text-blue-500 dark:text-blue-500 mt-1 text-[10px]">Limited access: View assigned tasks only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
