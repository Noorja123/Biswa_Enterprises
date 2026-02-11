'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, LogOut, Users, TrendingUp, Clock, Briefcase, Download, Plus, Eye, Edit2, Trash2, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Employee {
  id: number;
  photo: string;
  name: string;
  age: number;
  contact: string;
  address: string;
  skill: string;
  status: 'Active' | 'Busy';
  type: 'Permanent' | 'Hourly';
  salary: number;
  hours: number;
  pendingSalary: number;
  liability: number;
  remaining: number;
  imageFile?: File;
}

const initialEmployees: Employee[] = [];

export default function LabourManagementPortal() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isAddingLabour, setIsAddingLabour] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<Employee | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [msgsOpen, setMsgsOpen] = useState(false);
  const msgsRef = useRef<HTMLDivElement | null>(null);
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  const [formData, setFormData] = useState<Employee>({
    id: 0,
    photo: '👤',
    name: '',
    age: 0,
    contact: '',
    address: '',
    skill: '',
    status: 'Active',
    type: 'Permanent',
    salary: 0,
    hours: 0,
    pendingSalary: 0,
    liability: 0,
    remaining: 0,
    imageFile: undefined,
  });

  // Check authentication on mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [router]);

  // Load contact messages for admin header and listen for storage changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem('contact-messages');
      const list = raw ? JSON.parse(raw) : [];
      setMessages(list);
    } catch (err) {
      console.error('[admin-page] failed to read contact-messages', err);
    }

    function onStorage(e: StorageEvent) {
      if (e.key !== 'contact-messages') return;
      try {
        const raw = localStorage.getItem('contact-messages');
        const list = raw ? JSON.parse(raw) : [];
        setMessages(list);
      } catch (err) {
        console.error('[admin-page] failed to parse storage event', err);
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Load employees from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('employees');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((emp: any, idx: number) => ({
            id: typeof emp.id === 'number' ? emp.id : idx + 1,
            photo: typeof emp.photo === 'string' ? emp.photo : '👤',
            name: emp.name ?? '',
            age: Number(emp.age) || 0,
            contact: emp.contact ?? '',
            address: emp.address ?? '',
            skill: emp.skill ?? '',
            status: emp.status === 'Busy' ? 'Busy' : 'Active',
            type: emp.type === 'Hourly' ? 'Hourly' : 'Permanent',
            salary: Number(emp.salary) || 0,
            hours: Number(emp.hours) || 0,
            pendingSalary: Number(emp.pendingSalary) || 0,
            liability: Number(emp.liability) || 0,
            remaining: Number(emp.remaining) || 0,
          }));
          setEmployees(normalized);
          console.debug('[employees] loaded from localStorage:', normalized.length);
        } else {
          setEmployees([]);
        }
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error('Failed to load employees from localStorage:', error);
      setEmployees([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Consolidated save effect - runs after any employee change
  useEffect(() => {
    if (isLoaded && employees.length >= 0) {
      persistEmployees(employees);
    }
  }, [employees, isLoaded]);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    
    const query = searchQuery.toLowerCase();
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(query) ||
      emp.contact.toLowerCase().includes(query) ||
      emp.skill.toLowerCase().includes(query)
    );
  }, [employees, searchQuery]);

  const handleDelete = (id: number) => {
    const next = employees.filter(emp => emp.id !== id);
    setEmployees(next);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/admin');
  };

  const handleEditClick = (employee: Employee) => {
    setFormData(employee);
    setEditingEmployee(employee);
    setSelectedEmployee(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ 
          ...formData, 
          photo: reader.result as string,
          imageFile: file 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddLabourClick = () => {
    setFormData({
      id: 0,
      photo: '👤',
      name: '',
      age: 0,
      contact: '',
      address: '',
      skill: '',
      status: 'Active',
      type: 'Permanent',
      salary: 0,
      hours: 0,
      pendingSalary: 0,
      liability: 0,
      remaining: 0,
      imageFile: undefined,
    });
    setIsAddingLabour(true);
  };
  const persistEmployees = (list: Employee[]) => {
    try {
      const sanitized = list.map(({ imageFile, ...rest }) => rest);
      localStorage.setItem('employees', JSON.stringify(sanitized));
      console.debug('[persistEmployees] wrote', sanitized.length);
    } catch (e) { console.error('persistEmployees failed', e); }
  }

  const handleSaveLabour = () => {
    // Validation
    setValidationError('');
    
    if (!formData.name.trim()) {
      setValidationError('Name is required');
      return;
    }
    if (formData.age <= 0) {
      setValidationError('Age must be greater than 0');
      return;
    }
    if (!formData.contact.trim()) {
      setValidationError('Contact is required');
      return;
    }
    if (!formData.address.trim()) {
      setValidationError('Address is required');
      return;
    }
    if (!formData.skill.trim()) {
      setValidationError('Skill is required');
      return;
    }
    if (formData.salary <= 0) {
      setValidationError('Salary must be greater than 0');
      return;
    }

    if (editingEmployee) {
      const next = employees.map(emp => (emp.id === editingEmployee.id ? formData : emp));
      setEmployees(next);
      setEditingEmployee(null);
    } else {
      const nextId = Math.max(...employees.map(e => e.id), 0) + 1;
      const newEmp = { ...formData, id: nextId };
      const next = [...employees, newEmp];
      setEmployees(next);
      setIsAddingLabour(false);
    }
    setFormData({
      id: 0,
      photo: '👤',
      name: '',
      age: 0,
      contact: '',
      address: '',
      skill: '',
      status: 'Active',
      type: 'Permanent',
      salary: 0,
      hours: 0,
      pendingSalary: 0,
      liability: 0,
      remaining: 0,
      imageFile: undefined,
    });
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setIsAddingLabour(false);
    setValidationError('');
    setFormData({
      id: 0,
      photo: '👤',
      name: '',
      age: 0,
      contact: '',
      address: '',
      skill: '',
      status: 'Active',
      type: 'Permanent',
      salary: 0,
      hours: 0,
      pendingSalary: 0,
      liability: 0,
      remaining: 0,
      imageFile: undefined,
    });
  };

  const handleStatusChange = (employeeId: number, newStatus: 'Active' | 'Busy') => {
    const next = employees.map(emp => emp.id === employeeId ? { ...emp, status: newStatus } : emp);
    setEmployees(next);
  };

  const stats = {
    totalEmployees: employees.length,
    available: employees.filter(emp => emp.status === 'Active').length,
    hourlyLabours: employees.filter(emp => emp.type === 'Hourly').length,
    permanentLabours: employees.filter(emp => emp.type === 'Permanent').length,
  };

  const handleExportCSV = () => {
    // Define CSV headers - all employee details
    const headers = [
      'ID',
      'Name',
      'Age',
      'Contact',
      'Address',
      'Skill',
      'Status',
      'Type',
      'Salary',
      'Hours',
      'Pending Salary',
      'Advance Taken',
      'Remaining'
    ];

    // Convert employees data to CSV rows
    const csvRows = employees.map(emp => [
      emp.id,
      emp.name,
      emp.age,
      emp.contact,
      emp.address,
      emp.skill,
      emp.status,
      emp.type,
      emp.salary,
      emp.hours,
      emp.pendingSalary,
      emp.liability,
      emp.remaining
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => 
        row.map(cell => 
          typeof cell === 'string' && cell.includes(',') 
            ? `"${cell}"` 
            : cell
        ).join(',')
      )
    ].join('\n');

    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-0 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Employee Management Portal</h1>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <button
                type="button"
                onClick={() => { setMsgsOpen(true); }}
                className="px-3 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors text-white flex items-center gap-2"
              >
                <Mail size={16} />
                {messages.length > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-red-500 text-xs font-semibold px-2 py-0.5">{messages.length}</span>
                )}
              </button>
            </div>
            <button 
              onClick={() => router.push('/event')}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors text-white font-medium"
            >
              Event Status
            </button>
            <button onClick={handleLogout} className="px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-medium flex items-center gap-2 transition-colors">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Full-page Messages UI (email-like) */}
      {msgsOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex items-center justify-between py-4 px-4 border-b">
              <h2 className="text-lg font-semibold">Messages</h2>
              <div className="flex items-center gap-3">
                <button
                  className="px-3 py-2 rounded-md bg-gray-100 text-sm text-gray-700"
                  onClick={() => { localStorage.removeItem('contact-messages'); setMessages([]); setMsgsOpen(false); }}
                >
                  Clear
                </button>
                <button
                  className="px-3 py-2 rounded-md bg-blue-800 text-white"
                  onClick={() => setMsgsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left: message list */}
              <aside className="w-80 min-w-[18rem] border-r bg-gray-50 overflow-y-auto">
                <div className="p-3">
                  {messages.length === 0 && (
                    <div className="py-8 text-center text-gray-500">No messages</div>
                  )}
                  {messages.map((m: any) => (
                    <div
                      key={m.id}
                      className="mb-2 cursor-pointer rounded-md p-3 hover:bg-white hover:shadow transition-shadow"
                      onClick={() => setSelectedMsg(m)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{m.name || m.email}</div>
                        <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleTimeString()}</div>
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2 whitespace-pre-wrap">{m.message}</div>
                    </div>
                  ))}
                </div>
              </aside>

              {/* Right: message detail */}
              <section className="flex-1 overflow-y-auto p-6">
                {!selectedMsg && (
                  <div className="h-full flex items-center justify-center text-gray-400">Select a message to view</div>
                )}
                {selectedMsg && (
                  <div className="max-w-4xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{selectedMsg.name || selectedMsg.email}</h3>
                        <div className="text-sm text-gray-500">{selectedMsg.email} • {selectedMsg.phone}</div>
                      </div>
                      <div className="text-sm text-gray-400">{new Date(selectedMsg.createdAt).toLocaleString()}</div>
                    </div>

                    <div className="mt-6 rounded-md border bg-white p-6 whitespace-pre-wrap text-gray-800">{selectedMsg.message}</div>

                    <div className="mt-6 flex gap-3">
                      <button
                        className="px-4 py-2 rounded-md bg-blue-800 text-white"
                        onClick={() => alert('Reply not implemented')}
                      >
                        Reply
                      </button>
                      <button
                        className="px-4 py-2 rounded-md bg-red-50 text-red-600 border"
                        onClick={() => {
                          const remaining = messages.filter((m: any) => m.id !== selectedMsg.id);
                          localStorage.setItem('contact-messages', JSON.stringify(remaining));
                          setMessages(remaining);
                          setSelectedMsg(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="w-full mx-auto py-6 sm:py-8">
        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Employees Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-blue-900">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Employees</p>
                <p className="text-4xl font-bold text-gray-800">{stats.totalEmployees}</p>
              </div>
              <Users size={48} className="text-blue-900 opacity-80" />
            </div>
          </div>

          {/* Available Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-green-500">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Available</p>
                <p className="text-4xl font-bold text-gray-800">{stats.available}</p>
              </div>
              <TrendingUp size={48} className="text-green-500 opacity-80" />
            </div>
          </div>

          {/* Hourly Labours Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-orange-500">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Hourly Labours</p>
                <p className="text-4xl font-bold text-gray-800">{stats.hourlyLabours}</p>
              </div>
              <Clock size={48} className="text-orange-500 opacity-80" />
            </div>
          </div>

          {/* Permanent Labours Card */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4 border-indigo-500">
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Permanent Labours</p>
                <p className="text-4xl font-bold text-gray-800">{stats.permanentLabours}</p>
              </div>
              <Briefcase size={48} className="text-indigo-500 opacity-80" />
            </div>
          </div>
        </div>

        {/* Search and Action Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, contact, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handleExportCSV}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Download size={18} />
                Export
              </button>
              <button
                onClick={handleAddLabourClick}
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                Add Labour
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 sm:mb-0">
          <div className="overflow-x-auto">
            <table className="w-full" style={{tableLayout: 'auto'}}>
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '8%'}}>Photo</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '22%'}}>Name</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '5%'}}>Age</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '18%'}}>Contact</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '12%'}}>Skill</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '8%'}}>Status</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '7%'}}>Type</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '11%'}}>Total Salary</th>
                  <th className="px-3 py-4 text-left font-semibold" style={{width: '9%'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-3 py-4" style={{width: '8%'}}>
                      {employee.photo.startsWith('data:') || employee.photo.startsWith('http') ? (
                        <img 
                          src={employee.photo} 
                          alt={employee.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl">{employee.photo}</span>
                      )}
                    </td>
                    <td className="px-3 py-4 font-medium text-gray-900" style={{width: '22%'}}>{employee.name}</td>
                    <td className="px-3 py-4 text-gray-700" style={{width: '5%'}}>{employee.age}</td>
                    <td className="px-3 py-4 text-gray-700" style={{width: '18%'}}>{employee.contact}</td>
                    <td className="px-3 py-4 text-gray-700" style={{width: '12%'}}>{employee.skill}</td>
                    <td className="px-3 py-4" style={{width: '8%'}}>
                      <Select 
                        value={employee.status} 
                        onValueChange={(value) => handleStatusChange(employee.id, value as 'Active' | 'Busy')}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                              Active
                            </span>
                          </SelectItem>
                          <SelectItem value="Busy">
                            <span className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                              Busy
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-3 py-4" style={{width: '7%'}}>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          employee.type === 'Permanent'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {employee.type}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-medium text-gray-900" style={{width: '11%'}}>₹{employee.salary.toLocaleString()}</td>
                    <td className="px-3 py-4" style={{width: '9%'}}>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} className="text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleEditClick(employee)}
                          className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-orange-600" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(employee)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredEmployees.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">No employees found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      {/* Employee Detail Modal with Transparent Background */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="bg-blue-900 text-white px-6 py-4 sticky top-0">
              <h2 className="text-2xl font-bold">Labour Details</h2>
            </div>

            <div className="p-8">
              {/* Top Section - Photo, Name, Skill, Status */}
              <div className="flex gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="min-w-fit">
                  {selectedEmployee.photo.startsWith('data:') || selectedEmployee.photo.startsWith('http') ? (
                    <img 
                      src={selectedEmployee.photo} 
                      alt={selectedEmployee.name}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-6xl">{selectedEmployee.photo}</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedEmployee.name}</h3>
                  <p className="text-gray-600 text-lg mb-4">{selectedEmployee.skill}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEmployee.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>

              {/* Info Rows */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Age</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedEmployee.age} years</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Contact</p>
                  <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{selectedEmployee.contact}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-1">Address</p>
                <p className="text-lg font-semibold text-gray-900">{selectedEmployee.address}</p>
              </div>

              {/* Type and Hours */}
              <div className={`${selectedEmployee.type === 'Hourly' ? 'grid grid-cols-2 gap-6' : ''} mb-6 pb-6 border-b border-gray-200`}>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Type</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedEmployee.type === 'Permanent'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {selectedEmployee.type}
                  </span>
                </div>
                {selectedEmployee.type === 'Hourly' && (
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Hours</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedEmployee.hours} hrs</p>
                  </div>
                )}
              </div>

              {/* Salary Info - Total, Paid (or Pending), Remaining */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-gray-600 text-sm mb-2">Total Salary</p>
                  <p className="text-2xl font-bold text-green-600">₹{selectedEmployee.salary.toLocaleString()}</p>
                </div>
                <div className={`p-4 rounded-lg border ${selectedEmployee.type === 'Hourly' ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                  <p className="text-gray-600 text-sm mb-2">{selectedEmployee.type === 'Hourly' ? 'Paid' : 'Pending Salary'}</p>
                  <p className={`text-2xl font-bold ${selectedEmployee.type === 'Hourly' ? 'text-blue-600' : 'text-orange-600'}`}>₹{selectedEmployee.pendingSalary.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-gray-600 text-sm mb-2">Remaining</p>
                  <p className="text-2xl font-bold text-yellow-600">₹{selectedEmployee.remaining.toLocaleString()}</p>
                </div>
              </div>

              {/* Advance Taken (one column down) */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="text-gray-600 text-sm mb-2">Advance Taken</p>
                  <p className="text-2xl font-bold text-red-600">₹{selectedEmployee.liability.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="px-6 py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Labour Modal */}
      {editingEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="bg-blue-900 text-white px-6 py-4 sticky top-0">
              <h2 className="text-2xl font-bold">Edit Labour</h2>
            </div>

            <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
              {/* Row 1: Name | Photo */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photo (Emoji)</label>
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {formData.photo && (formData.photo.startsWith('data:') || formData.photo.startsWith('http')) && (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={formData.photo} 
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Row 2: Age | Contact */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.contact}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9+\s-]/g, '');
                      setFormData({ ...formData, contact: numericValue });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              {/* Row 3: Skill | Status */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Busy' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Active">Active</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Permanent' | 'Hourly' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Permanent">Permanent Employee</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>
                <div className={`transition-all duration-300 ${formData.type === 'Hourly' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {formData.type === 'Hourly' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hours</label>
                      <input
                        type="number"
                        value={formData.hours}
                        onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  )}
                </div>
              </div>

              {formData.type === 'Permanent' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Permanent Salary (₹)</label>
                    <input
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pending Salary (₹)</label>
                      <input
                        type="number"
                        value={formData.pendingSalary}
                        onChange={(e) => setFormData({ ...formData, pendingSalary: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Advance Taken (₹)</label>
                      <input
                        type="number"
                        value={formData.liability}
                        onChange={(e) => setFormData({ ...formData, liability: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Total Salary (₹)</label>
                      <input
                        type="number"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Paid (₹)</label>
                      <input
                        type="number"
                        value={formData.pendingSalary}
                        onChange={(e) => setFormData({ ...formData, pendingSalary: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Remaining (₹)</label>
                      <input
                        type="number"
                        value={formData.remaining}
                        onChange={(e) => setFormData({ ...formData, remaining: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Advance Taken (₹)</label>
                    <input
                      type="number"
                      value={formData.liability}
                      onChange={(e) => setFormData({ ...formData, liability: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </>
              )}

              {validationError && (
                <div className="p-3 bg-red-50 border border-red-300 rounded-md">
                  <p className="text-sm text-red-700 font-medium">{validationError}</p>
                </div>
              )}

              <div className="flex gap-4 justify-end border-t pt-6">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLabour}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  Update Labour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Labour Modal */}
      {isAddingLabour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            <div className="bg-blue-900 text-white px-4 py-3 sticky top-0">
              <h2 className="text-xl font-semibold">Add New Labour</h2>
            </div>

            <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 pb-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                    placeholder=""
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                  <div className="flex gap-2 items-center w-full">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                    />
                    {formData.photo && (formData.photo.startsWith('data:') || formData.photo.startsWith('http')) && (
                      <div className="w-10 h-10 rounded-md overflow-hidden border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={formData.photo} 
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={formData.contact}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9+\s-]/g, '');
                      setFormData({ ...formData, contact: numericValue });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.skill}
                    onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Busy' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'Permanent' | 'Hourly' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                >
                  <option value="Permanent">Permanent Employee</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 transition-all duration-200">
                <div className="transition-all duration-200">
                  <label className="block text-sm font-medium text-gray-700 mb-1 transition-colors duration-200">
                    {formData.type === 'Permanent' ? 'Permanent Salary' : 'Total Salary'} (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.salary || ''}
                    onChange={(e) => setFormData({ ...formData, salary: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
                <div className={`overflow-hidden transition-all duration-200 ${formData.type === 'Hourly' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 h-0'}`}>
                  {formData.type === 'Hourly' && (
                    <div className="transition-all duration-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200">Hours</label>
                      <input
                        type="number"
                        value={formData.hours || ''}
                        onChange={(e) => setFormData({ ...formData, hours: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{formData.type === 'Permanent' ? 'Pending Salary' : 'Paid'} (₹)</label>
                  <input
                    type="number"
                    value={formData.pendingSalary || ''}
                    onChange={(e) => setFormData({ ...formData, pendingSalary: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{formData.type === 'Permanent' ? 'Advance Taken' : 'Remaining'} (₹)</label>
                  <input
                    type="number"
                    value={formData.type === 'Permanent' ? (formData.liability || '') : (formData.remaining || '')}
                    onChange={(e) => formData.type === 'Permanent' ? setFormData({ ...formData, liability: parseInt(e.target.value) }) : setFormData({ ...formData, remaining: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
              </div>

              {/* For Hourly employees show Advance Taken as an extra field */}
              {formData.type === 'Hourly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Advance Taken (₹)</label>
                  <input
                    type="number"
                    value={formData.liability || ''}
                    onChange={(e) => setFormData({ ...formData, liability: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>
              )}

              {validationError && (
                <div className="p-3 bg-red-50 border border-red-300 rounded-md">
                  <p className="text-sm text-red-700 font-medium">{validationError}</p>
                </div>
              )}

              <div className="flex gap-3 justify-end border-t pt-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-md font-medium transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLabour}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium transition-colors text-sm"
                >
                  Add Labour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="bg-red-600 text-white px-6 py-4">
              <h2 className="text-2xl font-bold">Confirm Delete</h2>
            </div>

            <div className="p-8">
              <p className="text-gray-700 text-lg mb-2">
                Are you sure you want to delete <span className="font-bold">{deleteConfirm.name}</span>?
              </p>
              <p className="text-gray-600 text-sm">
                This action cannot be undone. The employee record will be permanently removed from the system.
              </p>

              <div className="flex gap-4 justify-end mt-8">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
