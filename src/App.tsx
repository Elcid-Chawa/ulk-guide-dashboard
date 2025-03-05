import React, { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  Users,
  Loader2,
  Pen,
  Trash,
  Lightbulb,
} from "lucide-react";
import { format } from "date-fns";
import { supabase } from "./lib/supabase";
import toast from "react-hot-toast";
import {
  getStudents,
  createStudent,
  updateStudent,
} from "./service/student.service";
import EditStudentForm from "./components/EditStudentForm";
import CreateStudentForm from "./components/CreateStudentForm";
import { getknowledgeBase } from "./service/knowledge.service";
import KnowledgeBase from "./components/knowledgebase/KnowledgeBase";
import { Knowledge } from "./utils/type";

type Event = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  status: string;
};

// type Student = {
//   id: string;
//   name: string;
//   whatsapp: string;
//   email: string;
//   roll_number: string;
//   program: string;
// };

type Students = {
  _id: string;
  name: string;
  email?: string;
  whatsAppNumber: string;
  rollNumber: string;
  program: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  // const [students, setStudents] = useState<Student[]>([]);
  const [allStudents, setAllStudents] = useState<Students[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<Knowledge[]>([]);
  const [showEditknowledgeForm, setShowEditknowledgeForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [showNewStudentForm, setShowNewStudentForm] = useState(false);
  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_date: "",
  });
  const [newStudent, setNewStudent] = useState<Students>({
    _id: "",
    name: "",
    whatsAppNumber: "",
    email: "",
    rollNumber: "",
    program: "MIS",
  });

  const [newKnowledge, setNewKnowledge] = useState<Knowledge>({
    _id: "",
    question: "",
    link: "",
    reply: "",
    key:"",
  });

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    try {
      const [eventsData] = await Promise.all([
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
      // if (studentsData.data) setStudents(studentsData.data);

      const allStudent = await getStudents();
      setAllStudents(allStudent);

      const knowledge: Knowledge[] = await getknowledgeBase();
      setKnowledgeBase(knowledge);
      console.log(knowledge);
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
      const response = await createStudent(newStudent);
      // const { data, error } = await supabase
      //   .from("students")
      //   .insert([newStudent])
      //   .select();

      // setStudents([...students, response]);
      setShowNewStudentForm(false);
      setRefreshing(!refreshing);
      setNewStudent({
        _id: "",
        name: "",
        whatsAppNumber: "",
        email: "",
        rollNumber: "",
        program: "MIS",
      });
      console.log(response);
      toast.success("Student added successfully");
    } catch (error) {
      toast.error("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateStudent(newStudent);
      // const { data, error } = await supabase
      //   .from("students")
      //   .insert([newStudent])
      //   .select();

      // setStudents([...students, response]);
      setShowEditStudentForm(false);
      setRefreshing(!refreshing);
      setNewStudent({
        _id: "",
        name: "",
        whatsAppNumber: "",
        email: "",
        rollNumber: "",
        program: "MIS",
      });
      console.log(response);
      toast.success("Student updated successfully");
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
          <button
            onClick={() => setActiveTab("knowledge_base")}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === "knowledge_base"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <Lightbulb className="w-5 h-5 mr-2" />
            Knowledge Base
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
              <CreateStudentForm
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                showNewStudentForm={setShowNewStudentForm}
                handleCreateStudent={handleCreateStudent}
              />
            )}

            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-gray-200">
                {allStudents.map((student) => (
                  <div key={student.rollNumber} className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {student.name}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {student.whatsAppNumber}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          onClick={() => {
                            setShowEditStudentForm(true);
                            setNewStudent({ ...student });
                          }}
                        >
                          Edit{" "}
                          <span>
                            <Pen />
                          </span>
                        </div>
                        <div>
                          Delete{" "}
                          <span>
                            <Trash />
                          </span>
                        </div>
                      </div>
                    </div>
                    {showEditStudentForm && (
                      <EditStudentForm
                        newStudent={student}
                        setNewStudent={setNewStudent}
                        setShowEditStudentForm={setShowEditStudentForm}
                        handleUpdateStudent={handleUpdateStudent}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "knowledge_base" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Knowledge Base
              </h2>
              <button
                onClick={() => setShowNewStudentForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Knowledge Base
              </button>
            </div>

            {showNewStudentForm && (
              <CreateStudentForm
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                showNewStudentForm={setShowNewStudentForm}
                handleCreateStudent={handleCreateStudent}
              />
            )}

            <KnowledgeBase
              knowledgeBase={knowledgeBase}
              showEditknowledgeForm={showEditknowledgeForm}
              setShowEditknowledgeForm={setShowEditknowledgeForm}
              setNewKnowledge={setNewKnowledge}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
