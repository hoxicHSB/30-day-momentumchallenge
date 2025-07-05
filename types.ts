
export interface SubTask {
  id: string;
  title: string;
  points: number;
}

export interface Task {
  id: string;
  title: string;
  subTasks?: SubTask[];
  points?: number; 
}

export type GridState = {
  [dayIndex: number]: {
    [taskOrSubTaskId: string]: boolean;
  };
};
