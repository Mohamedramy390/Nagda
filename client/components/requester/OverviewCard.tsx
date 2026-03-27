import React from 'react'

interface OverviewCardProps {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

const OverviewCard = ({ label, value, icon, iconColor, iconBg }: OverviewCardProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-white p-5 shadow-sm border border-slate-200 dark:bg-[#1e2936] dark:border-slate-700">
      <div className="flex items-center gap-2 mb-2">
        <span className={`material-symbols-outlined ${iconColor} ${iconBg} p-1 rounded-md text-[20px]`}>{icon}</span>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      </div>
      <p className="text-2xl font-bold text-[#0d141b] dark:text-white">{value}</p>
    </div>
  )
}

export default OverviewCard
