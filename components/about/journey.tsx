import { Users, TrendingUp, Target, Eye } from "lucide-react"

const milestones = [
  {
    year: "2009",
    title: "The Beginning",
    description:
      "Started with a small team of 20 dedicated professionals serving local events in Kolkata",
    icon: Users,
  },
  {
    year: "2013",
    title: "Expansion Phase",
    description:
      "Expanded operations across West Bengal with a workforce of 150+ skilled workers",
    icon: TrendingUp,
  },
  {
    year: "2017",
    title: "Regional Recognition",
    description:
      "Became the preferred choice for major corporate events in Eastern India",
    icon: Target,
  },
  {
    year: "2024",
    title: "Industry Leader",
    description:
      "Now serving 500+ skilled workers and managing 1000+ events annually",
    icon: Eye,
  },
]

export function Journey() {
  return (
    <section className="bg-white px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="animate-on-load animate-zoom-in mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#07538D] lg:text-4xl">
            Our Journey
          </h2>
          <p className="text-gray-600">A legacy of excellence and growth</p>
        </div>

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="animate-on-load animate-scale-in flex items-center gap-6 group cursor-pointer"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Year */}
              <div className="w-40 shrink-0 text-right">
                <span className="text-3xl md:text-4xl font-bold text-[#FF6E39] transition-colors duration-200 group-hover:text-[#FF8A55]">
                  {milestone.year}
                </span>
              </div>

              {/* Card + Icon (icon inside card and overlapping left border) */}
              <div className="flex-1">
                <div className="ml-10 relative rounded-xl bg-white p-6 pl-20 shadow-lg transition-transform duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#07538D] shadow-md transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#0b5f8b]">
                    <milestone.icon className="h-6 w-6 text-white" />
                  </div>

                  <h3 className="mb-1 text-xl font-semibold text-[#07538D] group-hover:text-[#07538D]">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
