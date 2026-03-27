'use client';

import { useFormContext } from 'react-hook-form';

export default function AccountPreferences() {
  const { register } = useFormContext();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <span className="material-symbols-outlined text-slate-400">tune</span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Preferences</h3>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Language Select */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="language">
            Interface Language
          </label>
          <div className="relative">
            <select
              {...register('language')}
              id="language"
              className="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm text-sm transition-all"
            >
              <option value="en">English (United States)</option>
              <option value="ar">Arabic (العربية)</option>
              <option value="fr">French (Français)</option>
            </select>
            {/* Custom Arrow Icon */}
            <span className="pointer-events-none absolute right-3 top-2.5 material-symbols-outlined text-[20px] text-slate-400">
              expand_more
            </span>
          </div>
        </div>

        {/* Timezone Select */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="timezone">
            Timezone
          </label>
          <div className="relative">
            <select
              {...register('timezone')}
              id="timezone"
              className="w-full appearance-none rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 pr-10 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm text-sm transition-all"
            >
              <option value="utc-8">Pacific Time (US & Canada)</option>
              <option value="utc-5">Eastern Time (US & Canada)</option>
              <option value="utc+0">London (GMT)</option>
              <option value="utc+3">Riyadh (GMT+3)</option>
            </select>
            {/* Custom Arrow Icon */}
            <span className="pointer-events-none absolute right-3 top-2.5 material-symbols-outlined text-[20px] text-slate-400">
              expand_more
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}