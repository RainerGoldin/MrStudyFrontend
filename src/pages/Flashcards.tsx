import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import FlashcardStudy from '../components/flashcards/FlashcardStudy';
import FlashcardForm from '../components/flashcards/FlashcardForm';
import { Book, Plus, Search } from 'lucide-react';

const Flashcards: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [mode, setMode] = useState<'list' | 'create' | 'study'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  
  // Filter flashcards based on search and tag filter
  const filteredFlashcards = state.flashCards.filter(card => {
    const matchesSearch = 
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.back.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTagFilter === null || card.tags.includes(selectedTagFilter);
    return matchesSearch && matchesTag;
  });
  
  const handleCreateFlashcard = (front: string, back: string, tagIds: string[]) => {
    const newFlashcard = {
      id: `fc${state.flashCards.length + 1}`,
      front,
      back,
      tags: tagIds,
      lastReviewed: null,
      nextReview: null,
      difficulty: 'medium' as 'easy' | 'medium' | 'hard'
    };
    
    dispatch({ type: 'ADD_FLASHCARD', payload: newFlashcard });
    setMode('list');
  };
  
  const handleUpdateFlashcard = (updatedCard) => {
    dispatch({ type: 'UPDATE_FLASHCARD', payload: updatedCard });
  };
  
  return (
    <div className="p-6">
      {mode === 'list' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
            <div className="flex space-x-3">
              <button 
                onClick={() => setMode('study')}
                className="px-4 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 flex items-center"
              >
                <Book size={18} className="mr-2" />
                Study Flashcards
              </button>
              <button 
                onClick={() => setMode('create')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Create Flashcard
              </button>
            </div>
          </div>
          
          {/* Search and filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search flashcards..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800"
                value={selectedTagFilter || ''}
                onChange={(e) => setSelectedTagFilter(e.target.value || null)}
              >
                <option value="">All Tags</option>
                {state.tags.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Flashcards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFlashcards.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No flashcards found. Create your first flashcard.</p>
                <button 
                  onClick={() => setMode('create')} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Flashcard
                </button>
              </div>
            ) : (
              filteredFlashcards.map((card) => (
                <div 
                  key={card.id} 
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
                >
                  <div className="mb-3 h-32 overflow-hidden">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Question:</h3>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{card.front}</p>
                  </div>
                  
                  <div className="mb-3 h-32 overflow-hidden">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">Answer:</h3>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{card.back}</p>
                  </div>
                  
                  {card.tags.length > 0 && (
                    <div className="flex flex-wrap mt-3">
                      {card.tags.map((tagId) => {
                        const tag = state.tags.find(t => t.id === tagId);
                        if (!tag) return null;
                        return (
                          <span 
                            key={tagId} 
                            className="text-xs px-2 py-0.5 rounded-full mr-1 mb-1"
                            style={{ 
                              backgroundColor: `${tag.color}20`, 
                              color: tag.color 
                            }}
                          >
                            {tag.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {card.lastReviewed 
                        ? `Last reviewed: ${card.lastReviewed.toLocaleDateString()}`
                        : 'Not reviewed yet'
                      }
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      card.difficulty === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                        : card.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
      
      {mode === 'create' && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Flashcard</h1>
            <button 
              onClick={() => setMode('list')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
          <FlashcardForm 
            tags={state.tags}
            onSubmit={handleCreateFlashcard}
          />
        </div>
      )}
      
      {mode === 'study' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Flashcards</h1>
            <button 
              onClick={() => setMode('list')}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Back to Flashcards
            </button>
          </div>
          <FlashcardStudy 
            flashcards={filteredFlashcards} 
            onUpdateFlashcard={handleUpdateFlashcard} 
          />
        </div>
      )}
    </div>
  );
};

export default Flashcards;