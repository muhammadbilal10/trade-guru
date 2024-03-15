import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  onSave,
  initialQuestion = "",
  isEditing = false,
  editIndex = null,
}) => {
  const [question, setQuestion] = useState(initialQuestion);

  const handleSubmit = () => {
    onSave({ question: question, isEditing, editIndex });
    setQuestion("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-lg mb-4 lg:w-[600px]">
          Add New Feedback Questions
        </h2>
        <input
          className="form-input px-4 py-2 mb-4 border rounded-md w-full"
          placeholder="e.g. How clear and understandable were the instructor's explanations?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-l mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-600 text-white py-2 px-4 rounded-r"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FeedbackForm({ feedbackList, setFeedbackList }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editInfo, setEditInfo] = useState({
    isEditing: false,
    editIndex: null,
    initialQuestion: "",
  });

  const addFeedback = ({ question, isEditing, editIndex }) => {
    if (isEditing) {
      const updatedList = [...feedbackList];
      updatedList[editIndex] = { question };
      setFeedbackList(updatedList);
    } else {
      setFeedbackList([...feedbackList, { question }]);
    }
    setIsModalOpen(false);
  };

  const openEditModal = (question, index) => {
    setEditInfo({
      isEditing: true,
      editIndex: index,
      initialQuestion: question,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      {feedbackList.map((feedback, index) => (
        <div
          key={index}
          className="flex max-lg:flex-col max-lg:items-start justify-between items-center py-3 border-b border-gray-200"
        >
          <h3 className="text-lg font-semibold">{feedback.question}</h3>
          <div>
            <button
              className="text-primary mr-2"
              onClick={() => openEditModal(feedback.question, index)}
            >
              <FaEdit />
            </button>
            <button
              className="text-primary"
              onClick={() =>
                setFeedbackList(feedbackList.filter((_, i) => i !== index))
              }
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setEditInfo({
            isEditing: false,
            editIndex: null,
            initialQuestion: "",
          });
        }}
        className="bg-primary mt-4 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      >
        + Add Feedback Question
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addFeedback}
        initialQuestion={editInfo.initialQuestion}
        isEditing={editInfo.isEditing}
        editIndex={editInfo.editIndex}
      />
    </div>
  );
}
