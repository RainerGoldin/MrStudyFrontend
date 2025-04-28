import React from 'react';

interface ProgressChartProps {
  data: {
    day: string;
    minutes: number;
  }[];
  weeklyGoal: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data, weeklyGoal }) => {
  const maxValue = Math.max(...data.map(item => item.minutes), weeklyGoal / 7);
  const calculateHeight = (value: number) => {
    return value > 0 ? Math.max(15, (value / maxValue) * 150) : 0;
  };
  
  const dailyGoal = weeklyGoal / 7;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Weekly Study Progress</h3>
      
      <div className="flex items-end justify-between h-44 mb-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-12 flex justify-center">
              <div
                className="absolute w-8 border-t-2 border-dashed border-orange-400 dark:border-orange-500"
                style={{ top: `${150 - calculateHeight(dailyGoal)}px` }}
              ></div>
              <div 
                className={`w-8 rounded-t-md ${
                  item.minutes >= dailyGoal 
                    ? 'bg-blue-500 dark:bg-blue-600'
                    : 'bg-blue-300 dark:bg-blue-400'
                }`}
                style={{ height: `${calculateHeight(item.minutes)}px` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">
              {item.day}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Study time</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-0 border-t-2 border-dashed border-orange-400 mr-2"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Daily goal ({Math.round(dailyGoal)} min)</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;