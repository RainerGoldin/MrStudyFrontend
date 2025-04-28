import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Task } from '../types';
import { 
  Plus, 
  Clock, 
  Calendar,
  CheckSquare,
  Square,
  AlertCircle,
  MoreVertical,
  ChevronDown,
  Timer,
  Play
} from 'lucide-react';

const Tasks: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    estimatedPomodoros: 1,
    status: 'todo',
  });

  const handleCreateTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description || '',
      status: newTask.status as 'todo' | 'in-progress' | 'completed',
      priority: newTask.priority as 'low' | 'medium' | 'high',
      estimatedPomodoros: newTask.estimatedPomodoros || 1,
      completedPomodoros: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    dispatch({ type: 'ADD_TASK', payload: task });
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      estimatedPomodoros: 1,
      status: 'todo',
    });
    setShowNewTaskForm(false);
  };

  const handleUpdateTaskStatus = (taskId: string, status: 'todo' | 'in-progress' | 'completed') => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, status, updatedAt: new Date() }
      });
    }
  };

  const handleStartPomodoro = (taskId: string) => {
    const task = state.tasks.find(t => t.id === taskId);
    if (task && task.status !== 'completed') {
      // Update task status to in-progress
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, status: 'in-progress', updatedAt: new Date() }
      });
      
      // Navigate to Pomodoro page
      dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'pomodoro' });
      
      // Set active task for Pomodoro
      dispatch({ type: 'SET_ACTIVE_TASK', payload: taskId });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      default:
        return 'text-green-500 dark:text-green-400';
    }
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => handleUpdateTaskStatus(task.id, task.status === 'completed' ? 'todo' : 'completed')}
            className="mt-1"
          >
            {task.status === 'completed' ? (
              <CheckSquare className="text-green-500" size={20} />
            ) : (
              <Square className="text-gray-400" size={20} />
            )}
          </button>
          <div className="flex-grow">
            <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {task.description}
              </p>
            )}
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Timer size={14} className="mr-1" />
                <span>{task.completedPomodoros}/{task.estimatedPomodoros} pomodoros</span>
              </div>
              <div className={`flex items-center ${getPriorityColor(task.priority)}`}>
                <AlertCircle size={14} className="mr-1" />
                <span className="capitalize">{task.priority}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {task.status !== 'completed' && (
            <button
              onClick={() => handleStartPomodoro(task.id)}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900 rounded-full"
              title="Start Pomodoro"
            >
              <Play size={16} />
            </button>
          )}
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
        <button
          onClick={() => setShowNewTaskForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          New Task
        </button>
      </div>

      {showNewTaskForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                rows={3}
                placeholder="Enter task description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Pomodoros
                </label>
                <input
                  type="number"
                  min="1"
                  value={newTask.estimatedPomodoros}
                  onChange={(e) => setNewTask({ ...newTask, estimatedPomodoros: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowNewTaskForm(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Todo Column */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">To Do</h2>
          {state.tasks
            .filter(task => task.status === 'todo')
            .map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>

        {/* In Progress Column */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">In Progress</h2>
          {state.tasks
            .filter(task => task.status === 'in-progress')
            .map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>

        {/* Completed Column */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Completed</h2>
          {state.tasks
            .filter(task => task.status === 'completed')
            .map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;