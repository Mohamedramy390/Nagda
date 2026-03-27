'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface NavlinkProps {
  href: string;
  icon: string;
  label: string;
}

const Navlink = ({ href, icon, label}: NavlinkProps) => {

    const active = usePathname() == href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
        active
          ? 'bg-primary/10 text-primary'
          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0d141b] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white'
      }`}
    >
      <span className={`material-symbols-outlined ${active ? 'icon-filled' : ''}`}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Navlink;