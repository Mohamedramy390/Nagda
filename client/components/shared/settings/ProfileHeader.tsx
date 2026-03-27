'use client';

import { useFormContext } from 'react-hook-form';

export default function ProfileHeader() {
  // 1. Hook into the form data to get live updates
  const { watch } = useFormContext();
  
  // 2. Watch specific fields
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const role = watch('role');
  const email = watch('email');

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-between">
        
        {/* Left Side: Avatar & Text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          
          {/* Avatar Section */}
          <div className="relative group">
            {/* I replaced the hardcoded 'background-image' with a dynamic Initials container 
               that matches your style exactly (h-24, w-24, border-4, etc.)
            */}
            <div className="h-24 w-24 rounded-full border-4 border-slate-50 dark:border-slate-800 shadow-sm bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-400 dark:text-slate-500">
              {firstName?.[0]}{lastName?.[0]}
            </div>
            
            {/* Edit Icon Button */}
            <button 
              type="button" 
              className="absolute bottom-0 right-0 bg-white dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:text-blue-600 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>

          {/* Text Section */}
          <div className="text-center sm:text-left pt-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {firstName} {lastName}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {role}
            </p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
              {email}
            </p>
          </div>
        </div>

        {/* Right Side: Upload Button */}
        <button 
          type="button" 
          className="h-10 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 text-sm font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
        >
          Upload New Photo
        </button>
      </div>
    </div>
  );
}