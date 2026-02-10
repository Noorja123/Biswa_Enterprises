"use client"

import React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="bg-white px-8 py-28 lg:px-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-green-50 p-10 text-center">
          <h2 className="mb-2 text-3xl font-extrabold text-green-800">
            Request Submitted!
          </h2>
          <p className="text-base text-green-700">
            {"Thank you for your request. We'll get back to you within 24 hours."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white px-8 py-12 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-2xl lg:p-16">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-5xl font-extrabold text-[#07538D]">
              Request Event Staffing
            </h2>
            <p className="text-base text-gray-500">
              {"Fill out the form below and we'll get back to you within 24 hours"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Your Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Name of Event */}
              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-sm font-semibold text-gray-700">
                  Name of Event <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eventName"
                  name="eventName"
                  placeholder="Enter event name"
                  required
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                  Contact Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Required Labours */}
              <div className="space-y-2">
                <Label htmlFor="labours" className="text-sm font-semibold text-gray-700">
                  Required Labours <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="labours"
                  name="labours"
                  type="number"
                  placeholder="Number of workers needed"
                  required
                  min="1"
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Date of Event */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  Date of Event <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="border-gray-300 h-14 text-lg rounded-lg px-4 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="rounded-full bg-gradient-to-br from-[#FF8A55] to-[#FF6E39] px-14 py-4 text-lg text-white shadow-xl hover:brightness-95 transition-transform transform hover:-translate-y-0.5"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Request <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
