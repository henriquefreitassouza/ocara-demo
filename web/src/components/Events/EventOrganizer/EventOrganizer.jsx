const EventOrganizer = ({ profile, name, ...params }) => {
  return (
    <div className={`flex items-center ${params.className}`}>
      <div className="w-12 h-12 rounded-full bg-gray-500 mr-2 bg-cover"
        style={{ backgroundImage: `url(${profile})`}}></div>
      <div className="flex flex-col">
        <span className="text-sm">Organizado por:</span>
        <strong className="text-sm">{name}</strong>
      </div>
    </div>
  );
}

export default EventOrganizer;
