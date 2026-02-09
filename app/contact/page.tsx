import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactCards } from "@/components/contact/contact-cards"

export const metadata = {
  title: "Contact Us - Biswas Enterprise",
  description:
    "Get in touch with Biswas Enterprise for your event staffing needs. Request a quote today!",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ContactHero />
        <ContactForm />
        <ContactCards />
      </main>
      <Footer />
    </div>
  )
}
