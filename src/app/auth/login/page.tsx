'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Icons } from '@/components/Icons';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle redirect reasons
  useEffect(() => {
    const reason = searchParams ? searchParams.get('reason') : null;
    if (reason === 'session_expired') {
      setSessionMessage('Your session has expired. Please log in again.');
    } else if (reason === 'invalid_token') {
      setSessionMessage('Your session is invalid. Please log in again.');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError('');
    setSessionMessage(''); // Clear session message when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSessionMessage('');

    try {
      await login(formData);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Icons.LoginIcon />
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {sessionMessage && (
          <div className="info-message">
            <Icons.AlertIcon />
            {sessionMessage}
          </div>
        )}

        {error && (
          <div className="error-message">
            <Icons.AlertIcon />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <Icons.EmailIcon />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <Icons.LockIcon />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="auth-button"
          >
            {isLoading ? (
              <>
                <Icons.LoadingIcon />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link href="/auth/register">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
