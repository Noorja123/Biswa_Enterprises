import { Users, Calendar, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Skilled Workers",
    iconColor: "text-[#FF6E39]",
    valueColor: "text-[#FF6E39]",
  },
  {
    icon: Calendar,
    value: "1000+",
    label: "Events Completed",
    iconColor: "text-[#07538D]",
    valueColor: "text-[#07538D]",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
    iconColor: "text-[#FF6E39]",
    valueColor: "text-[#FF6E39]",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Client Satisfaction",
    iconColor: "text-[#07538D]",
    valueColor: "text-[#07538D]",
  },
]

export function StatsSection() {
  return (
    <section className="bg-white px-4 py-8 lg:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`animate-on-load animate-scale-in flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:scale-105 hover:shadow-md animation-delay-${(index + 1) * 100}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <stat.icon className={`mb-3 h-8 w-8 ${stat.iconColor}`} />
              <span className={`text-2xl font-bold lg:text-3xl ${stat.valueColor}`}>
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-gray-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
