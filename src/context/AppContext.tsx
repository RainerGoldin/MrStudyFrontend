import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { 
  StudyMaterial, 
  Folder, 
  Task, 
  PomodoroSettings, 
  UserProgress 
} from '../types';
import { mockFolders, mockStudyMaterials } from '../data/mockData';

interface AppState {
  studyMaterials: StudyMaterial[];
  folders: Folder[];
  tasks: Task[];
  activeTaskId: string | null;
  pomodoroSettings: PomodoroSettings;
  userProgress: UserProgress;
  darkMode: boolean;
  activePage: string;
}

type AppAction =
  | { type: 'SET_ACTIVE_PAGE'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_FOLDER'; payload: Folder }
  | { type: 'DELETE_FOLDER'; payload: string }
  | { type: 'ADD_STUDY_MATERIAL'; payload: StudyMaterial }
  | { type: 'UPDATE_STUDY_MATERIAL'; payload: StudyMaterial }
  | { type: 'DELETE_STUDY_MATERIAL'; payload: string }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_ACTIVE_TASK'; payload: string | null }
  | { type: 'UPDATE_POMODORO_SETTINGS'; payload: PomodoroSettings }
  | { type: 'UPDATE_USER_PROGRESS'; payload: Partial<UserProgress> };

const initialState: AppState = {
  studyMaterials: mockStudyMaterials,
  folders: mockFolders,
  tasks: [],
  activeTaskId: null,
  pomodoroSettings: {
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4
  },
  userProgress: {
    totalStudyTime: 0,
    sessionsCompleted: 0,
    longestStreak: 0,
    currentStreak: 0,
    weeklyGoal: 600, // 10 hours
    weeklyProgress: 0,
    mentalMathStats: {
      totalProblems: 0,
      correctAnswers: 0,
      averageTime: 0,
      bestTime: 0,
      currentStreak: 0,
      bestStreak: 0
    }
  },
  darkMode: false,
  activePage: 'dashboard'
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => null
});

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_ACTIVE_PAGE':
      return { ...state, activePage: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'ADD_FOLDER':
      return { ...state, folders: [...state.folders, action.payload] };
    case 'DELETE_FOLDER':
      return { 
        ...state, 
        folders: state.folders.filter(folder => folder.id !== action.payload)
      };
    case 'ADD_STUDY_MATERIAL':
      return { 
        ...state, 
        studyMaterials: [...state.studyMaterials, action.payload] 
      };
    case 'UPDATE_STUDY_MATERIAL':
      return { 
        ...state, 
        studyMaterials: state.studyMaterials.map(material => 
          material.id === action.payload.id ? action.payload : material
        ) 
      };
    case 'DELETE_STUDY_MATERIAL':
      return { 
        ...state, 
        studyMaterials: state.studyMaterials.filter(material => material.id !== action.payload)
      };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { 
        ...state, 
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ) 
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case 'SET_ACTIVE_TASK':
      return { ...state, activeTaskId: action.payload };
    case 'UPDATE_POMODORO_SETTINGS':
      return { ...state, pomodoroSettings: action.payload };
    case 'UPDATE_USER_PROGRESS':
      return { 
        ...state, 
        userProgress: { ...state.userProgress, ...action.payload } 
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);