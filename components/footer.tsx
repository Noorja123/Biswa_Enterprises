import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#07538D] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Phone Numbers */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF6E39]">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Phone Number</h3>
              <p className="text-base text-gray-200">+91 91675 83361</p>
              <p className="text-base text-gray-200">+91 79775 45108</p>
            </div>
          </div>

          {/* Email Addresses */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF6E39]">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Email Address</h3>
              <p className="text-base text-gray-200">info@biswaasenterprises.com</p>
            </div>
          </div>

          {/* Office Address */}
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF6E39]">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Office Address</h3>
              <p className="text-base text-gray-200">Room No 4, Near Shiv Mandir, Kherwadi Road, Khar East</p>
              <p className="text-base text-gray-200">Mumbai-400051, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6 text-center">
        <p className="text-base text-gray-200">
          © 2026 Biswas Enterprise. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
