import Link from "next/link"
import { ArrowRight, Trophy, PartyPopper, Clock } from "lucide-react"

const services = [
  {
    title: "Corporate Events",
    description: "Corporate Events",
    icon: Trophy,
    iconColor: "text-[#1A4D8C]",
  },
  {
    title: "Social Functions",
    description: "Social Functions",
    icon: PartyPopper,
    iconColor: "text-[#FF6E39]",
  },
  {
    title: "Flexible Staffing",
    description: "Flexible Staffing",
    icon: Clock,
    iconColor: "text-[#1A4D8C]",
  },
]

export function ServicesSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="animate-on-load animate-zoom-in mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#07538D] lg:text-4xl">Our Services</h2>
          <p className="text-gray-600">Comprehensive event staffing solutions tailored to your needs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="animate-on-load animate-zoom-in-up group overflow-hidden rounded-xl border border-gray-200 bg-white bg-opacity-60 backdrop-blur-lg shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-orange-400"
              style={{ animationDelay: `${0.2 + index * 0.12}s` }}
            >
              <div className="p-6">
                <div className="mb-4 flex justify-center">
                  <service.icon className={`h-12 w-12 ${service.iconColor || 'text-orange-500'}`} />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-gray-800">
                  {service.title}
                </h3>
                <p className="mb-4 text-center text-sm text-gray-600">{service.description}</p>
                <div className="mt-4 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline"
                  >
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
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
