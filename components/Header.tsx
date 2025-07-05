
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 pb-2">
        30 Days Challenge
      </h1>
      <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300">
        Decide Karo Aur Kar Daalo - Hum Jeetenge
      </p>
    </header>
  );
};
