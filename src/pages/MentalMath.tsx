import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { Brain, Timer, TrendingUp, Award } from 'lucide-react';

const MentalMath: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [currentProblem, setCurrentProblem] = useState<{
    question: string;
    answer: number;
    startTime: number;
  } | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    time: number;
  } | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  const generateProblem = useCallback(() => {
    let num1: number, num2: number, operation: string;
    
    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operation = ['+', '-'][Math.floor(Math.random() * 2)];
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 10;
        num2 = Math.floor(Math.random() * 50) + 10;
        operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 20;
        num2 = Math.floor(Math.random() * 100) + 20;
        operation = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
        if (operation === '/') {
          // Ensure clean division
          num2 = Math.floor(Math.random() * 10) + 1;
          num1 = num2 * (Math.floor(Math.random() * 10) + 1);
        }
        break;
    }

    let answer: number;
    switch (operation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        answer = num1 / num2;
        break;
      default:
        answer = num1 + num2;
    }

    setCurrentProblem({
      question: `${num1} ${operation} ${num2} = ?`,
      answer,
      startTime: Date.now()
    });
    setUserAnswer('');
    setFeedback(null);
  }, [difficulty]);

  useEffect(() => {
    if (!currentProblem) {
      generateProblem();
    }
  }, [currentProblem, generateProblem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProblem) return;

    const timeTaken = (Date.now() - currentProblem.startTime) / 1000;
    const isCorrect = Number(userAnswer) === currentProblem.answer;

    setFeedback({ correct: isCorrect, time: timeTaken });

    // Update stats
    const stats = state.userProgress.mentalMathStats;
    const newStats = {
      totalProblems: stats.totalProblems + 1,
      correctAnswers: stats.correctAnswers + (isCorrect ? 1 : 0),
      averageTime: (stats.averageTime * stats.totalProblems + timeTaken) / (stats.totalProblems + 1),
      bestTime: timeTaken < stats.bestTime || stats.bestTime === 0 ? timeTaken : stats.bestTime,
      currentStreak: isCorrect ? stats.currentStreak + 1 : 0,
      bestStreak: isCorrect ? 
        Math.max(stats.bestStreak, stats.currentStreak + 1) : 
        stats.bestStreak
    };

    dispatch({
      type: 'UPDATE_USER_PROGRESS',
      payload: {
        ...state.userProgress,
        mentalMathStats: newStats
      }
    });

    // Generate new problem after a short delay
    setTimeout(() => {
      generateProblem();
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mental Math Training</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Improve your mental calculation speed and accuracy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Accuracy</h3>
            <Brain className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {state.userProgress.mentalMathStats.totalProblems > 0
              ? `${Math.round((state.userProgress.mentalMathStats.correctAnswers / state.userProgress.mentalMathStats.totalProblems) * 100)}%`
              : '0%'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Time</h3>
            <Timer className="text-purple-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {state.userProgress.mentalMathStats.averageTime.toFixed(1)}s
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</h3>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {state.userProgress.mentalMathStats.currentStreak}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Streak</h3>
            <Award className="text-yellow-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {state.userProgress.mentalMathStats.bestStreak}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="space-x-2">
              {(['easy', 'medium', 'hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    difficulty === level
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {currentProblem && (
            <div className="text-center">
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {currentProblem.question}
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="w-40 text-center text-2xl px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your answer"
                  autoFocus
                />
                <button
                  type="submit"
                  className="block mx-auto mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Check Answer
                </button>
              </form>
            </div>
          )}

          {feedback && (
            <div className={`mt-6 text-center ${
              feedback.correct 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              <p className="text-xl font-medium">
                {feedback.correct ? 'Correct!' : 'Incorrect'}
              </p>
              <p className="text-sm mt-1">
                Time: {feedback.time.toFixed(1)} seconds
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentalMath;