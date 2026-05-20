import type { Filter } from '@/types';
import clsx from 'clsx';

type TodoFilterProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilter({ filter, setFilter }: TodoFilterProps) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-4">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={clsx(
            'flex-1 py-1.5 text-sm font-medium rounded-lg transition',
            filter === f.value
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
