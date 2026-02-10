import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { CompanyInfo } from "@/components/about/company-info"
import { MissionVision } from "@/components/about/mission-vision"
import { Journey } from "@/components/about/journey"
import { Gallery } from "@/components/about/gallery"

export const metadata = {
  title: "About Us - Biswas Enterprise",
  description:
    "Learn about Biswas Enterprise - Your trusted partner in event management and staffing solutions since 2009",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col page-full-bleed">
      <Header />
      <main className="flex-1">
        <AboutHero />
        <CompanyInfo />
        <MissionVision />
        <Journey />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
