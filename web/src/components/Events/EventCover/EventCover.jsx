const EventCover = ({ background }) => {
  return (
    <div
      className="h-48 bg-gray-300 rounded-sm mb-2 bg-cover"
      style={{ backgroundImage: `url(${background})`}}>

    </div>
  );
}

export default EventCover;
