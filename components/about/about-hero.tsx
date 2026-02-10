export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-10 text-black lg:px-8 lg:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-4xl font-extrabold lg:text-5xl tracking-tight">
          <span className="text-[#07538D]">About</span> <span className="text-[#FF6E39]">Biswas Enterprise</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Your trusted partner in event management and staffing solutions since 2009
        </p>
      </div>

      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute left-10 top-20 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-48 w-48 animate-pulse rounded-full bg-[#FF6E39]/10 blur-3xl" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  )
}
