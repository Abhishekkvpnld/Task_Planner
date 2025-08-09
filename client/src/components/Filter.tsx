import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";
import FilterModal from "./FilterModal";
import type { FilterProps } from "../types/types";

const Filter: React.FC<FilterProps> = ({ searchInput, setSearchInput }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <div className="flex relative items-center justify-between w-[90%] mb-2">
      {/* Filter Button */}
      <div
        onClick={() => setShowFilterModal((prev) => !prev)}
        className="flex cursor-pointer border rounded-lg hover:scale-105 transition-all items-center p-2 justify-center gap-2"
      >
        <button className="w-full cursor-pointer transition-all font-semibold text-red-700">
          Filter
        </button>
        <CiFilter
          size={25}
          color="red"
          className="hover:scale-110 transition-all"
        />
      </div>

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
          <FilterModal />
        </div>
      )}
    </div>
  );
};

export default Filter;
