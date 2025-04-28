import React from 'react';
import { FileText, Book, MoreVertical } from 'lucide-react';
import { StudyMaterial } from '../../types';

interface RecentMaterialsProps {
  materials: StudyMaterial[];
}

const RecentMaterials: React.FC<RecentMaterialsProps> = ({ materials }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'note':
        return <FileText size={16} />;
      case 'flashcard':
        return <Book size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Materials</h3>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline">
          View all
        </button>
      </div>
      
      <div className="space-y-3">
        {materials.map((material) => (
          <div 
            key={material.id} 
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                {getIcon(material.type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{material.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Updated {formatDate(material.updatedAt)}
                </p>
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded focus:outline-none">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMaterials;