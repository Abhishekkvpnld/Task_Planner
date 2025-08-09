import toast from "react-hot-toast";
import { useChangeTheme } from "../context/ThemeContext";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";


const Navbar = () => {
  const { darkTheme, setDarkTheme } = useChangeTheme();

  const handleThemeChange = () => {
    setDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      toast.success(newTheme ? "Dark Mode" : "Light Mode");
      return newTheme;
    });
  };

  return (
    <div className="relative shadow-2xl mt-2 px-4 py-2 flex items-center justify-between rounded-full w-[95%] mb-5 bg-violet-600">
      {/* Logo/Title */}
      <div className="flex items-center gap-1">
        <img
          src="/task_icon.png"
          className="cursor-pointer bg-white w-10 h-10 rounded-full shadow-md text-blue-500 font-medium hover:text-white hover:font-semibold hover:scale-110 transition transform duration-300"
        />
        <h1 className="text-white font-bold">Task Planner</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 relative">
        <div
          onClick={handleThemeChange}
          className={`border-2 rounded-full p-0.5 w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-110 transition bg-gray-200 hover:bg-white border-white`}
        >
          {darkTheme ? <MdDarkMode color="black" /> : <MdOutlineDarkMode />}
        </div>

        <div className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 font-bold rounded-full cursor-pointer hover:scale-110 transition">
          AB
        </div>
      </div>
    </div>
  );
};

export default Navbar;
