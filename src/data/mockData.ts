import { StudyMaterial, Folder, Tag, FlashCard } from '../types';

export const mockFolders: Folder[] = [
  {
    id: 'f1',
    name: 'Mathematics',
    color: '#2563EB',
    parentId: null
  },
  {
    id: 'f2',
    name: 'Physics',
    color: '#7C3AED',
    parentId: null
  },
  {
    id: 'f3',
    name: 'Computer Science',
    color: '#14B8A6',
    parentId: null
  },
  {
    id: 'f4',
    name: 'Calculus',
    color: '#2563EB',
    parentId: 'f1'
  },
  {
    id: 'f5',
    name: 'Mechanics',
    color: '#7C3AED',
    parentId: 'f2'
  }
];

export const mockTags: Tag[] = [
  {
    id: 't1',
    name: 'Important',
    color: '#EF4444'
  },
  {
    id: 't2',
    name: 'Exam',
    color: '#F59E0B'
  },
  {
    id: 't3',
    name: 'Review',
    color: '#22C55E'
  },
  {
    id: 't4',
    name: 'Homework',
    color: '#3B82F6'
  }
];

export const mockStudyMaterials: StudyMaterial[] = [
  {
    id: 'sm1',
    title: 'Calculus Notes - Derivatives',
    type: 'note',
    tags: ['t1', 't2'],
    folderId: 'f4',
    createdAt: new Date('2023-09-15'),
    updatedAt: new Date('2023-09-16'),
    content: 'The derivative of a function represents the rate of change of the function at a specific point...'
  },
  {
    id: 'sm2',
    title: 'Physics Lab Report - Pendulum',
    type: 'document',
    tags: ['t4'],
    folderId: 'f5',
    createdAt: new Date('2023-09-10'),
    updatedAt: new Date('2023-09-12'),
  },
  {
    id: 'sm3',
    title: 'Algorithms Study Guide',
    type: 'note',
    tags: ['t2', 't3'],
    folderId: 'f3',
    createdAt: new Date('2023-09-05'),
    updatedAt: new Date('2023-09-14'),
    content: 'Big O notation is used to classify algorithms according to how their run time or space requirements grow...'
  }
];

export const mockFlashCards: FlashCard[] = [
  {
    id: 'fc1',
    front: 'What is a derivative?',
    back: 'The derivative of a function represents the rate of change of the function at a specific point.',
    tags: ['t1'],
    lastReviewed: new Date('2023-09-14'),
    nextReview: new Date('2023-09-17'),
    difficulty: 'medium'
  },
  {
    id: 'fc2',
    front: 'Newton\'s Second Law of Motion',
    back: 'F = ma, where F is force, m is mass, and a is acceleration.',
    tags: ['t2'],
    lastReviewed: new Date('2023-09-13'),
    nextReview: new Date('2023-09-16'),
    difficulty: 'easy'
  },
  {
    id: 'fc3',
    front: 'What is Big O notation?',
    back: 'Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows.',
    tags: ['t3'],
    lastReviewed: new Date('2023-09-10'),
    nextReview: new Date('2023-09-15'),
    difficulty: 'hard'
  }
];