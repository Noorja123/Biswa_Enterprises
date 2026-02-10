'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Lock } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempted with:', { username, password })
      // Set authentication flag in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      // Navigate to employee management page
      router.push('/app')
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-500 to-orange-200 flex items-center justify-center p-4">
      {/* Gradient background with subtle blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-500 to-orange-200 opacity-100" />
      
      {/* White card container */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/images/biswas-logo.jpeg" 
            alt="Biswas Enterprises Logo" 
            className="h-24 w-auto object-contain mx-auto mb-4"
          />
        </div>

        {/* Welcome Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Welcome Back
        </h1>

        {/* Subheading */}
        <p className="text-sm text-gray-500 text-center mb-8">
          Login to manage your workforce
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 mt-6"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2026 BISWAS ENTERPRISES
        </p>
      </div>

      {/* CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  )
}
