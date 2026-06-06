function ArticleDetailsSkeleton() {
  return (
    <article className="animate-pulse">
      {/* Hero */}
      <section className="relative h-[75vh] bg-onyx">
        <div className="absolute inset-0 bg-carbon-black" />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-[5%] pb-16">
            <div className="max-w-4xl">
              <div className="flex gap-3 mb-6">
                <div className="h-8 w-28 rounded-full bg-snow/10" />
                <div className="h-8 w-32 rounded-full bg-snow/10" />
                <div className="h-8 w-24 rounded-full bg-snow/10" />
              </div>

              <div className="h-16 w-full max-w-3xl rounded bg-snow/10 mb-4" />
              <div className="h-16 w-2/3 rounded bg-snow/10 mb-8" />

              <div className="space-y-3">
                <div className="h-5 w-full rounded bg-snow/10" />
                <div className="h-5 w-5/6 rounded bg-snow/10" />
                <div className="h-5 w-3/4 rounded bg-snow/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container mx-auto px-[5%] mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-snow/10 p-10">
            <div className="space-y-4">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 rounded bg-snow/10"
                  style={{
                    width: `${100 - (i % 4) * 10}%`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-snow/10 p-5">
            <div className="h-4 w-20 bg-snow/10 rounded mb-4" />

            <div className="flex flex-wrap gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-10 w-24 rounded-xl bg-snow/10" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

export default ArticleDetailsSkeleton;
