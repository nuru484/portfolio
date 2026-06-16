import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 font-urbanist">
      <div className="text-center p-6 mx-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oh noo! Page not found
        </h1>
        <p className="text-gray-700 mb-4">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md border hover:bg-white hover:border hover:border-black hover:text-black transition-colors duration-500 ease-in-out"
        >
          <ChevronLeft size={20} className="mr-2" />
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
