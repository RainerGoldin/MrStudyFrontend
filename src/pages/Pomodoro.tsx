import React from 'react';
import { useAppContext } from '../context/AppContext';
import PomodoroTimer from '../components/pomodoro/PomodoroTimer';

const Pomodoro: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handleUpdateSettings = (settings) => {
    dispatch({ type: 'UPDATE_POMODORO_SETTINGS', payload: settings });
  };
  
  const handleSessionComplete = () => {
    // Update user progress when a pomodoro session completes
    const updatedProgress = {
      totalStudyTime: state.userProgress.totalStudyTime + state.pomodoroSettings.workDuration,
      sessionsCompleted: state.userProgress.sessionsCompleted + 1,
    };
    
    dispatch({ type: 'UPDATE_USER_PROGRESS', payload: updatedProgress });
  };
  
  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pomodoro Timer</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Use the Pomodoro Technique to boost your productivity with focused work sessions and regular breaks.
        </p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <PomodoroTimer 
          settings={state.pomodoroSettings}
          onSessionComplete={handleSessionComplete}
          onUpdateSettings={handleUpdateSettings}
        />
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">How to Use the Pomodoro Technique</h2>
          
          <ol className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                1
              </div>
              <div>
                <p className="font-medium">Choose a task to work on</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Select a task that requires your full attention.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                2
              </div>
              <div>
                <p className="font-medium">Start the timer</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Work focused on your task until the timer rings. No distractions!
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                3
              </div>
              <div>
                <p className="font-medium">Take a short break</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  When the timer rings, take a short break to relax and refresh.
                </p>
              </div>
            </li>
            <li className="flex">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 mr-3">
                4
              </div>
              <div>
                <p className="font-medium">Repeat</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  After 4 cycles, take a longer break to recharge.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;