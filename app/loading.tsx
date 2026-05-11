export default function Loading() {
  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8 animate-pulse">
        {/* Title skeleton */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-2/3 bg-white/[0.04] rounded-2xl" />
          <div className="h-5 w-1/2 bg-white/[0.03] rounded-xl" />
        </div>

        {/* Content skeletons */}
        <div className="space-y-5 mt-12">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i} 
              className="rounded-3xl p-6 space-y-4"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div
                className="h-5 bg-white/[0.06] rounded-lg"
                style={{ width: `${70 + Math.random() * 25}%` }}
              />
              <div className="h-4 bg-white/[0.04] rounded-lg w-full" />
              <div className="h-4 bg-white/[0.04] rounded-lg w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
