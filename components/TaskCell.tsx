
import React from 'react';
import { CheckIcon } from './Icons';

interface TaskCellProps {
  isChecked: boolean;
  onToggle: () => void;
}

export const TaskCell: React.FC<TaskCellProps> = ({ isChecked, onToggle }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 border-2
          ${
            isChecked
              ? 'bg-emerald-500 border-emerald-600 dark:bg-emerald-600 dark:border-emerald-500 text-white'
              : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-sky-400'
          }
        `}
        aria-label={isChecked ? 'Mark task as incomplete' : 'Mark task as complete'}
      >
        {isChecked && <CheckIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};
