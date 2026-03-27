'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    icon: string;
    label: string;
    path?: string;
    type?: string
}

const PrimaryBtn = ({icon, label, path, type}: Props) => {
  const router = useRouter()
  const clickhHandle = () => {
    if(path) {router.push(path); return;}
    if(type == 'save') console.log("saved")
  }
  return (    
    <button onClick={clickhHandle} className="flex items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        <span>{label}</span>
    </button>
  )
}

export default PrimaryBtn