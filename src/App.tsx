import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import StudyMaterials from './pages/StudyMaterials';
import Pomodoro from './pages/Pomodoro';
import Tasks from './pages/Tasks';
import MentalMath from './pages/MentalMath';

const MainApp: React.FC = () => {
  const { state } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [state.darkMode]);
  
  const renderActivePage = () => {
    switch (state.activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'materials':
        return <StudyMaterials />;
      case 'pomodoro':
        return <Pomodoro />;
      case 'tasks':
        return <Tasks />;
      case 'mental-math':
        return <MentalMath />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex h-screen overflow-hidden">
        <div className={`md:block transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'block w-64' : 'hidden w-0 md:w-16'
        }`}>
          <Sidebar />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {renderActivePage()}
          </main>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;