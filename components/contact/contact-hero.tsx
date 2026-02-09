export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-black lg:px-8 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-extrabold italic lg:text-6xl tracking-tight"><span className="text-[#07538D]">Contact</span> <span className="text-[#FF6E39]">Us</span></h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          {"Let's discuss your event requirements and create something amazing together"}
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
