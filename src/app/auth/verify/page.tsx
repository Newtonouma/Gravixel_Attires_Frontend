'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { Icons } from '@/components/Icons';

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();

  const emailParam = searchParams ? searchParams.get('email') || '' : '';
  const otpParam = searchParams ? searchParams.get('otp') || '' : '';

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState(otpParam);
  const [status, setStatus] = useState<'idle' | 'trying' | 'success' | 'failed'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    // If we have both email and otp, attempt auto-login
    if (email && password) {
      (async () => {
        setStatus('trying');
        setError('');
        try {
          await login({ email, password });
          setStatus('success');
          // Redirect to profile where user can change password and track orders
          router.push('/profile');
        } catch (err: any) {
          console.error('Auto-login failed:', err);
          setStatus('failed');
          setError(err?.message || 'Auto-login failed. Please sign in manually.');
        }
      })();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('trying');
    setError('');
    try {
      await login({ email, password });
      setStatus('success');
      router.push('/profile');
    } catch (err: any) {
      setStatus('failed');
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Icons.UserIcon />
          <h1>Verify & Sign In</h1>
          <p>We attempted to sign you in using the link you followed.</p>
        </div>

        {status === 'trying' && (
          <div className="info-message">
            <Icons.LoadingIcon />
            Attempting to sign you in...
          </div>
        )}

        {status === 'success' && (
          <div className="success-message">
            <Icons.CheckIcon />
            Signed in successfully — redirecting to your profile...
          </div>
        )}

        {status === 'failed' && (
          <div className="error-message">
            <Icons.AlertIcon />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Temporary OTP / Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={status === 'trying'}>
            {status === 'trying' ? (
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
            After signing in, please go to <Link href="/profile">your profile</Link> to change your password and track orders.
          </p>
        </div>
      </div>
    </div>
  );
}
