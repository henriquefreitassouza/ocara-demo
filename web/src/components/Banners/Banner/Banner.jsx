const Banner = ({ image, alt, calendar, inner, ...params }) => {
  return (
    <div className={`flex flex-col rounded-sm md:flex-row md:items-center ${params.className}`}>
      <div
        className="relative bg-gray-300 mb-4 h-48 md:mb-0 md:mr-8 md:basis-1/2 md:h-72 bg-cover"
        style={{ backgroundImage: `url(${image})`}}>
        {calendar}
      </div>
      <div className="md:basis-1/2">
        {inner}
      </div>
    </div>
  );
}

export default Banner;
