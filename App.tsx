
import React, { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Task, GridState } from './types';
import { ChallengeGrid } from './components/ChallengeGrid';
import { PomodoroTimer } from './components/PomodoroTimer';
import { Scoreboard } from './components/Scoreboard';
import { Header } from './components/Header';
import { initialTasksData } from './constants';

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasksData);
  const [gridState, setGridState] = useLocalStorage<GridState>('gridState', {});

  const handleTaskUpdate = useCallback((updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, [setTasks]);

  const handleToggleCell = useCallback((dayIndex: number, taskOrSubTaskId: string) => {
    setGridState(prev => {
      const newGridState = { ...prev };
      if (!newGridState[dayIndex]) {
        newGridState[dayIndex] = {};
      }
      newGridState[dayIndex][taskOrSubTaskId] = !newGridState[dayIndex][taskOrSubTaskId];
      return newGridState;
    });
  }, [setGridState]);
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-1 sm:p-2 ring-1 ring-slate-200 dark:ring-slate-700">
            <ChallengeGrid
              tasks={tasks}
              gridState={gridState}
              onTaskUpdate={handleTaskUpdate}
              onToggleCell={handleToggleCell}
            />
          </div>
          <div className="space-y-8">
            <Scoreboard tasks={tasks} gridState={gridState} />
            <PomodoroTimer />
          </div>
        </main>
        <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm">
          <p>For Daily Updates on this challenge join @HumJeetenge on Instagram</p>
          <p className="mt-1">Reimagined as a web app with ❤️</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
