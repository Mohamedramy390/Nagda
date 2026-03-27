'use client';

import { useFormContext } from 'react-hook-form';

export default function PersonalDetails() {
  // 1. Get 'register' to connect inputs to the form
  const { register } = useFormContext();

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <span className="material-symbols-outlined text-slate-400">person</span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h3>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* First Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register('firstName')} // 👈 Syncs with Header
            id="firstName"
            type="text"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm text-sm transition-all"
            placeholder="e.g. John"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="lastName">
            Last Name
          </label>
          <input
            {...register('lastName')} // 👈 Syncs with Header
            id="lastName"
            type="text"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm text-sm transition-all"
            placeholder="e.g. Doe"
          />
        </div>

        {/* Email Address (Read Only) */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
              mail
            </span>
            <input
              {...register('email')}
              disabled
              id="email"
              type="email"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-3 py-2.5 pl-10 shadow-sm text-sm cursor-not-allowed select-none"
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">Contact admin to change email.</p>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="phone">
            Phone Number
          </label>
          <input
            {...register('phone')}
            id="phone"
            type="tel"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white px-3 py-2.5 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none shadow-sm text-sm transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>

      </div>
    </div>
  );
}