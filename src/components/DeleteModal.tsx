import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteNode: string;
  itemName: string;
  handleDelete: () => Promise<void>;
}

export default function DeleteModal({
  setOpenModal,
  deleteNode,
  itemName,
  handleDelete,
}: DeleteModalProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">Delete {itemName}</h3>
      <p>Are you sure you want to delete this {deleteNode}? &nbsp;</p>

      <span>
        <button
          onClick={() => {
            handleDelete().then(() => {
              setOpenModal(false);
            });
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          <Trash2 />{" "}
        </button>
      </span>
    </div>
  );
}
