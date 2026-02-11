import { Users, Calendar, Award, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Skilled Workers",
    iconColor: "text-orange-500",
    valueColor: "text-gray-800",
  },
  {
    icon: Calendar,
    value: "1000+",
    label: "Events Completed",
    iconColor: "text-orange-500",
    valueColor: "text-gray-800",
  },
  {
    icon: Award,
    value: "15+",
    label: "Years Experience",
    iconColor: "text-orange-500",
    valueColor: "text-gray-800",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Client Satisfaction",
    iconColor: "text-orange-500",
    valueColor: "text-gray-800",
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
              className={`animate-on-load animate-scale-in flex flex-col items-center rounded-xl border border-gray-200 bg-white bg-opacity-60 backdrop-blur-lg p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-xl animation-delay-${(index + 1) * 100}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <stat.icon className={`mb-3 h-10 w-10 ${stat.iconColor}`} />
              <span className={`text-4xl font-bold ${stat.valueColor}`}>
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
