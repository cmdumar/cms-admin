"use client"
import { FormEvent, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }

      const data = await response.json();
      login(data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
     <div className="space-y-4">
       <div>
         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
           Name
         </label>
         <input
           id="name"
           type="text"
           required
           placeholder="Enter your name"
           value={formData.name}
           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 shadow-sm
             placeholder:text-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
         />
       </div>

       <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
           Email
         </label>
         <input
           id="email"
           type="email"
           required
           placeholder="Enter your email"
           value={formData.email}
           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 shadow-sm
             placeholder:text-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
         />
       </div>

       <div>
         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
           Password
         </label>
         <input
           id="password"
           type="password"
           required
           placeholder="Enter your password"
           value={formData.password}
           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 shadow-sm
             placeholder:text-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
         />
       </div>

       <div>
         <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
           Confirm Password
         </label>
         <input
           id="password_confirmation"
           type="password"
           required
           placeholder="Confirm your password"
           value={formData.password_confirmation}
           onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
           className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 shadow-sm
             placeholder:text-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
         />
       </div>
     </div>

     {error && (
       <div className="text-red-600 text-sm mt-2">{error}</div>
     )}

     <div className="mt-6">
       <button
         type="submit"
         disabled={loading}
         className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
           disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {loading ? 'Creating account...' : 'Sign up'}
       </button>
     </div>

     <div className="mt-4 text-sm text-center text-gray-600">
       Already have an account?{' '}
       <Link href="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
         Sign in
       </Link>
     </div>
   </form>
  );
}
