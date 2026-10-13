import { SkeletonBlock } from '@/components/ui';

export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <SkeletonBlock className="mb-2 h-7 w-56" />
      <SkeletonBlock className="mb-6 h-4 w-96 max-w-full" />
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-24" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <SkeletonBlock className="h-80 lg:col-span-2" />
        <SkeletonBlock className="h-80" />
      </div>
    </div>
  );
}
