
interface SystemMessageProps {
  text: string;
  icon?: string;
}

export default function SystemMessage({ text, icon = 'info' }: SystemMessageProps) {
  return (
    <div className="flex justify-center w-full my-4">
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-dashed border-slate-300 dark:border-slate-700">
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
        {text}
      </div>
    </div>
  );
}