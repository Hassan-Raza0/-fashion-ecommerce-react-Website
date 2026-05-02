export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-neutral-200 dark:bg-neutral-800 rounded-2xl aspect-[3/4]" />
      <div className="mt-3 space-y-2 px-1">
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-16" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
      </div>
    </div>
  );
}
