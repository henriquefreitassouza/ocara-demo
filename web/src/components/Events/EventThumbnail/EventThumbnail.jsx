import { Link } from "react-router-dom";
import { CalendarEvent,
         EventMetadata } from "components";

const EventThumbnail = ({ link, title, date, info, cover }) => {
  const eventDay = new Date(date).getDate();
  const eventMonth = new Date(date).toLocaleString("pt-BR", { month: "short" });

  return (
    <div className="basis-full lg:basis-1/2">
      <Link className="flex p-4 mb-4 rounded-sm transition ease-in-out hover:scale-105 hover:shadow-2xl lg:m-2"
        to={link}>
        <div className="mr-4">
          <CalendarEvent month={eventMonth} day={eventDay} />
        </div>
        <div>
          <h3 className="font-header-serif text-xl mb-2">{title}</h3>
          <div>
            <EventMetadata
              icon="calendar"
              text={date}
              className="mb-1" />
            <EventMetadata
              icon="group"
              text={info} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default EventThumbnail;
