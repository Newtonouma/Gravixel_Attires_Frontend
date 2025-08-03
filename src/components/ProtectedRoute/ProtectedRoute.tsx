'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Icons } from '@/components/Icons';
import './ProtectedRoute.css';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requireAdmin = false,
  redirectTo = '/auth/login' 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && user?.role !== 'admin') {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requireAdmin, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner">
          <Icons.LoadingIcon size={40} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="protected-route-loading">
        <div className="loading-spinner">
          <Icons.LoadingIcon size={40} />
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  if (requireAdmin && user?.role !== 'admin') {
    return (
      <div className="protected-route-error">
        <div className="error-content">
          <Icons.AlertIcon size={60} />
          <h1>Access Denied</h1>
          <p>You don&apos;t have permission to access this page.</p>
          <button onClick={() => router.push('/')} className="error-button">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
