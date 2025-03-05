interface Student {
  _id: string;
  name: string;
  email?: string;
  whatsAppNumber: string;
  rollNumber: string;
  program: string;
}

interface CreateStudentFormProps {
  newStudent: Student;
  setNewStudent: React.Dispatch<React.SetStateAction<Student>>;
  handleCreateStudent: (e: React.FormEvent<HTMLFormElement>) => void;
  showNewStudentForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateStudentForm({
  newStudent,
  setNewStudent,
  showNewStudentForm,
  handleCreateStudent,
}: CreateStudentFormProps) {
  return (
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
              value={newStudent.rollNumber}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  rollNumber: e.target.value,
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
              value={newStudent.whatsAppNumber}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  whatsAppNumber: e.target.value,
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
              onClick={() => {
                setNewStudent({} as Student);
                showNewStudentForm(false);
              }}
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
  );
}
