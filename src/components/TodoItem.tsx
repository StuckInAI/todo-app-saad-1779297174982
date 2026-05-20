import { useState } from 'react';
import type { Todo } from '@/types';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const PRIORITY_BORDER: Record<string, string> = {
  low: 'border-l-green-400',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-400',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    onEdit(todo.id, editText);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'bg-white rounded-xl border border-gray-100 border-l-4 shadow-sm px-4 py-3 flex items-center gap-3 group transition-all',
        PRIORITY_BORDER[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Text / Edit */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-sm bg-gray-50 border border-indigo-300 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-200"
          />
        ) : (
          <span
            className={clsx(
              'text-sm block truncate',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            )}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Priority badge */}
      {!editing && (
        <span
          className={clsx(
            'text-xs font-medium px-2 py-0.5 rounded-full shrink-0',
            PRIORITY_BADGE[todo.priority]
          )}
        >
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg bg-indigo-50 text-indigo-500 hover:bg-indigo-100 transition"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              className="p-1.5 rounded-lg text-gray-300 hover:text-indigo-500 hover:bg-indigo-50 transition opacity-0 group-hover:opacity-100"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
