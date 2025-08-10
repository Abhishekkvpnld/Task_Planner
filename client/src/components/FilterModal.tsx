import { useEffect, useState } from "react";
import type {
  Category,
  FilterModalProps,
  MyTask,
  TimeFilter,
} from "../types/types";
import { useChangeTheme } from "../context/ThemeContext";

const FilterModal = ({ setFilteredTasks }: FilterModalProps) => {
  const { darkTheme } = useChangeTheme();

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimeFilter>(null);

  const categories: { value: Category; label: string }[] = [
    { value: "to-do", label: "To Do" },
    { value: "progress", label: "In Progress" },
    { value: "review", label: "Review" },
    { value: "complete", label: "Completed" },
  ];

  const timeOptions = [
    { value: "1w", label: "Tasks within 1 week" },
    { value: "2w", label: "Tasks within 2 weeks" },
    { value: "3w", label: "Tasks within 3 weeks" },
  ];

  // Toggle category selection
  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Select time filter
  const selectTime = (time: TimeFilter) => {
    setSelectedTime(time);
  };

  // Load initial tasks from localStorage
  useEffect(() => {
    const storedTasks: MyTask[] = JSON.parse(
      localStorage.getItem("myTaskList") || "[]"
    );
    setFilteredTasks(storedTasks);
  }, [setFilteredTasks]);

  // Apply filters whenever category or time changes
  useEffect(() => {
    const storedTasks: MyTask[] = JSON.parse(
      localStorage.getItem("myTaskList") || "[]"
    );

    let filtered = storedTasks;

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((task) =>
        selectedCategories.includes(task.category)
      );
    }

    // Time filter
    if (selectedTime) {
      const now = new Date();
      const weeks = parseInt(selectedTime[0]); // "1w" → 1
      const limitDate = new Date();
      limitDate.setDate(now.getDate() + weeks * 7);

      filtered = filtered?.filter((task) => {
        if (!task?.end) return false;
        const taskDate = new Date(task?.end);
        return taskDate <= limitDate;
      });
    }

    setFilteredTasks(filtered);
  }, [selectedCategories, selectedTime, setFilteredTasks]);

  return (
    <div
      className={`p-4 rounded-lg shadow-lg border-2 space-y-4 w-64 transition-colors duration-300
      ${
        darkTheme
          ? "bg-slate-800 text-gray-200 border-slate-500"
          : "bg-slate-50 text-gray-700 border-slate-300"
      }`}
    >
      {/* Category Filters */}
      <div>
        <h3 className="font-semibold mb-2">Category Filters</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.value)}
                onChange={() => toggleCategory(cat.value)}
                className={`w-4 h-4 ${
                  darkTheme ? "accent-blue-400" : "accent-blue-600"
                }`}
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Filters */}
      <div>
        <h3 className="font-semibold mb-2">Time-Based Filters</h3>
        <div className="space-y-2">
          {timeOptions.map((time) => (
            <label key={time.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="time-filter"
                checked={selectedTime === time.value}
                onChange={() => selectTime(time.value as TimeFilter)}
                className={`w-4 h-4 ${
                  darkTheme ? "accent-green-400" : "accent-green-600"
                }`}
              />
              <span>{time.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
