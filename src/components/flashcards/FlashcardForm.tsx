import React, { useState } from 'react';
import { Tag } from '../../types';
import { X, Plus } from 'lucide-react';

interface FlashcardFormProps {
  tags: Tag[];
  onSubmit: (front: string, back: string, tagIds: string[]) => void;
  initialFront?: string;
  initialBack?: string;
  initialTags?: string[];
  isEdit?: boolean;
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ 
  tags, 
  onSubmit, 
  initialFront = '', 
  initialBack = '', 
  initialTags = [],
  isEdit = false
}) => {
  const [front, setFront] = useState(initialFront);
  const [back, setBack] = useState(initialBack);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  
  const handleTagToggle = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (front.trim() && back.trim()) {
      onSubmit(front, back, selectedTags);
      if (!isEdit) {
        // Clear form if it's not in edit mode
        setFront('');
        setBack('');
        setSelectedTags([]);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        {isEdit ? 'Edit Flashcard' : 'Create New Flashcard'}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="front" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Front (Question)
          </label>
          <textarea
            id="front"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter the question or prompt"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div>
          <label htmlFor="back" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Back (Answer)
          </label>
          <textarea
            id="back"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter the answer"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            required
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleTagToggle(tag.id)}
                className={`px-3 py-1 rounded-full text-sm flex items-center ${
                  selectedTags.includes(tag.id)
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
                style={selectedTags.includes(tag.id) ? { borderColor: tag.color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: tag.color }}
                ></span>
                {tag.name}
                {selectedTags.includes(tag.id) && (
                  <X size={14} className="ml-1 cursor-pointer" />
                )}
              </button>
            ))}
            <button
              type="button"
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-sm flex items-center"
            >
              <Plus size={14} className="mr-1" />
              New Tag
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isEdit ? 'Update Flashcard' : 'Create Flashcard'}
        </button>
      </div>
    </form>
  );
};

export default FlashcardForm;