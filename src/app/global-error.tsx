'use client';

// Last-resort boundary: replaces the ROOT layout when even it fails to
// render, so it must provide its own <html>/<body> and cannot rely on the
// app's providers, fonts, or Tailwind classes.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1f1f1f',
          color: '#f4f4f4',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <div>
          <p style={{ fontSize: '5rem', fontWeight: 500, margin: 0 }}>500</p>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 500, marginTop: '1rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#a8a8a8', maxWidth: '28rem', lineHeight: 1.6 }}>
            An unexpected error occurred
            {error.digest ? ` (ref: ${error.digest})` : ''}. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '1.5rem',
              padding: '0.6rem 1.4rem',
              borderRadius: '0.625rem',
              border: 'none',
              background: '#8a8cf8',
              color: '#17171c',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
