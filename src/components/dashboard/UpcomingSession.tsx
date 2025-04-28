import React from 'react';
import { Clock, Calendar } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  startTime: Date;
  duration: number;
}

interface UpcomingSessionProps {
  sessions: Session[];
}

const UpcomingSession: React.FC<UpcomingSessionProps> = ({ sessions }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Study Sessions</h3>
      
      {sessions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No upcoming sessions</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Schedule a Session
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div 
              key={session.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-white">{session.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isToday(session.startTime) 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                }`}>
                  {isToday(session.startTime) ? 'Today' : formatDate(session.startTime)}
                </span>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={16} className="mr-1" />
                <span>{formatTime(session.startTime)}</span>
                <span className="mx-2">•</span>
                <span>{session.duration} minutes</span>
              </div>
            </div>
          ))}
          
          <button className="w-full mt-2 px-4 py-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            View all sessions
          </button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSession;