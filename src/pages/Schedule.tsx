import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';

const Schedule: React.FC = () => {
  const { state } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  
  // Get days of the week for header
  const getDaysOfWeek = () => {
    const days = [];
    const day = new Date(currentDate);
    day.setDate(day.getDate() - day.getDay()); // Start with Sunday
    
    for (let i = 0; i < 7; i++) {
      days.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    
    return days;
  };
  
  // Days of the week
  const daysOfWeek = getDaysOfWeek();
  
  // Format day
  const formatDay = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short' });
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return date.getDate().toString();
  };
  
  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  // Navigate to previous/next week
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Mock study sessions for the week
  const studySessions = [
    {
      id: '1',
      title: 'Mathematics Review',
      day: new Date(),
      startTime: '14:00',
      endTime: '15:30',
      color: '#2563EB'
    },
    {
      id: '2',
      title: 'Physics Problem Solving',
      day: new Date(),
      startTime: '16:00',
      endTime: '17:00',
      color: '#7C3AED'
    },
    {
      id: '3',
      title: 'Computer Science Reading',
      day: daysOfWeek[2],
      startTime: '10:00',
      endTime: '11:30',
      color: '#14B8A6'
    }
  ];
  
  // Determine if a session should be shown for a given day
  const getSessionsForDay = (day: Date) => {
    return studySessions.filter(session => 
      session.day.getDate() === day.getDate() &&
      session.day.getMonth() === day.getMonth() &&
      session.day.getFullYear() === day.getFullYear()
    );
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Schedule</h1>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Study Session
        </button>
      </div>
      
      {/* Calendar controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button 
            onClick={navigatePrevious}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })}
          </h2>
          <button 
            onClick={navigateNext}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              view === 'week' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              view === 'month' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Weekly calendar */}
      {view === 'week' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          {/* Calendar header */}
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {daysOfWeek.map((day, index) => (
              <div 
                key={index} 
                className="py-3 px-2 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0"
              >
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  {formatDay(day)}
                </div>
                <div className={`text-sm font-semibold mt-1 ${
                  isToday(day) 
                    ? 'bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {formatDate(day)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Calendar body - Simple view with just the sessions */}
          <div className="grid grid-cols-7 h-96 overflow-y-auto">
            {daysOfWeek.map((day, dayIndex) => (
              <div 
                key={dayIndex} 
                className="border-r border-gray-200 dark:border-gray-700 last:border-r-0 min-h-full"
              >
                <div className="p-2 space-y-2">
                  {getSessionsForDay(day).map((session) => (
                    <div 
                      key={session.id} 
                      className="p-2 rounded-lg text-white text-sm cursor-pointer"
                      style={{ backgroundColor: session.color }}
                    >
                      <div className="font-medium">{session.title}</div>
                      <div className="text-xs mt-1 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {session.startTime} - {session.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Monthly calendar (simplified placeholder) */}
      {view === 'month' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            Month view will be implemented in the next update.
          </div>
        </div>
      )}
      
      {/* Upcoming sessions */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Study Sessions</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-gray-700">
          {studySessions.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No upcoming study sessions. Create your first session.
            </div>
          ) : (
            studySessions.map((session) => (
              <div key={session.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{session.title}</h3>
                    <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-1" />
                      {session.day.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      {session.startTime} - {session.endTime}
                    </div>
                  </div>
                  <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;