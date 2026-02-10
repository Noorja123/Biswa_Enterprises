"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-white to-gray-50 px-4 py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-[#07538D] lg:text-5xl">
              Effortless Events,
              <span className="block text-[#FF6E39]">Flawlessly Executed</span>
            </h1>

            <p className="mb-6 max-w-xl text-lg text-gray-700">
              We provide professional event management and flexible staffing
              solutions for corporate and social events — from planning to
              on-site execution.
            </p>

            <div className="mb-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-lg bg-[#FF6E39] px-6 py-3 text-base font-semibold text-white shadow-md hover:bg-[#e55a2b]"
              >
                <Link href="/contact">Get Started <ArrowRight className="ml-2 inline-block h-5 w-5" /></Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="rounded-lg border-gray-200 px-6 py-3 text-base font-semibold">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="shrink-0 text-sm text-gray-500">Trusted by</div>
              <div className="flex items-center gap-4">
                <Image src="/biswas-logo.svg" alt="logo" width={80} height={28} className="opacity-80" />
                <Image src="/placeholder-logo.png" alt="partner" width={80} height={28} className="opacity-60" />
              </div>
            </div>
          </div>

          <div className="order-1 -mx-4 mb-6 lg:order-2 lg:mx-0">
            <div className="relative mx-auto max-w-lg overflow-hidden rounded-2xl shadow-lg sm:max-w-xl">
              <Image
                src="/biswas_img/Bimg-3.jpeg"
                alt="Event setup"
                width={900}
                height={600}
                className="h-auto w-full object-cover"
              />
              <div className="absolute left-4 bottom-4 rounded-lg bg-white/80 p-3 backdrop-blur-md">
                <div className="text-sm font-medium text-gray-800">Professional staff • On-time • Fully insured</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
