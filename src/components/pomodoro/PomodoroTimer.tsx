import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from 'lucide-react';
import { PomodoroSettings } from '../../types';

interface PomodoroTimerProps {
  settings: PomodoroSettings;
  onSessionComplete: () => void;
  onUpdateSettings: (settings: PomodoroSettings) => void;
}

type TimerState = 'work' | 'shortBreak' | 'longBreak';

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ 
  settings, 
  onSessionComplete,
  onUpdateSettings
}) => {
  const [timerState, setTimerState] = useState<TimerState>('work');
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  // Form state for settings
  const [workDuration, setWorkDuration] = useState(settings.workDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(settings.shortBreakDuration);
  const [longBreakDuration, setLongBreakDuration] = useState(settings.longBreakDuration);
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(settings.sessionsBeforeLongBreak);

  // Reset timer when settings change
  useEffect(() => {
    resetTimer();
  }, [settings]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleTimerComplete();
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    const newSessionsCompleted = timerState === 'work' ? sessionsCompleted + 1 : sessionsCompleted;
    setSessionsCompleted(newSessionsCompleted);
    
    if (timerState === 'work') {
      onSessionComplete();
      
      // Determine if it's time for a long break
      if (newSessionsCompleted % settings.sessionsBeforeLongBreak === 0) {
        setTimerState('longBreak');
        setTimeLeft(settings.longBreakDuration * 60);
      } else {
        setTimerState('shortBreak');
        setTimeLeft(settings.shortBreakDuration * 60);
      }
    } else {
      // After a break, go back to work
      setTimerState('work');
      setTimeLeft(settings.workDuration * 60);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    
    if (timerState === 'work') {
      setTimeLeft(settings.workDuration * 60);
    } else if (timerState === 'shortBreak') {
      setTimeLeft(settings.shortBreakDuration * 60);
    } else {
      setTimeLeft(settings.longBreakDuration * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStateColor = () => {
    switch (timerState) {
      case 'work':
        return 'bg-blue-600 dark:bg-blue-700';
      case 'shortBreak':
        return 'bg-green-600 dark:bg-green-700';
      case 'longBreak':
        return 'bg-purple-600 dark:bg-purple-700';
    }
  };

  const getProgress = () => {
    let total;
    
    switch (timerState) {
      case 'work':
        total = settings.workDuration * 60;
        break;
      case 'shortBreak':
        total = settings.shortBreakDuration * 60;
        break;
      case 'longBreak':
        total = settings.longBreakDuration * 60;
        break;
    }
    
    return ((total - timeLeft) / total) * 100;
  };

  const handleSaveSettings = () => {
    onUpdateSettings({
      workDuration,
      shortBreakDuration,
      longBreakDuration,
      sessionsBeforeLongBreak
    });
    setShowSettings(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pomodoro Timer</h2>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <SettingsIcon size={20} />
        </button>
      </div>
      
      {showSettings ? (
        <div className="animate-fade-in">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Timer Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={workDuration}
                onChange={(e) => setWorkDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Short Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={shortBreakDuration}
                onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Long Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={longBreakDuration}
                onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sessions Before Long Break
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={sessionsBeforeLongBreak}
                onChange={(e) => setSessionsBeforeLongBreak(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="tab-container inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 mb-8">
            <button
              onClick={() => {
                setTimerState('work');
                setTimeLeft(settings.workDuration * 60);
                setIsActive(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timerState === 'work' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => {
                setTimerState('shortBreak');
                setTimeLeft(settings.shortBreakDuration * 60);
                setIsActive(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timerState === 'shortBreak' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => {
                setTimerState('longBreak');
                setTimeLeft(settings.longBreakDuration * 60);
                setIsActive(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                timerState === 'longBreak' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Long Break
            </button>
          </div>
          
          <div className="relative mx-auto w-64 h-64 mb-8">
            <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 dark:text-gray-700 stroke-current"
                strokeWidth="4"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
              />
              <circle
                className={`${getStateColor()} stroke-current transition-all duration-300 ease-in-out`}
                strokeWidth="4"
                strokeLinecap="round"
                fill="transparent"
                r="48"
                cx="50"
                cy="50"
                strokeDasharray="301.59"
                strokeDashoffset={301.59 - (getProgress() * 301.59) / 100}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 capitalize">
                  {timerState.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className={`p-4 rounded-full ${
                isActive 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' 
                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
              } hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isActive ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-4 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <RotateCcw size={24} />
            </button>
          </div>
          
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Sessions completed today: <span className="font-medium">{sessionsCompleted}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;