export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-2 text-black lg:px-8 lg:py-3">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-0 text-3xl font-extrabold lg:text-4xl tracking-tight"><span className="text-[#07538D]">Contact</span> <span className="text-[#FF6E39]">Us</span></h1>
      </div>

      {/* Decorative elements kept but reduced size to avoid large visual gaps */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute left-8 top-12 h-28 w-28 opacity-40 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-8 right-8 h-20 w-20 opacity-30 rounded-full bg-[#FF6E39]/10 blur-3xl" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  )
}
