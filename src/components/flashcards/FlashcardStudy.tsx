import React, { useState } from 'react';
import { FlashCard } from '../../types';
import { RotateCw, Check, X, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FlashcardStudyProps {
  flashcards: FlashCard[];
  onUpdateFlashcard: (card: FlashCard) => void;
}

const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ flashcards, onUpdateFlashcard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<string[]>([]);
  
  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 mb-4">No flashcards available for study.</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Create Flashcards
        </button>
      </div>
    );
  }
  
  const currentCard = flashcards[currentIndex];
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };
  
  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Calculate the next review date based on difficulty
    const now = new Date();
    let nextReview: Date;
    
    switch (difficulty) {
      case 'easy':
        // Review in 3 days
        nextReview = new Date(now.setDate(now.getDate() + 3));
        break;
      case 'medium':
        // Review in 1 day
        nextReview = new Date(now.setDate(now.getDate() + 1));
        break;
      case 'hard':
        // Review in 6 hours
        nextReview = new Date(now.setHours(now.getHours() + 6));
        break;
    }
    
    // Update the flashcard
    const updatedCard: FlashCard = {
      ...currentCard,
      lastReviewed: new Date(),
      nextReview,
      difficulty
    };
    
    onUpdateFlashcard(updatedCard);
    
    // Track studied cards
    setStudiedCards([...studiedCards, currentCard.id]);
    
    // Move to next card
    handleNext();
  };
  
  // Calculate study progress
  const progress = studiedCards.length === 0 
    ? (currentIndex / flashcards.length) * 100 
    : (studiedCards.length / flashcards.length) * 100;
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Study Flashcards</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {currentIndex + 1} of {flashcards.length}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
          <div 
            className="h-2 bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Flashcard */}
        <div 
          className={`relative w-full aspect-[3/2] perspective-1000 cursor-pointer mb-6 ${
            isFlipped ? 'transform-style-3d' : ''
          }`}
          onClick={handleFlip}
        >
          <div 
            className={`absolute w-full h-full rounded-xl shadow-md p-6 flex items-center justify-center transform-style-3d transition-transform duration-500 ${
              isFlipped ? 'rotate-y-180 invisible opacity-0' : 'visible opacity-100'
            }`}
            style={{ 
              backgroundColor: !isFlipped ? '#EFF6FF' : '#F3F4F6',
              color: !isFlipped ? '#1E40AF' : '#1F2937' 
            }}
          >
            <p className="text-center text-lg font-medium">{currentCard.front}</p>
          </div>
          
          <div 
            className={`absolute w-full h-full rounded-xl shadow-md p-6 flex items-center justify-center backface-hidden transform-style-3d transition-transform duration-500 ${
              isFlipped ? 'visible opacity-100' : 'rotate-y-180 invisible opacity-0'
            }`}
            style={{ 
              backgroundColor: isFlipped ? '#F0FDF4' : '#F3F4F6',
              color: isFlipped ? '#166534' : '#1F2937'
            }}
          >
            <p className="text-center text-lg">{currentCard.back}</p>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Click the card to reveal the {isFlipped ? 'question' : 'answer'}
        </div>
        
        {/* Controls */}
        <div className="flex justify-center space-x-3">
          {isFlipped ? (
            // Rating buttons when card is flipped
            <>
              <button 
                onClick={() => handleDifficulty('hard')}
                className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                title="Hard - Review soon"
              >
                <ThumbsDown size={20} />
              </button>
              <button 
                onClick={() => handleDifficulty('medium')}
                className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                title="Medium - Review tomorrow"
              >
                <X size={20} />
              </button>
              <button 
                onClick={() => handleDifficulty('easy')}
                className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                title="Easy - Review later"
              >
                <ThumbsUp size={20} />
              </button>
            </>
          ) : (
            // Skip button when card is not flipped
            <button 
              onClick={handleNext}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
            >
              <span>Skip</span>
              <RotateCw size={16} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardStudy;