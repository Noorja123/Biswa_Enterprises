import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Corporate Events",
    description:
      "Professional staff for conferences, seminars, and business meetings",
  },
  {
    title: "Social Functions",
    description: "Reliable support for weddings, parties, and celebrations",
  },
  {
    title: "Flexible Staffing",
    description:
      "Hourly and permanent staff options to match your requirements",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-gray-50 px-4 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="animate-on-load animate-zoom-in mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#07538D] lg:text-4xl">Our Services</h2>
          <p className="text-gray-600">Comprehensive event staffing solutions tailored to your needs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-on-load animate-zoom-in-up group overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{ animationDelay: `${0.2 + index * 0.12}s` }}
            >
              <div className="p-6">
                <h3 className="mb-2 flex items-center gap-3 text-xl font-semibold text-[#07538D]">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#FF6E39]" />
                  {service.title}
                </h3>
                <p className="mb-4 text-sm text-gray-600">{service.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-[#FF6E39] hover:underline"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <span className="text-xs text-gray-400">Custom quotes available</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="inline-block rounded-lg bg-[#07538D] px-6 py-3 text-white shadow-md hover:bg-[#0b5f8b]">
            Request A Quote
          </Link>
        </div>
      </div>
    </section>
  )
}
