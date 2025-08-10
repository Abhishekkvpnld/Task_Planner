//====Types====
export type MyTask = {
  title: string;
  category: "to-do" | "progress" | "complete" | "review";
  start: Date;
  end: Date;
  allDay?: boolean;
};

export type ResizeArg = {
  event: MyTask;
  start: Date;
  end: Date;
};

export type TaskModalProps = {
  onClose: () => void;
  selectedDate: Date;
  setMyTaskList: React.Dispatch<React.SetStateAction<MyTask[]>>;
  selectedEndDate: Date;
};

export type FilterProps = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setFilteredTasks: React.Dispatch<React.SetStateAction<MyTask[]>>;
};

export type Category = "to-do" | "progress" | "review" | "complete";
export type TimeFilter = "1w" | "2w" | "3w" | null;

export type FilterModalProps = {
  setFilteredTasks: React.Dispatch<React.SetStateAction<MyTask[]>>;
};
