import { Phone, Mail, MapPin } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    info: "+91 98765 43210",
    color: "text-[#1A4D8C]",
    bgColor: "bg-[#1A4D8C]/10",
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
    info: "Kolkata, West Bengal\nOffice: 12/4 Park Street, Kolkata",
    color: "text-[#1A4D8C]",
    bgColor: "bg-[#1A4D8C]/10",
  },
]

export function ContactCards() {
  return (
    <section className="bg-white px-4 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="flex flex-col items-center rounded-xl bg-white bg-opacity-60 backdrop-blur-lg p-6 text-center shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${method.bgColor}`}
              >
                <method.icon className={`h-6 w-6 ${method.color}`} />
              </div>
              <h3 className={`mb-1 font-semibold ${method.color}`}>{method.title}</h3>
              <p className="text-sm whitespace-pre-line text-gray-600">{method.info}</p>
              {method.title === "Visit Us" && (
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-sm text-[#07538D] hover:underline"
                >
                  View on map
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
