'use client'
import React from 'react'

const LanguageChanger = () => {
  return (
    <button className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
      <span className="material-symbols-outlined text-[18px]">language</span>
      <span>English</span>
      <span className="text-slate-300 dark:text-slate-600">|</span>
      <span className="font-normal text-slate-500 dark:text-slate-400">العربية</span>
    </button>
  )
}

export default LanguageChanger