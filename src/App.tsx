import React, { useState, useEffect } from "react";
import { Plus, Calendar, Users, Bell, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "./lib/supabase";
import toast from "react-hot-toast";

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  status: string;
};

type Student = {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  roll_number: string;
  program: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: "",
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
    whatsapp: "",
    email: "",
    roll_number: "",
    program: "MIS",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsData, studentsData] = await Promise.all([
        supabase
          .from("events")
          .select("*")
          .order("event_date", { ascending: true }),
        supabase
          .from("students")
          .select("*")
          .order("name", { ascending: true }),
      ]);

      if (eventsData.data) setEvents(eventsData.data);
      if (studentsData.data) setStudents(studentsData.data);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("events")
        .insert([newEvent])
        .select();

      if (error) throw error;

      setEvents([...events, data[0]]);
      setShowNewEventForm(false);
      setNewEvent({ title: "", description: "", event_date: "" });
      toast.success("Event created successfully");
    } catch (error) {
      toast.error("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("students")
        .insert([newStudent])
        .select();

      if (error) throw error;

      setStudents([...students, data[0]]);
      setShowNewStudentForm(false);
      setNewStudent({
        name: "",
        whatsapp: "",
        email: "",
        roll_number: "",
        program: "MIS",
      });
      toast.success("Student added successfully");
    } catch (error) {
      toast.error("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Student Guide Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === "events"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Events
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === "students"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Users className="w-5 h-5 mr-2" />
            Students
          </button>
        </div>

        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Events</h2>
              <button
                onClick={() => setShowNewEventForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Event
              </button>
            </div>

            {showNewEventForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Create New Event</h3>
                <form onSubmit={handleCreateEvent}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        required
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        required
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="datetime-local"
                        required
                        value={newEvent.event_date}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            event_date: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewEventForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Create Event
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-gray-200">
                {events.map((event) => (
                  <div key={event.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {event.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {format(new Date(event.event_date), "PPp")}
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          event.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Students</h2>
              <button
                onClick={() => setShowNewStudentForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Student
              </button>
            </div>

            {showNewStudentForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Add New Student</h3>
                <form onSubmit={handleCreateStudent}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Student Roll Number
                      </label>
                      <input
                        type="text"
                        required
                        value={newStudent.roll_number}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            roll_number: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={newStudent.whatsapp}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            whatsapp: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={newStudent.email}
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            email: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewStudentForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                      >
                        Add Student
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-gray-200">
                {students.map((student) => (
                  <div key={student.id} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {student.name}
                        </h3>
                        <p className="mt-1 text-gray-600">{student.email}</p>
                        <p className="mt-1 text-gray-600">{student.whatsapp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
