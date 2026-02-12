"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-10 lg:pt-0">
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
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative Background */}
            <div
              className="absolute -right-10 -top-10 h-[35rem] w-[35rem] rounded-full bg-blue-200 opacity-30 blur-3xl lg:-right-20 lg:-top-20 lg:h-[40rem] lg:w-[40rem]"
              style={{
                background: 'radial-gradient(circle, #a7d9f8 0%, transparent 70%)',
              }}
            ></div>
            <div
              className="absolute -bottom-10 -left-10 h-[30rem] w-[30rem] rounded-full bg-blue-300 opacity-30 blur-3xl lg:-bottom-20 lg:-left-20 lg:h-[35rem] lg:w-[35rem]"
              style={{
                background: 'radial-gradient(circle, #a7d9f8 0%, transparent 70%)',
              }}
            ></div>

            <div
              className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] shadow-2xl lg:max-w-4xl"
            >
              <Image
                src="/biswas_img/Bimg-3.jpeg"
                alt="Event team"
                width={900}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
