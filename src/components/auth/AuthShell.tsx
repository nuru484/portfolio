// src/components/auth/AuthShell.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AuthShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 font-urbanist">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-border text-center">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight text-foreground"
            >
              Portfolio
            </Link>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="px-8 py-6">{children}</div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}
