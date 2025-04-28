import React from 'react';
import { useAppContext } from '../context/AppContext';
import StatCard from '../components/dashboard/StatCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import UpcomingSession from '../components/dashboard/UpcomingSession';
import RecentMaterials from '../components/dashboard/RecentMaterials';
import { Clock, Calendar, BookOpen, Brain } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  
  // Weekly study data (mock data)
  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 90 },
    { day: 'Wed', minutes: 60 },
    { day: 'Thu', minutes: 30 },
    { day: 'Fri', minutes: 120 },
    { day: 'Sat', minutes: 75 },
    { day: 'Sun', minutes: 0 },
  ];
  
  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      title: 'Mathematics Review',
      startTime: new Date(new Date().setHours(new Date().getHours() + 2)),
      duration: 45
    },
    {
      id: '2',
      title: 'Physics Problem Solving',
      startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
      duration: 60
    }
  ];
  
  // Get sorted study materials (most recent first)
  const sortedMaterials = [...state.studyMaterials].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  ).slice(0, 3);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your progress and plan your study sessions.
        </p>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Study Time" 
          value={`${state.userProgress.totalStudyTime} mins`}
          icon={<Clock size={20} className="text-blue-500" />}
          trend={{ value: 12, positive: true }}
          color="bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300"
        />
        <StatCard 
          title="Sessions Completed" 
          value={state.userProgress.sessionsCompleted}
          icon={<Calendar size={20} className="text-purple-500" />}
          trend={{ value: 5, positive: true }}
          color="bg-purple-100 text-purple-500 dark:bg-purple-900 dark:text-purple-300"
        />
        <StatCard 
          title="Study Materials" 
          value={state.studyMaterials.length}
          icon={<BookOpen size={20} className="text-teal-500" />}
          trend={{ value: 2, positive: true }}
          color="bg-teal-100 text-teal-500 dark:bg-teal-900 dark:text-teal-300"
        />
        <StatCard 
          title="Current Streak" 
          value={`${state.userProgress.currentStreak} days`}
          icon={<Brain size={20} className="text-orange-500" />}
          trend={{ value: 0, positive: true }}
          color="bg-orange-100 text-orange-500 dark:bg-orange-900 dark:text-orange-300"
        />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProgressChart 
            data={weeklyData} 
            weeklyGoal={state.userProgress.weeklyGoal} 
          />
        </div>
        <div>
          <UpcomingSession sessions={upcomingSessions} />
        </div>
        <div className="lg:col-span-3">
          <RecentMaterials materials={sortedMaterials} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;