import { useState } from 'react';
import type { Priority } from '@/types';
import { Plus } from 'lucide-react';
import clsx from 'clsx';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2.5 transition flex items-center gap-1.5 text-sm font-medium"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex gap-2">
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'flex-1 border rounded-lg py-1.5 text-xs font-medium transition',
              priority === opt.value
                ? opt.color + ' ring-2 ring-offset-1 ring-current'
                : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
