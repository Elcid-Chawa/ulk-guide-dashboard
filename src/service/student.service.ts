import axios from "axios";

const API_URL = import.meta.env.VITE_ENDPOINT;
type Student = {
  _id: string;
  name: string;
  email?: string;
  whatsAppNumber: string;
  rollNumber: string;
  program: string;
};

const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data.students;
};

const createStudent = async (student: Student): Promise<Student> => {
  const response = await axios.post(`${API_URL}/students/register`, student);
  return response.data.student;
};

const updateStudent = async (student: Student): Promise<Student> => {
  const response = await axios.put(
    `${API_URL}/students/${student.rollNumber}`,
    student,
  );
  return response.data.student;
};

const deleteStudent = async (rollNumber: string): Promise<void> => {
  await axios.delete(`${API_URL}/students/${rollNumber}`);
};

export { getStudents, createStudent, updateStudent, deleteStudent };
