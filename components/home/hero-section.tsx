"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              <span className="text-[#1A4D8C]">Effortless work</span><br />
              <span className="text-[#F27123]">start with us</span>
            </h1>

            <p className="mb-8 text-lg text-gray-700">
              Your trusted partner in event management and staffing solutions since 2009. We combine local expertise with a large pool of trained staff to deliver flawless events.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="w-fit rounded-full bg-[#FF6E39] px-8 py-3 text-base font-semibold text-white shadow-md hover:bg-[#e55a2b] transition-colors"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-2xl">
              <Image
                src="/biswas_img/Bimg-3.jpeg"
                alt="Event team"
                width={700}
                height={700}
                className="w-full h-auto object-cover shadow-lg border-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
