import Link from 'next/link';
import './not-found.css';

export default function NotFound() {
  console.log('NotFound component rendered - this means notFound() was called');
  
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">Product Not Found</h2>
      <p className="not-found-message">
        The product you&apos;re looking for doesn&apos;t exist or may have been removed.
      </p>
      <Link href="/products" className="not-found-link">
        Browse All Products
      </Link>
    </div>
  );
}
