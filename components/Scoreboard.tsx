import React, { useMemo } from 'react';
import type { Task, GridState, SubTask } from '../types';
import { TrophyIcon } from './Icons';

interface ScoreboardProps {
  tasks: Task[];
  gridState: GridState;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ tasks, gridState }) => {
  const totalScore = useMemo(() => {
    let score = 0;
    const allTaskParts: (Task | SubTask)[] = tasks.flatMap(task => (task.subTasks && task.subTasks.length > 0) ? task.subTasks : [task]);
    
    for (const dayIndex in gridState) {
      for (const taskOrSubTaskId in gridState[dayIndex]) {
        if (gridState[dayIndex][taskOrSubTaskId]) {
          const taskPart = allTaskParts.find(p => p.id === taskOrSubTaskId);
          if (taskPart) {
            score += taskPart.points || 0;
          }
        }
      }
    }
    return score;
  }, [tasks, gridState]);

  return (
    <div className="bg-gradient-to-br from-sky-400 to-cyan-500 dark:from-sky-500 dark:to-cyan-600 text-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-sky-100">Total Score</h2>
        <p className="text-5xl font-bold font-roboto-mono tracking-tight">{totalScore}</p>
      </div>
      <TrophyIcon className="w-16 h-16 text-sky-200 opacity-50" />
    </div>
  );
};