import Image from "next/image"
import Link from "next/link"

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-10 text-black lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-extrabold lg:text-5xl tracking-tight">
              <span className="text-[#07538D]">About</span> <span className="text-[#FF6E39]">Us</span>
            </h1>
            <p className="mb-6 max-w-xl text-lg text-gray-700">
              Your trusted partner in event management and staffing solutions since 2009. We combine local expertise with a large pool of trained staff to deliver flawless events.
            </p>

            <div className="flex gap-3">
              <Link href="/contact" className="inline-block rounded-md bg-[#FF6E39] px-4 py-2 font-semibold text-white hover:bg-[#e55a2b]">Get A Quote</Link>
              <Link href="/" className="inline-block rounded-md border border-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50">Back Home</Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image src="/biswas_img/Bimg-4.jpeg" alt="team" width={900} height={560} className="w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
