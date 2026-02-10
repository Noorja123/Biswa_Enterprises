"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Calendar, DollarSign, MapPin, Users, Phone, Edit, Trash2, X, LogOut, Search, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Event = {
  id: number
  title: string
  status: string
  date: string
  location: string
  employees: number
  phone: string
  askedPayment: number
  paidAmount: number
  remainingMoney: number
}

const initialEvents: Event[] = []

const summaryStats = [
  { label: "Total Events", value: "3", icon: Calendar, color: "border-l-blue-600" },
  { label: "Total Revenue", value: "₹430,000", icon: DollarSign, color: "border-l-green-500" },
  { label: "Amount Received", value: "₹230,000", icon: DollarSign, color: "border-l-teal-500" },
  { label: "Pending Payment", value: "₹200,000", icon: DollarSign, color: "border-l-orange-500" },
]



function getStatusStyles(status: string) {
  switch (status) {
    case "Upcoming":
      return "bg-red-50 text-red-700 border border-red-300 text-xs font-bold px-3 py-1"
    case "Ongoing":
      return "bg-yellow-50 text-yellow-700 border border-yellow-300 text-xs font-bold px-3 py-1"
    case "Completed":
      return "bg-green-50 text-green-700 border border-green-300 text-xs font-bold px-3 py-1"
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200 text-lg font-bold px-4 py-2"
  }
}

function formatCurrency(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: typeof Calendar; color: string }) {
  const showIcon = label === "Total Events"
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 ${color} flex items-center justify-between`}>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className={`text-xl font-bold ${label === "Total Events" ? "text-gray-800" : label === "Total Revenue" ? "text-green-600" : label === "Amount Received" ? "text-teal-600" : "text-orange-500"}`}>
          {value}
        </p>
      </div>
      {showIcon && (
        <div className="text-blue-600">
          <Icon className="w-8 h-8" />
        </div>
      )}
    </div>
  )
}

function AddEventModal({
  isOpen,
  onClose,
  onAdd,
}: {
  isOpen: boolean
  onClose: () => void
  onAdd: (newEvent: Omit<Event, "id" | "remainingMoney">) => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    status: "Upcoming",
    location: "",
    phone: "",
    employees: 0,
    askedPayment: 0,
    paidAmount: 0,
  })
  const [error, setError] = useState("")

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: "",
        date: "",
        status: "Upcoming",
        location: "",
        phone: "",
        employees: 0,
        askedPayment: 0,
        paidAmount: 0,
      })
      setError("")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (formData.title && formData.date && formData.location && formData.phone) {
      onAdd(formData)
      // Reset form
      setFormData({
        title: "",
        date: "",
        status: "Upcoming",
        location: "",
        phone: "",
        employees: 0,
        askedPayment: 0,
        paidAmount: 0,
      })
      setError("")
      onClose()
    } else {
      setError("Please fill all required fields (Event Name, Date, Venue, Contact).")
    }
  }

  // Convert date from YYYY-MM-DD to DD/MM/YYYY for storage
  const formatDateForStorage = (dateStr: string) => {
    if (!dateStr) return ""
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-5">
          <DialogTitle className="text-xl font-semibold text-white">Add New Event</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder=""
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="w-full px-4 py-3 h-auto border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder=""
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Contact and Employees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="\\d*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={15}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employees Provided <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.employees || ""}
                onChange={(e) => setFormData({ ...formData, employees: Number.parseInt(e.target.value) || 0 })}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Payment Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asked Payment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.askedPayment || ""}
                onChange={(e) => setFormData({ ...formData, askedPayment: Number.parseInt(e.target.value) || 0 })}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paid Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.paidAmount || ""}
                onChange={(e) => setFormData({ ...formData, paidAmount: Number.parseInt(e.target.value) || 0 })}
                placeholder=""
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Add Event
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EditEventModal({
  event,
  isOpen,
  onClose,
  onSave,
}: {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedEvent: Event) => void
}) {
  const [formData, setFormData] = useState<Event | null>(null)

  // Update form data when event changes or modal opens
  if (isOpen && event && (!formData || formData.id !== event.id)) {
    setFormData(event)
  }

  if (!isOpen || !formData) return null

  const handleSubmit = () => {
    if (formData) {
      onSave({
        ...formData,
        remainingMoney: formData.askedPayment - formData.paidAmount,
      })
      onClose()
    }
  }

  // Convert date from DD/MM/YYYY to YYYY-MM-DD for input
  const formatDateForInput = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/")
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
  }

  // Convert date from YYYY-MM-DD to DD/MM/YYYY for storage
  const formatDateForStorage = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-5">
          <DialogTitle className="text-xl font-semibold text-white">Edit Event</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-5">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formatDateForInput(formData.date)}
                onChange={(e) => setFormData({ ...formData, date: formatDateForStorage(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger className="w-full px-4 py-3 h-auto border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Contact and Employees */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="\\d*"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={15}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employees Provided <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: Number.parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Payment Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asked Payment (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.askedPayment}
                onChange={(e) => setFormData({ ...formData, askedPayment: Number.parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paid Amount (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.paidAmount}
                onChange={(e) => setFormData({ ...formData, paidAmount: Number.parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Pending Amount Display */}
          <div className="p-4 bg-orange-50 border-2 border-orange-300 rounded-xl">
            <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
            <p className="text-2xl font-bold text-orange-600">
              ₹{(formData.askedPayment - formData.paidAmount).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors"
            >
              Update Event
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function EventCard({
  event,
  onEdit,
  onRequestDelete,
  onChangeStatus,
}: { event: Event; onEdit: (event: Event) => void; onRequestDelete: (event: Event) => void; onChangeStatus: (id: number, status: string) => void }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-3xl font-semibold text-blue-800">{event.title}</h3>
        <div>
          <Select value={event.status} onValueChange={(value) => onChangeStatus(event.id, value)}>
            <SelectTrigger className={`rounded-full ${getStatusStyles(event.status)} h-auto px-3 py-1`}> 
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-base text-gray-600 mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span className="font-medium">{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-400" />
          <span className="font-medium">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-400" />
          <span className="font-medium">{event.employees} Employees</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-400" />
          <span className="font-medium">{event.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Asked Payment</p>
          <p className="text-lg font-bold text-blue-700">{formatCurrency(event.askedPayment)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Paid Amount</p>
          <p className="text-lg font-bold text-green-600">{formatCurrency(event.paidAmount)}</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Remaining Money</p>
          <p className="text-lg font-bold text-orange-500">{formatCurrency(event.remainingMoney)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onEdit(event)}
          className="flex items-center justify-center gap-2 bg-orange-100 hover:bg-orange-200 text-orange-600 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onRequestDelete(event)}
          className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-500 font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  )
}

export function EventDashboard() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [isMounted, setIsMounted] = useState(false)

  // Load events from localStorage on mount (client-side only)
  useEffect(() => {
    setIsMounted(true)
    const savedEvents = localStorage.getItem("dashboard-events")
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents)
        setEvents(parsed)
      } catch (error) {
        console.error("Failed to parse saved events:", error)
        // if parsing fails, reset to empty array
        setEvents([])
        localStorage.setItem("dashboard-events", JSON.stringify([]))
      }
    } else {
      // First time - start with empty events list
      setEvents([])
      localStorage.setItem("dashboard-events", JSON.stringify([]))
    }
  }, [])

  // Save events to localStorage whenever they change (only after mount)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("dashboard-events", JSON.stringify(events))
    }
  }, [events, isMounted])

  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const handleEditClick = (event: Event) => {
    setEditingEvent(event)
    setIsEditModalOpen(true)
  }

  const handleSaveEvent = (updatedEvent: Event) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)))
    setEditingEvent(null)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setEditingEvent(null)
  }

  const handleAddEvent = (newEventData: Omit<Event, "id" | "remainingMoney">) => {
    const newEvent: Event = {
      ...newEventData,
      id: Math.max(...events.map((e) => e.id), 0) + 1,
      date: newEventData.date.includes("-")
        ? (() => {
            const [year, month, day] = newEventData.date.split("-")
            return `${day}/${month}/${year}`
          })()
        : newEventData.date,
      remainingMoney: newEventData.askedPayment - newEventData.paidAmount,
    }
    setEvents([newEvent, ...events])
  }

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter((e) => e.id !== eventId))
    setDeleteConfirm(null)
  }

  const requestDeleteEvent = (event: Event) => {
    setDeleteConfirm(event)
  }

  const handleChangeEventStatus = (id: number, status: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, status } : e))
  }

  const handleExport = () => {
    const csv = [
      ["Event Name", "Status", "Date", "Location", "Employees", "Contact", "Asked Payment", "Paid Amount", "Remaining Money"],
      ...events.map((e) => [
        e.title,
        e.status,
        e.date,
        e.location,
        e.employees,
        e.phone,
        e.askedPayment,
        e.paidAmount,
        e.remainingMoney,
      ]),
    ]
    const csvString = csv.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvString], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "events.csv"
    a.click()
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('dashboard-events')
    router.push('/Admin')
  }

  // Calculate dynamic stats
  const totalRevenue = events.reduce((sum, e) => sum + e.askedPayment, 0)
  const amountReceived = events.reduce((sum, e) => sum + e.paidAmount, 0)
  const pendingPayment = totalRevenue - amountReceived

  const dynamicStats = [
    { label: "Total Events", value: String(events.length), icon: Calendar, color: "border-l-blue-600" },
    { label: "Total Revenue", value: formatCurrency(totalRevenue), icon: DollarSign, color: "border-l-green-500" },
    { label: "Amount Received", value: formatCurrency(amountReceived), icon: DollarSign, color: "border-l-teal-500" },
    { label: "Pending Payment", value: formatCurrency(pendingPayment), icon: DollarSign, color: "border-l-orange-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push("/app")}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Event Status Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push("/app")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-full transition-colors"
            >
              <Users className="w-4 h-4" />
              Employee Status
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-5 rounded-full transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dynamicStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by event name, location, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {/* Event Cards - Line by Line */}
        <div className="flex flex-col gap-4">
          {events
            .filter(
              (event) =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.phone.includes(searchTerm)
            )
            .map((event) => (
              <EventCard key={event.id} event={event} onEdit={handleEditClick} onRequestDelete={requestDeleteEvent} onChangeStatus={handleChangeEventStatus} />
            ))}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-2xl font-bold">Confirm Delete</h2>
            </div>

            <div className="p-8">
              <p className="text-gray-700 text-lg mb-2">
                Are you sure you want to delete <span className="font-bold">{deleteConfirm.title}</span>?
              </p>
              <p className="text-gray-600 text-sm">
                This action cannot be undone. The event will be permanently removed from the dashboard.
              </p>

              <div className="flex gap-4 justify-end mt-8">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(deleteConfirm.id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      <EditEventModal
        event={editingEvent}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEvent}
      />

      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEvent}
      />
    </div>
  )
}
