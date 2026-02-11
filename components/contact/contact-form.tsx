"use client"

import React from "react"
import { useState } from "react"
import { Send, MapPin } from "lucide-react" // Added MapPin icon
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const message = formData.get("message") as string
    const location = formData.get("location") as string // 1. Capture Location

    if (!email || !phone || !message || !location) {
      alert("Please complete all required fields.")
      setIsSubmitting(false)
      return
    }

    try {
      const timestamp = Date.now()
      const payload = {
        id: timestamp,
        name: formData.get("name") as string,
        email,
        phone,
        location, // 2. Add to Storage Payload
        eventName: formData.get("eventName") as string,
        labours: formData.get("labours") as string,
        date: formData.get("date") as string,
        message,
        createdAt: new Date(timestamp).toISOString(),
      }

      const raw = localStorage.getItem("contact-messages")
      const list = raw ? JSON.parse(raw) : []
      list.unshift(payload)
      localStorage.setItem("contact-messages", JSON.stringify(list))
    } catch (err) {
      console.error("[contact-form] failed to persist message", err)
    }

    await new Promise((resolve) => setTimeout(resolve, 600))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="bg-white px-4 py-4 lg:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-green-50 p-4 text-center">
          <h2 className="mb-1 text-xl font-extrabold text-green-800">
            Request Submitted!
          </h2>
          <p className="text-sm text-green-700">
            {"Thank you for your request. We'll get back to you within 24 hours."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white px-4 py-4 lg:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg lg:p-6">
          <div className="mb-4 text-center">
            <h2 className="mb-1 text-xl font-extrabold text-[#07538D]">
              Request Event Staffing
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid gap-6 md:grid-cols-2">
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
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
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
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
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
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Event Location - NEW FIELD */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
                  Event Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Venue, or Area"
                  required
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
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
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
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
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>

              {/* Date of Event */}
              <div className="space-y-2 md:col-span-2"> 
                {/* Changed to col-span-2 to keep layout balanced */}
                <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                  Date of Event <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="border-gray-300 h-12 text-base rounded-lg px-3 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                Message <span className="text-red-500">*</span>
              </Label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us more about your event, shift timings, venue, or any special requirements"
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-base placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-[#FFEDD6] focus:border-[#FF6E39]"
              />
            </div>

            <div className="flex justify-center pt-3">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="rounded-full bg-linear-to-br from-[#FF8A55] to-[#FF6E39] px-10 py-3 text-base text-white shadow hover:brightness-95 transition-transform transform hover:-translate-y-0.5"
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