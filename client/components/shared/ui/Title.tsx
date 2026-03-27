import React from 'react'

interface TitleProps {
  title: string;
  description?: string;
}

const Title = ({ title, description }: TitleProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-[#0d141b] dark:text-white">{title}</h2>
      {description && (
        <p className="text-slate-500 dark:text-slate-400">{description}</p>
      )}
    </div>
  )
}

export default Title
