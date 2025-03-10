import { Knowledge } from "../../utils/type";
import { Pen, Trash } from "lucide-react";
import EditknowledgeForm from "./EditknowledgeForm";

interface KnowledgeBaseProps {
  knowledgeBase: Knowledge[];
  showEditknowledgeForm: boolean;
  setShowEditknowledgeForm: React.Dispatch<React.SetStateAction<boolean>>;
  setNewKnowledge: React.Dispatch<React.SetStateAction<Knowledge>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditNode: React.Dispatch<React.SetStateAction<string>>;
  setDeleteNode: React.Dispatch<React.SetStateAction<string>>;
}
export default function KnowledgeBase({
  knowledgeBase,
  setNewKnowledge,
  setOpenModal,
  setEditNode,
  setDeleteNode,
}: KnowledgeBaseProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-200">
        {knowledgeBase.map((knowledge) => (
          <div key={knowledge.key} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {knowledge.question}
                </h3>
                <p className="mt-1 text-gray-600">{knowledge.reply}</p>
                <p className="mt-1 text-gray-600">{knowledge.link}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div
                  onClick={() => {
                    setOpenModal(true);
                    setEditNode("knowledge");
                    setDeleteNode("");
                    setNewKnowledge({ ...knowledge });
                  }}
                  className="cursor-pointer"
                >
                  Edit{" "}
                  <span>
                    <Pen className="text-blue-500" />
                  </span>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setNewKnowledge({ ...knowledge });
                    setOpenModal(true);
                    setDeleteNode("knowledge");
                  }}
                >
                  Delete{" "}
                  <span>
                    <Trash className="text-red-500 font-bold" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
