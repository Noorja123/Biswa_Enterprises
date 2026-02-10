"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Mail } from "lucide-react"
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
  const [messages, setMessages] = useState<any[]>([])
  const [msgsOpen, setMsgsOpen] = useState(false)
  const msgsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // only load messages for admin header
    if (!pathname?.startsWith("/admin")) return
    try {
      const raw = localStorage.getItem("contact-messages")
      const list = raw ? JSON.parse(raw) : []
      setMessages(list)
    } catch (err) {
      console.error("[header] failed to read contact-messages", err)
    }
  }, [pathname])

  // update when other tabs/pages write to localStorage
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key !== "contact-messages") return
      try {
        const raw = localStorage.getItem("contact-messages")
        const list = raw ? JSON.parse(raw) : []
        setMessages(list)
      } catch (err) {
        console.error("[header] failed to parse storage event", err)
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!msgsRef.current) return
      if (!(e.target instanceof Node)) return
      if (!msgsRef.current.contains(e.target as Node)) {
        setMsgsOpen(false)
      }
    }
    document.addEventListener("click", onDocClick)
    return () => document.removeEventListener("click", onDocClick)
  }, [])

  function clearMessages() {
    try {
      localStorage.removeItem("contact-messages")
      setMessages([])
      setMsgsOpen(false)
    } catch (err) {
      console.error("[header] failed to clear messages", err)
    }
  }

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
          {/* Admin-only messages box */}
          {pathname?.startsWith("/admin") && (
            <div className="relative" ref={msgsRef}>
              <button
                type="button"
                onClick={() => setMsgsOpen((s) => !s)}
                className="relative inline-flex items-center rounded-md bg-white/5 p-2 text-white hover:bg-white/10"
                aria-label="Messages"
              >
                <Mail className="h-5 w-5" />
                {messages.length > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                    {messages.length}
                  </span>
                )}
              </button>

              {msgsOpen && (
                <div className="absolute right-0 mt-2 w-80 max-w-xs rounded-lg bg-white p-3 shadow-lg text-left text-sm text-gray-800 z-50">
                  <div className="flex items-center justify-between px-1">
                    <strong>Messages</strong>
                    <button className="text-xs text-gray-500 hover:underline" onClick={clearMessages}>Clear</button>
                  </div>
                  <div className="mt-2 max-h-64 overflow-y-auto">
                    {messages.length === 0 && <div className="py-6 text-center text-gray-500">No messages</div>}
                    {messages.map((m: any) => (
                      <div key={m.id} className="mb-3 rounded-md border p-2">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{m.name || m.email}</div>
                          <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleString()}</div>
                        </div>
                        <div className="mt-1 text-xs text-gray-700 line-clamp-3 whitespace-pre-wrap">{m.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
          </div>
        </nav>
      )}
    </header>
  )
}
