import { useState } from "react";
import type { FilterModalProps } from "../types/types";

type Category = "to-do" | "progress" | "review" | "complete";
type TimeFilter = "1w" | "2w" | "3w" | null;

const FilterModal = () => {
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

  //   Multiple Selection of Category
  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev?.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  //   Selected Time Limit
  const selectTime = (time: TimeFilter) => {
    setSelectedTime(time);
  };

  return (
    <div className="p-4 bg-blue-50 text-gray-700 rounded-lg shadow-lg space-y-4 w-64">
      {/* Category Filters */}
      <div>
        <h3 className="font-semibold mb-2">Category Filters</h3>
        <div className="space-y-2">
          {categories?.map((cat) => (
            <label key={cat.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategories?.includes(cat?.value)}
                onChange={() => toggleCategory(cat?.value)}
                className="w-4 h-4 accent-blue-600"
              />
              <span>{cat?.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Time Filters */}
      <div>
        <h3 className="font-semibold mb-2">Time-Based Filters</h3>
        <div className="space-y-2">
          {timeOptions?.map((time) => (
            <label key={time?.value} className="flex items-center space-x-2">
              <input
                type="radio"
                name="time-filter"
                checked={selectedTime === time?.value}
                onChange={() => selectTime(time?.value as TimeFilter)}
                className="w-4 h-4 accent-green-600"
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
