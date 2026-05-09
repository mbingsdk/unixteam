export default function Loading() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
        {/* Title skeleton */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-2/3 bg-card rounded-lg" />
          <div className="h-5 w-1/2 bg-card rounded-lg" />
        </div>

        {/* Content skeletons */}
        <div className="space-y-4 mt-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="glass-effect rounded-lg p-6 space-y-3">
              <div
                className="h-5 bg-card rounded"
                style={{ width: `${70 + Math.random() * 25}%` }}
              />
              <div className="h-4 bg-card/60 rounded w-full" />
              <div className="h-4 bg-card/60 rounded w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}