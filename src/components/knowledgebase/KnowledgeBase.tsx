import { Knowledge } from '../../utils/type';
import { Pen, Trash } from 'lucide-react';
import EditknowledgeForm from './EditknowledgeForm';

interface KnowledgeBaseProps {
    knowledgeBase: Knowledge[];
    showEditknowledgeForm: boolean;
    setShowEditknowledgeForm: React.Dispatch<React.SetStateAction<boolean>>;
    setNewKnowledge: React.Dispatch<React.SetStateAction<Knowledge>>;
}
export default function KnowledgeBase({
  knowledgeBase,
  showEditknowledgeForm,
  setShowEditknowledgeForm,
  setNewKnowledge,
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
                    setShowEditknowledgeForm(true);
                    setNewKnowledge({ ...knowledge });
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
            {showEditknowledgeForm && (
              <EditknowledgeForm
                newknowledge={knowledge}
                setNewknowledge={setNewKnowledge}
                setShowEditknowledgeForm={setShowEditknowledgeForm}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
