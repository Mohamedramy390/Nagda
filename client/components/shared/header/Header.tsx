'use client'
import React from 'react'
import LanguageChanger from './LanguageChanger'
import NotificationIcon from './NotificationIcon'

const Header = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white dark:bg-[#111a22] dark:border-slate-800 px-8 shrink-0">
      {/* Search */}
      
      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Language Toggle */}
        <LanguageChanger />
        {/* Notifications */}
        <NotificationIcon />
        {/* Help/Globe */}
        <button className="flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  )
}

export default Header
