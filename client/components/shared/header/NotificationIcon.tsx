'use client'
import React from 'react'

const NotificationIcon = () => {
  return (
    <button className="relative flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors">
      <span className="material-symbols-outlined">notifications</span>
      <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border border-white dark:border-[#111a22]"></span>
    </button>
  )
}

export default NotificationIcon
