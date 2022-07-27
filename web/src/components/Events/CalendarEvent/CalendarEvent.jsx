const CalendarEvent = ({ month, day, className }) => {
  if (!className) className = "";
  return (
    <div className={`flex flex-col items-center w-24 px-6 py-4 rounded-sm ${className}`}>
      <span className="uppercase text-xl">{month}</span>
      <span className="text-4xl">{day}</span>
    </div>
  );
}

export default CalendarEvent;
