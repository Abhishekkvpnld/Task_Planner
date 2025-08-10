import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import Navbar from "../components/Navbar";
import TaskModal from "../components/TaskModal";
import "./style.css";
import type { MyTask, ResizeArg } from "../types/types";
import Filter from "../components/Filter";

const localizer = momentLocalizer(moment);
const DnDCalendar: any = withDragAndDrop(Calendar);

const Calender = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [myTaskList, setMyTaskList] = useState<MyTask[]>(() => {
    const stored = localStorage.getItem("myTaskList");
    if (!stored) return [];
    return JSON.parse(stored)?.map((task: MyTask) => ({
      ...task,
      start: new Date(task.start),
      end: new Date(task.end),
    }));
  });
  const [filteredTasks, setFilteredTasks] = useState<MyTask[]>(myTaskList);


  // Multi-day selection
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedDate(start);
    setSelectedEndDate(end);
    setOpenModal(true);
  };

  // Resize event (adjust start/end)
  const handleEventResize = ({ event, start, end }: ResizeArg) => {
    const updatedTasks = myTaskList?.map((task) =>
      task?.title === event?.title &&
      task?.start?.getTime() === new Date(event.start).getTime()
        ? { ...task, start, end }
        : task
    );
    setMyTaskList(updatedTasks);
  };

  // Move event (drag to new dates)
  const handleEventDrop = ({ event, start, end }: ResizeArg) => {
    const updatedTasks = myTaskList.map((task) =>
      task.title === event.title &&
      task.start.getTime() === new Date(event.start).getTime()
        ? { ...task, start, end }
        : task
    );
    setMyTaskList(updatedTasks);
  };

  // Save to localStorage whenever myTaskList changes
  useEffect(() => {
    localStorage.setItem("myTaskList", JSON.stringify(myTaskList));
  }, [myTaskList]);

  useEffect(() => {
    if (!searchInput) {
      setFilteredTasks(myTaskList);
      return;
    }

    const filtered = myTaskList.filter((task) =>
      task.title.toLowerCase().includes(searchInput.trim().toLocaleLowerCase())
    );

    setFilteredTasks(filtered);
  }, [searchInput, myTaskList]);

  return (
    <div className="flex items-center bg-slate-100 justify-center w-[100vw] flex-col">
      <Navbar />

      <Filter searchInput={searchInput} setSearchInput={setSearchInput}  setFilteredTasks={setFilteredTasks} />

      <DnDCalendar
        localizer={localizer}
        events={filteredTasks?.map((task) => ({
          ...task,
          allDay: task?.allDay ?? true,
        }))}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={["month"]}
        selectable
        resizable
        defaultDate={selectedDate}
        toolbar={true}
        style={{ height: 500, width: "95%" }}
        onSelectSlot={handleSelectSlot}
        onEventResize={handleEventResize}
        onEventDrop={handleEventDrop}
        className="shadow-md border-2 bg-white border-slate-200 rounded-md p-0.5 mb-6"
      />

      {openModal && (
        <TaskModal
          onClose={() => setOpenModal(false)}
          selectedDate={selectedDate}
          selectedEndDate={selectedEndDate}
          setMyTaskList={setMyTaskList}
        />
      )}
    </div>
  );
};

export default Calender;
