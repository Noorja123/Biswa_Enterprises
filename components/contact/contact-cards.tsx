import { Phone, Mail, MapPin } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    info: "+91 98765 43210",
    color: "text-[#6197C0]",
    bgColor: "bg-[#6197C0]/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    info: "info@biswas-enterprise.com",
    color: "text-[#FF6E39]",
    bgColor: "bg-[#FF6E39]/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    info: "Kolkata, West Bengal",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
]

export function ContactCards() {
  return (
    <section className="bg-gray-50 px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-6 md:grid-cols-3">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${method.bgColor}`}
              >
                <method.icon className={`h-6 w-6 ${method.color}`} />
              </div>
              <h3 className={`mb-1 font-semibold ${method.color}`}>
                {method.title}
              </h3>
              <p className="text-sm text-gray-600">{method.info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
