import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useChangeTheme } from "../context/ThemeContext";
import type { MyTask, TaskModalProps } from "../types/types";


const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  selectedDate,
  setMyTaskList,
  selectedEndDate,
}: TaskModalProps) => {
  const { darkTheme } = useChangeTheme();

  const [formData, setFormData] = useState<MyTask>({
    title: "task",
    category: "to-do",
    start: new Date(),
    end: new Date(),
    allDay: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Submit OR Create New Task
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Check fields are empty
    if (!formData.title || !formData.category) {
      toast.error("Please fill all fields");
      return;
    }

    const newTask: MyTask = {
      title: formData.title,
      category: formData.category as MyTask["category"],
      start: selectedDate,
      end: selectedEndDate,
      allDay: true,
    };

    const prevTasks: MyTask[] = JSON.parse(
      localStorage.getItem("myTaskList") || "[]"
    );

    const updatedTasks = [...prevTasks, newTask];
    localStorage.setItem("myTaskList", JSON.stringify(updatedTasks));

    setMyTaskList(
      updatedTasks?.map((task) => ({
        ...task,
        start: new Date(task?.start),
        end: new Date(task?.end),
      }))
    );

    toast.success("Task added successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className={`rounded-lg p-6 w-full max-w-md shadow-xl ${
          darkTheme ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        {/* Header */}
        <h2 className="text-xl font-semibold mb-1">Add Task</h2>
        <p className="text-sm text-gray-500 mb-4">
          Selected Date:{" "}
          <span className="font-medium text-red-500">
            {selectedDate?.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>

        {/* Task Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Your Task..."
            required
            className={`w-full px-3 py-2 rounded border focus:outline-none ${
              darkTheme
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            onChange={handleChange}
            required
            className={`w-full px-3 py-2 rounded border focus:outline-none ${
              darkTheme
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
          >
            <option value="to-do">To-Do</option>
            <option value="progress">Progress</option>
            <option value="complete">Complete</option>
            <option value="review">Review</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              darkTheme ? "bg-gray-600 text-white" : "bg-gray-300 text-black"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
