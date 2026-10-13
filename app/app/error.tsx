'use client';
import { EmptyState } from '@/components/ui';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <EmptyState
      title="Something went wrong loading this page"
      body={error.message}
      action={
        <button className="btn-primary" onClick={reset}>
          Try again
        </button>
      }
    />
  );
}
