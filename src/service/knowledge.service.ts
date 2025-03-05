import axios from "axios";
import { Knowledge } from "../utils/type";

const API_URL = import.meta.env.VITE_ENDPOINT;

const getknowledgeBase = async (): Promise<Knowledge[]> => {
  const response = await axios.get(`${API_URL}/knowledgeBase`);
  return response.data;
};

const createKnowledge = async (Knowledge: Knowledge): Promise<Knowledge> => {
  const response = await axios.post(`${API_URL}/knowledgeBase`, Knowledge);
  return response.data;
};

const updateKnowledge = async (Knowledge: Knowledge): Promise<Knowledge> => {
  const response = await axios.post(
    `${API_URL}/knowledgeBase/${Knowledge._id}`,
    Knowledge,
  );
  return response.data;
};

const deleteKnowledge = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/knowledgeBase/${id}`);
};

export { getknowledgeBase, createKnowledge, updateKnowledge, deleteKnowledge };
