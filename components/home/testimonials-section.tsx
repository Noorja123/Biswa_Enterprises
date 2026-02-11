import Image from "next/image"

const testimonials = [
  {
    name: "Rita Sharma",
    role: "Event Manager, ACME Corp",
    quote: "Their team made our annual summit effortless — professional and punctual.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Sanjay Patel",
    role: "Wedding Planner",
    quote: "Reliable staff and excellent coordination — highly recommended.",
    avatar: "/placeholder-user.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-[#07538D]">What Clients Say</h2>
          <p className="text-gray-600">Real feedback from events we've supported</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border border-gray-200 bg-white bg-opacity-60 backdrop-blur-lg p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
              <p className="mt-4 text-gray-700">“{t.quote}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
