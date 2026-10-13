import Link from 'next/link';
import { EmptyState } from '@/components/ui';

export default function NotFound() {
  return <EmptyState title="Not found" body="That page or team does not exist." action={<Link href="/" className="btn-primary">Back to overview</Link>} />;
}
