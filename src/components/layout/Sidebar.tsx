import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Book, 
  Clock, 
  CheckSquare,
  FileText, 
  Brain,
  Settings
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
  count?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, onClick, count }) => {
  return (
    <div 
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        active ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className="flex-grow">{text}</span>
      {count !== undefined && (
        <span className="px-2 py-1 text-xs rounded-full bg-gray-200 dark:bg-gray-700">
          {count}
        </span>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();
  
  const handlePageChange = (page: string) => {
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page });
  };

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-4">
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
          <Book className="mr-2" /> MrStudy
        </h1>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-1">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            text="Dashboard" 
            active={state.activePage === 'dashboard'}
            onClick={() => handlePageChange('dashboard')}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            text="Study Materials" 
            active={state.activePage === 'materials'}
            onClick={() => handlePageChange('materials')}
            count={state.studyMaterials.length}
          />
          <SidebarItem 
            icon={<Clock size={20} />} 
            text="Pomodoro Timer" 
            active={state.activePage === 'pomodoro'}
            onClick={() => handlePageChange('pomodoro')}
          />
          <SidebarItem 
            icon={<CheckSquare size={20} />} 
            text="Tasks" 
            active={state.activePage === 'tasks'}
            onClick={() => handlePageChange('tasks')}
            count={state.tasks?.length || 0}
          />
          <SidebarItem 
            icon={<Brain size={20} />} 
            text="Mental Math" 
            active={state.activePage === 'mental-math'}
            onClick={() => handlePageChange('mental-math')}
          />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <SidebarItem 
          icon={<Settings size={20} />} 
          text="Settings" 
          active={state.activePage === 'settings'}
          onClick={() => handlePageChange('settings')}
        />
      </div>
    </aside>
  );
};

export default Sidebar;