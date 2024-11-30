"use client"
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import router from 'next/router';
import { authService } from '@/services/authService';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      login(response.token);
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
        {error}
      </div>
    )}

    <div className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
          placeholder="Enter your password"
        />
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
          Forgot password?
        </a>
      </div>
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {loading ? 'Signing in...' : 'Sign in'}
    </button>

    <div className="text-sm text-center text-gray-600">
      Don&apos;t have an account?{' '}
      <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
        Sign up
      </a>
    </div>
  </form>
);
}
