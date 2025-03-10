import { Knowledge } from "../../utils/type";
interface EditknowledgeFormProps {
  newknowledge: Knowledge;
  setNewknowledge: React.Dispatch<React.SetStateAction<Knowledge>>;
  setShowEditknowledgeForm: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateKnowledge: (e: React.FormEvent<HTMLFormElement>) => void;
}
export default function EditknowledgeForm({
  newknowledge,
  setNewknowledge,
  setShowEditknowledgeForm,
  setOpenModal,
  handleUpdateKnowledge
}: EditknowledgeFormProps) {

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Edit Knowledge</h3>
      <form onSubmit={handleUpdateKnowledge}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Key
            </label>
            <input
              type="text"
              required
              value={newknowledge.key}
              onChange={(e) =>
                setNewknowledge({ ...newknowledge, key: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Knowledge Question
            </label>
            <input
              type="text"
              required
              value={newknowledge.question}
              onChange={(e) =>
                setNewknowledge({
                  ...newknowledge,
                  question: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Response
            </label>
            <textarea
              rows={3}
              required
              value={newknowledge.reply}
              onChange={(e) =>
                setNewknowledge({
                  ...newknowledge,
                  reply: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="text"
              value={newknowledge.link}
              onChange={(e) =>
                setNewknowledge({
                  ...newknowledge,
                  link: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowEditknowledgeForm(false);
                setNewknowledge({} as Knowledge);
                setOpenModal(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Update Knowledge
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
