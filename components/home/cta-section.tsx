import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-[#FF6E39] px-4 py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="animate-on-load animate-zoom-in mb-4 text-3xl font-bold lg:text-4xl">
          Ready to Plan Your Next Event?
        </h2>
        <p className="animate-on-load animate-scale-in animation-delay-200 mb-8 text-lg text-white/90">
          Contact us today and let our expert team make your event a success
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-xl border-2 border-white bg-white px-8 text-[#FF6E39] hover:bg-white/90"
        >
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </section>
  )
}
