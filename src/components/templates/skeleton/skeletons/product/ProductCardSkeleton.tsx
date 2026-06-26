export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-snow/20 bg-onyx/50 p-8">
      <div className="mx-auto h-14 w-14 rounded-full bg-snow/10" />

      <div className="mt-8 h-4 w-40 mx-auto rounded bg-snow/10" />

      <div className="mt-4 h-8 w-56 mx-auto rounded bg-snow/10" />

      <div className="mt-6 h-4 w-full rounded bg-snow/10" />
      <div className="mt-2 h-4 w-4/5 mx-auto rounded bg-snow/10" />

      <div className="mt-10 h-12 w-32 mx-auto rounded bg-snow/10" />

      <div className="mt-8 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-snow/10" />
        ))}
      </div>

      <div className="mt-10 h-12 rounded-xl bg-snow/10" />
    </div>
  );
}
