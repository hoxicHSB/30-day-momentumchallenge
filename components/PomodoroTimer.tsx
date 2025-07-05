
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PlayIcon, PauseIcon, ResetIcon } from './Icons';

const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 15;

type Mode = 'work' | 'shortBreak' | 'longBreak';

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<Mode>('work');
  const [minutes, setMinutes] = useState(WORK_MINUTES);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const switchMode = useCallback(() => {
    let nextMode: Mode;
    let nextMinutes: number;
    
    if (mode === 'work') {
      const newPomodoros = pomodoros + 1;
      setPomodoros(newPomodoros);
      nextMode = newPomodoros % 4 === 0 ? 'longBreak' : 'shortBreak';
      nextMinutes = nextMode === 'longBreak' ? LONG_BREAK_MINUTES : SHORT_BREAK_MINUTES;
    } else {
      nextMode = 'work';
      nextMinutes = WORK_MINUTES;
    }
    
    setMode(nextMode);
    setMinutes(nextMinutes);
    setSeconds(0);
  }, [mode, pomodoros]);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(s => s - 1);
        } else if (minutes > 0) {
          setMinutes(m => m - 1);
          setSeconds(59);
        } else {
          if(audioRef.current) {
            audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
          }
          switchMode();
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    
    return () => {
        if(interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, switchMode]);
  
  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
  }, [])

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(WORK_MINUTES);
    setSeconds(0);
    setPomodoros(0);
  };
  
  const selectMode = (newMode: Mode) => {
    setIsActive(false);
    setMode(newMode);
    switch(newMode) {
      case 'work': setMinutes(WORK_MINUTES); break;
      case 'shortBreak': setMinutes(SHORT_BREAK_MINUTES); break;
      case 'longBreak': setMinutes(LONG_BREAK_MINUTES); break;
    }
    setSeconds(0);
  }

  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  const modeStyles = {
    work: "bg-red-500/10 text-red-500",
    shortBreak: "bg-sky-500/10 text-sky-500",
    longBreak: "bg-emerald-500/10 text-emerald-500"
  };
  
  const buttonStyles = {
    work: "bg-red-500 hover:bg-red-600",
    shortBreak: "bg-sky-500 hover:bg-sky-600",
    longBreak: "bg-emerald-500 hover:bg-emerald-600"
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 ring-1 ring-slate-200 dark:ring-slate-700">
        <div className="flex justify-center space-x-2 mb-6">
            <button onClick={() => selectMode('work')} className={`px-4 py-1 rounded-full text-sm font-semibold ${mode === 'work' ? modeStyles.work : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>Work</button>
            <button onClick={() => selectMode('shortBreak')} className={`px-4 py-1 rounded-full text-sm font-semibold ${mode === 'shortBreak' ? modeStyles.shortBreak : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>Short Break</button>
            <button onClick={() => selectMode('longBreak')} className={`px-4 py-1 rounded-full text-sm font-semibold ${mode === 'longBreak' ? modeStyles.longBreak : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>Long Break</button>
        </div>
      <div className="text-center">
        <p className={`font-roboto-mono text-6xl md:text-7xl font-bold ${modeStyles[mode]}`}>{time}</p>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Pomodoros completed: {pomodoros}</p>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button onClick={resetTimer} className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
          <ResetIcon className="w-8 h-8"/>
        </button>
        <button onClick={toggleTimer} className={`text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 ${buttonStyles[mode]}`}>
          {isActive ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
        </button>
        <div className="w-8 h-8"></div>
      </div>
    </div>
  );
};
