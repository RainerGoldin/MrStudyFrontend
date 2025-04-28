import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Folder, File, FileText, FilePlus, MoreVertical, Search } from 'lucide-react';

const StudyMaterials: React.FC = () => {
  const { state } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  
  // Filter study materials based on search query and selected folder
  const filteredMaterials = state.studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === null || material.folderId === selectedFolder;
    return matchesSearch && matchesFolder;
  });
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Get folder name
  const getFolderName = (folderId: string) => {
    const folder = state.folders.find(f => f.id === folderId);
    return folder ? folder.name : 'Unknown';
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <FilePlus size={18} className="mr-2" />
          New Material
        </button>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search study materials..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={selectedFolder || ''}
            onChange={(e) => setSelectedFolder(e.target.value || null)}
          >
            <option value="">All Folders</option>
            {state.folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900">
            <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider grid grid-cols-12 gap-4">
              <div className="col-span-5">Title</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Folder</div>
              <div className="col-span-2">Updated</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMaterials.length === 0 ? (
              <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No materials found. Try adjusting your search or create a new study material.
              </div>
            ) : (
              filteredMaterials.map((material) => (
                <div 
                  key={material.id} 
                  className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer"
                >
                  <div className="col-span-5 flex items-center">
                    <div className="p-2 rounded-lg mr-3 bg-blue-50 dark:bg-blue-900">
                      {material.type === 'note' ? (
                        <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                      ) : (
                        <File size={18} className="text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{material.title}</div>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center text-gray-700 dark:text-gray-300">
                    <span className="capitalize">{material.type}</span>
                  </div>
                  <div className="col-span-2 flex items-center text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <Folder size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                      <span>{getFolderName(material.folderId)}</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center text-gray-500 dark:text-gray-400">
                    {formatDate(material.updatedAt)}
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;