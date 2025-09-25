// Utility function to clear expired tokens
export function clearExpiredTokens() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    console.log('Expired authentication tokens have been cleared');
    
    // Reload the page to reset auth state
    window.location.reload();
  }
}

// Check if token is expired (basic check)
export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true; // If we can't parse it, consider it expired
  }
}

// Auto-clear expired tokens on page load
export function checkAndClearExpiredTokens() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token && isTokenExpired(token)) {
      console.log('Detected expired token, clearing...');
      clearExpiredTokens();
    }
  }
}