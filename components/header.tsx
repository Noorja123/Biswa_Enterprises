"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-[#07538D] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 md:h-20 md:w-20">
            <Image
              src="/images/biswas-logo.jpeg"
              alt="Biswas Enterprises logo"
              fill
              sizes="(max-width: 768px) 56px, 80px"
              className="object-contain"
            />
          </div>
          <span className="hidden md:inline text-lg font-bold text-white">BISWAS ENTERPRISE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "rounded-md px-5 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-[#3d7db5] text-white"
                  : "text-gray-200 hover:bg-[#3d7db5]/50 hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button
            asChild
            className="ml-6 rounded-md bg-[#FF6E39] px-5 text-white hover:bg-[#d35400]"
          >
            <Link href="/contact">Employee Portal</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="border-t border-white/10 bg-[#07538D] px-4 py-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-[#6197C0] text-white"
                    : "text-gray-200 hover:bg-[#6197C0]/50 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 rounded-md bg-[#FF6E39] text-white hover:bg-[#d35400]"
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Employee Portal
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
