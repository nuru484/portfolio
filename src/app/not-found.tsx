import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted font-urbanist">
      <div className="text-center p-6 mx-4 bg-card shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-destructive mb-4">
          Oh noo! Page not found
        </h1>
        <p className="text-muted-foreground mb-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-foreground text-background border border-foreground rounded-md hover:bg-background hover:text-foreground transition-colors duration-500 ease-in-out"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
