import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  FaBacon,
  FaBasketballBall,
  FaCheck,
  FaFile,
  FaTrash,
} from "react-icons/fa";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [objective, setObjective] = useState("");

  const handleSubmit = () => {
    onSave({ title, objective });
    setTitle("");
    setObjective("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-lg mb-4">Add New Section</h2>
        <input
          className="form-input px-4 py-2 mb-4 border rounded-md w-full"
          placeholder="Section Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="form-input px-4 py-2 mb-4 border rounded-md w-full"
          placeholder="Objective"
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-r"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const LectureModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const uploadImage = async () => {
    if (!material) {
      alert("Please select an file to upload.");
      return;
    }

    const storage = getStorage();
    const storageReference = ref(storage, `material/${material.name}`);
    const uploadTask = uploadBytesResumable(storageReference, material);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setMaterial(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setDisabled(true);
    const fileURL = await uploadImage();
    await onSave({ title, material: fileURL });
    setTitle("");
    setMaterial("");
    setDisabled(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded">
        <h2 className="text-lg mb-4">Add New Lecture</h2>
        <input
          className="form-input px-4 py-2 mb-4 border rounded-md w-full"
          placeholder="Lecture Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          id="courseImage"
          name="courseImage"
          onChange={handleFileChange}
          accept="image/svg+xml, 
    image/png, 
    image/jpeg, 
    image/gif, 
    application/vnd.ms-powerpoint, 
    application/vnd.openxmlformats-officedocument.presentationml.presentation, 
    application/pdf,
    video/mp4, 
    video/x-msvideo, 
    video/quicktime"
          className="mt-1 p-2 w-full border rounded-md"
        />

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-l mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`py-2 px-4 rounded-r text-white ${
              disabled ? "bg-gray-400" : "bg-secondary"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Lecture Component
const Lecture = ({ title, material, id, onRemove }) => {
  return (
    <div className="mb-2 border-2 p-4">
      <div className="flex items-center">
        <FaCheck className="mr-2 h-4 w-4 px-1 bg-black text-white rounded-full " />
        <span>
          {`Lecture ${id}`} - {title} - {material}
        </span>
        <button onClick={onRemove}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

// CurriculumItem Component
const CurriculumItem = ({
  sectionId,
  lectures,
  onAddLecture,
  onRemoveLecture,
  type,
}) => {
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);

  const addLecture = (lecture) => {
    onAddLecture(sectionId, lecture);
    setIsLectureModalOpen(false);
  };

  const removeLecture = (lectureId) => {
    onRemoveLecture(sectionId, lectureId);
  };
  return (
    <div>
      {lectures.map((lecture, index) => (
        <Lecture
          key={index}
          title={lecture.title}
          material={lecture.material}
          id={index + 1}
          onRemove={() => removeLecture(index)}
        />
      ))}

      <button
        onClick={() => setIsLectureModalOpen(true)}
        className="mt-2 bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      >
        + Add Lecture
      </button>

      {type === "online" && (
        <button
          onClick={() => setIsLectureModalOpen(true)}
          className="mt-2 bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
        >
          + Add class details
        </button>
      )}

      <LectureModal
        isOpen={isLectureModalOpen}
        onClose={() => setIsLectureModalOpen(false)}
        onSave={addLecture}
      />
    </div>
  );
};

const CurriculumSection = ({
  prevStep,
  sections,
  setSections,
  handleAddCourse,
  handleEditCourse,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addSection = (section) => {
    setSections([
      ...sections,
      { ...section, id: sections.length + 1, lectures: [] },
    ]);
  };

  const addLectureToSection = (sectionId, lecture) => {
    const newSections = sections.map((section) => {
      if (section.id === sectionId) {
        return { ...section, lectures: [...section.lectures, lecture] };
      }
      return section;
    });
    setSections(newSections);
  };

  const removeLectureFromSection = (sectionId, lectureId) => {
    const newSections = sections.map((section, sectionIndex) => {
      if (sectionIndex + 1 === sectionId) {
        return {
          ...section,
          lectures: section.lectures.filter((_, index) => index !== lectureId),
        };
      }
      return section;
    });
    console.log(newSections);
    setSections(newSections);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter((section, index) => index !== sectionId));
  };

  console.log(sections);
  console.log(type);
  return (
    <div className="container mx-auto mt-4 shadow-lg rounded-md p-8 bg-white">
      {sections.map((section, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold mb-2">{`Section ${
              index + 1
            }: `}</h2>
            <div className="flex items-center">
              <FaFile className="inline-block text-black mr-2" size={14} />
              <span className="text-gray-600 text-md mr-2">
                {section.title}
              </span>
              <button onClick={() => removeSection(index)} className=" ">
                <FaTrash />
              </button>
            </div>
          </div>

          <p className="mb-4">{`Objective: ${section.objective}`}</p>

          <CurriculumItem
            sectionId={section.id}
            lectures={section.lectures}
            onAddLecture={addLectureToSection}
            onRemoveLecture={removeLectureFromSection}
            type={type}
          />
        </div>
      ))}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
      >
        + New Section
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addSection}
      />
      <div className="mt-10 flex justify-between">
        <button
          onClick={prevStep}
          className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
        >
          Prev
        </button>
        <button
          onClick={type === "offline" ? handleAddCourse : handleEditCourse}
          className=" bg-primary w-24 hover:bg-primary-600 text-white p-3 rounded-md focus:outline-none focus:shadow-outline-blue "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CurriculumSection;
