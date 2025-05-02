export default function DayMealCard({
  day,
  lunchEn,
  lunchMr,
  dinnerEn,
  dinnerMr,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto md:max-w-xs hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-pink-600 mb-4 text-center">
        {day}
      </h2>

      <div className="space-y-3">
        <div className="bg-pink-100 p-3 rounded-md">
          <span className="font-semibold text-pink-700 block">Lunch:</span>
          <div className="text-gray-800">{lunchEn}</div>
          <div className="text-sm text-gray-600 italic">{lunchMr}</div>
        </div>
        <div className="bg-pink-200 p-3 rounded-md">
          <span className="font-semibold text-pink-800 block">Dinner:</span>
          <div className="text-gray-800">{dinnerEn}</div>
          <div className="text-sm text-gray-700 italic">{dinnerMr}</div>
        </div>
      </div>
    </div>
  );
}
