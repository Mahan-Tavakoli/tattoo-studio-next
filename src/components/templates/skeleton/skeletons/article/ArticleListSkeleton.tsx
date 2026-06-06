function ArticleListSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl aspect-3/4 border border-snow/20 bg-onyx animate-pulse">
      {/* Image */}
      <div className="absolute inset-0 bg-carbon-black" />

      {/* Date Badge */}
      <div className="absolute top-4 right-4">
        <div className="h-7 w-20 rounded-lg bg-snow/10" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        {/* Title */}
        <div className="h-7 bg-snow/10 rounded w-4/5 mb-3" />
        <div className="h-7 bg-snow/10 rounded w-3/5 mb-6" />

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-snow/10 rounded w-full" />
          <div className="h-4 bg-snow/10 rounded w-11/12" />
          <div className="h-4 bg-snow/10 rounded w-4/5" />
        </div>

        {/* Read Article */}
        <div className="mt-5 h-4 w-24 bg-snow/10 rounded" />
      </div>
    </div>
  );
}

export default ArticleListSkeleton;
