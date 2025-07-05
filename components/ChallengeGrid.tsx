import React from 'react';
import type { Task, GridState, SubTask } from '../types';
import { TaskHeader } from './TaskHeader';
import { TaskCell } from './TaskCell';

interface ChallengeGridProps {
  tasks: Task[];
  gridState: GridState;
  onTaskUpdate: (updatedTask: Task) => void;
  onToggleCell: (dayIndex: number, taskOrSubTaskId: string) => void;
}

export const ChallengeGrid: React.FC<ChallengeGridProps> = ({
  tasks,
  gridState,
  onTaskUpdate,
  onToggleCell,
}) => {
  const allSubTaskColumns: (Task | SubTask)[] = tasks.flatMap(task => (task.subTasks && task.subTasks.length > 0) ? task.subTasks : [task]);

  const totalPoints = tasks.reduce((acc, task) => {
    if (task.subTasks) {
      return acc + task.subTasks.reduce((subAcc, sub) => subAcc + sub.points, 0);
    }
    return acc + (task.points || 0);
  }, 0);

  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full border-collapse text-center table-fixed">
        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase">
          <tr>
            <th className="sticky left-0 bg-white dark:bg-slate-800/50 p-2 w-24 z-10 font-semibold border-b border-r border-slate-200 dark:border-slate-700">Tasks</th>
            {tasks.map(task => (
              <th
                key={task.id}
                colSpan={task.subTasks?.length || 1}
                className="p-2 border-b border-slate-200 dark:border-slate-700"
              >
                <TaskHeader task={task} onUpdate={onTaskUpdate} />
              </th>
            ))}
            <th className="p-2 w-24 font-semibold border-b border-slate-200 dark:border-slate-700">Total Score</th>
          </tr>
          <tr>
            <th className="sticky left-0 bg-white dark:bg-slate-800/50 p-2 font-semibold border-b border-r border-slate-200 dark:border-slate-700">Date</th>
            {tasks.map(task =>
              (task.subTasks && task.subTasks.length > 0) ? (
                task.subTasks.map(subTask => (
                  <th key={subTask.id} className="p-2 font-normal border-b border-slate-200 dark:border-slate-700">
                    {subTask.title} ({subTask.points}p)
                  </th>
                ))
              ) : (
                <th key={task.id} className="p-2 font-normal border-b border-slate-200 dark:border-slate-700">
                  ({task.points || 0}p)
                </th>
              )
            )}
            <th className="p-2 font-normal border-b border-slate-200 dark:border-slate-700">({totalPoints}p)</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 30 }, (_, i) => {
            const dayIndex = i;
            const day = i + 1;
            const dailyTotal = allSubTaskColumns.reduce((sum, col) => {
                const isChecked = gridState[dayIndex]?.[col.id] || false;
                return sum + (isChecked ? (col.points || 0) : 0);
            }, 0);

            return (
              <tr key={day} className="text-sm even:bg-slate-50 dark:even:bg-slate-800/20">
                <td className="sticky left-0 bg-white dark:bg-slate-800/50 even:bg-slate-50 dark:even:bg-slate-800/20 p-2 font-medium border-b border-r border-slate-200 dark:border-slate-700 z-10">Day {day}</td>
                {tasks.map(task =>
                  (task.subTasks && task.subTasks.length > 0) ? (
                    task.subTasks.map(subTask => (
                      <td key={subTask.id} className="p-2 border-b border-slate-200 dark:border-slate-700">
                        <TaskCell
                          isChecked={gridState[dayIndex]?.[subTask.id] || false}
                          onToggle={() => onToggleCell(dayIndex, subTask.id)}
                        />
                      </td>
                    ))
                  ) : (
                    <td key={task.id} className="p-2 border-b border-slate-200 dark:border-slate-700">
                       <TaskCell
                          isChecked={gridState[dayIndex]?.[task.id] || false}
                          onToggle={() => onToggleCell(dayIndex, task.id)}
                        />
                    </td>
                  )
                )}
                <td className="p-2 font-bold text-sky-600 dark:text-sky-400 border-b border-slate-200 dark:border-slate-700">{dailyTotal}p</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};