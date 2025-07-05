
import type { Task } from './types';

export const initialTasksData: Task[] = [
  {
    id: 'task-1',
    title: 'Affirmation - Deep Programming',
    subTasks: [
      { id: 'sub-1-1', title: 'Mor.', points: 1 },
      { id: 'sub-1-2', title: 'Night', points: 1 },
    ],
  },
  {
    id: 'task-2',
    title: 'Consistent Sleep Schedule',
    subTasks: [
      { id: 'sub-2-1', title: 'Mor.', points: 1 },
      { id: 'sub-2-2', title: 'Night', points: 1 },
    ],
  },
  {
    id: 'task-3',
    title: 'Write Your Task Here',
    points: 1,
  },
  {
    id: 'task-4',
    title: 'Custom Task 1',
    points: 1,
  },
  {
    id: 'task-5',
    title: 'Custom Task 2',
    points: 1,
  },
  {
    id: 'task-6',
    title: 'Custom Task 3',
    points: 1,
  },
  {
    id: 'task-7',
    title: 'Hardcore Task for 1%',
    points: 2,
  },
];
