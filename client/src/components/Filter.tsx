import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import FilterModal from "./FilterModal";
import type { FilterProps } from "../types/types";

const Filter: React.FC<FilterProps> = ({
  searchInput,
  setSearchInput,
  setFilteredTasks,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="flex relative items-center justify-between w-[90%] mb-2">
      {/* Filter Button */}
      <button
        type="button"
        onClick={() => setShowFilterModal((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border border-red-500 rounded-lg text-red-600 font-semibold 
             bg-white hover:bg-red-600 hover:shadow-md transition-all hover:text-white duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <span>Filter</span>
        <CiFilter size={20} />
      </button>

      {/* Search Section */}
      <div className="flex items-center justify-between border p-1 rounded-lg">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search Tasks..."
          className="py-1 px-2 outline-none"
        />
        <BiSearch size={20} className="cursor-pointer" />
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="absolute top-full left-0 mt-2 z-10">
          <FilterModal setFilteredTasks={setFilteredTasks} />
        </div>
      )}
    </div>
  );
};

export default Filter;
