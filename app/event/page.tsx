"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

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

export default function EmployeeStatusPage() {
  const [events, setEvents] = useState<Event[]>([])

  // Load events from localStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("dashboard-events")
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents))
      } catch (error) {
        console.error("Failed to parse saved events:", error)
      }
    }
  }, [])

  // Calculate total employees across all events
  const totalEmployees = events.reduce((sum, event) => sum + event.employees, 0)

  // Group events by status and count employees
  const employeesByStatus = {
    Upcoming: events
      .filter((e) => e.status === "Upcoming")
      .reduce((sum, e) => sum + e.employees, 0),
    Ongoing: events
      .filter((e) => e.status === "Ongoing")
      .reduce((sum, e) => sum + e.employees, 0),
    Completed: events
      .filter((e) => e.status === "Completed")
      .reduce((sum, e) => sum + e.employees, 0),
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-red-50 text-red-700 border border-red-300 text-lg font-bold px-4 py-2"
      case "Ongoing":
        return "bg-yellow-50 text-yellow-700 border border-yellow-300 text-lg font-bold px-4 py-2"
      case "Completed":
        return "bg-green-50 text-green-700 border border-green-300 text-lg font-bold px-4 py-2"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200 text-lg font-bold px-4 py-2"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
       
         

        {/* Employee Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Employee Assignment by Event</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Employees Provided</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Event Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No events found. Create an event to start tracking employees.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">{event.title}</td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full ${getStatusStyles(event.status)}`}>
                          {event.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 font-semibold">{event.employees}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{event.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{event.location}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
