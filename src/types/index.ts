export interface StudyMaterial {
  id: string;
  title: string;
  type: 'note' | 'document' | 'other';
  folderId: string;
  createdAt: Date;
  updatedAt: Date;
  content?: string;
}

export interface Folder {
  id: string;
  name: string;
  color: string;
  parentId: string | null;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  estimatedPomodoros: number;
  completedPomodoros: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

export interface UserProgress {
  totalStudyTime: number;
  sessionsCompleted: number;
  longestStreak: number;
  currentStreak: number;
  weeklyGoal: number;
  weeklyProgress: number;
  mentalMathStats: {
    totalProblems: number;
    correctAnswers: number;
    averageTime: number;
    bestTime: number;
    currentStreak: number;
    bestStreak: number;
  };
}

export interface MentalMathProblem {
  id: string;
  question: string;
  answer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'addition' | 'subtraction' | 'multiplication' | 'division';
  timeLimit: number;
}