"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-black lg:px-8 lg:py-36">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight lg:text-5xl">
          <span className="animate-on-load animate-zoom-in-up inline-block italic text-[#07538D]">
            Effortless Events
          </span>
          <br />
          <span
            className="animate-on-load animate-zoom-in-up animation-delay-200 inline-block text-[#FF6E39]"
          >
            Starts With Us
          </span>
        </h1>
        <p
          className="animate-on-load animate-scale-in animation-delay-400 mx-auto mb-10 max-w-2xl text-xl text-gray-700 lg:text-2xl"
        >
          Professional event management and labour solutions for all your
          corporate and social events
        </p>
        <div
          className="animate-on-load animate-zoom-in animation-delay-600 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="rounded-lg bg-[#FF6E39] px-10 py-8 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#e55a2b] hover:shadow-xl hover:opacity-90 hover:scale-105"
          >
            <Link href="/contact">
              Get Started <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-lg border-2 border-gray-300 bg-white px-10 py-8 text-lg font-semibold text-gray-800 shadow-lg transition-all hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 hover:opacity-90 hover:scale-105"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
        <div className="absolute left-10 top-20 h-64 w-64 animate-pulse rounded-full bg-white/5 blur-3xl" />
        <div
          className="absolute bottom-20 right-10 h-48 w-48 animate-pulse rounded-full bg-[#FF6E39]/10 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </section>
  )
}
