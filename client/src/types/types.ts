
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