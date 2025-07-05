
import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { EditIcon } from './Icons';

interface TaskHeaderProps {
  task: Task;
  onUpdate: (updatedTask: Task) => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ task, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const handleSave = () => {
    if (title.trim()) {
      onUpdate({ ...task, title });
    } else {
      setTitle(task.title); // Reset if empty
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTitle(task.title);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
        className="w-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 rounded-md px-2 py-1 text-center text-xs"
      />
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="group relative cursor-pointer font-semibold"
    >
      <span>{task.title}</span>
      <EditIcon className="w-3 h-3 absolute top-1/2 -right-1 -translate-y-1/2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
