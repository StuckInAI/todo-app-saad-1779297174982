type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
  total: number;
};

export default function TodoStats({ activeCount, completedCount, total }: TodoStatsProps) {
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 font-medium">Progress</span>
        <span className="text-sm font-semibold text-indigo-600">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-gray-800">{total}</span>
          <span className="text-xs text-gray-400">Total</span>
        </div>
        <div className="w-px bg-gray-100" />
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-indigo-600">{activeCount}</span>
          <span className="text-xs text-gray-400">Active</span>
        </div>
        <div className="w-px bg-gray-100" />
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-green-600">{completedCount}</span>
          <span className="text-xs text-gray-400">Done</span>
        </div>
      </div>
    </div>
  );
}
