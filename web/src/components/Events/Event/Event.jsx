import { ButtonTooltip,
         CalendarEvent,
         EventCover,
         EventLead,
         EventMetadata,
         EventOrganizer } from "components";

const Event = ({ month, day, cover, title, organizer, profile, date, online, address, description, link, rsvp }) => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="absolute top-4 left-4">
          <CalendarEvent month={month} day={day} className="bg-white" />
        </div>
      </div>
      <div className="">
        <EventCover background={cover} />
        <h3 className="font-header-serif text-xl">{title}</h3>
        <div className="flex flex-col py-4 lg:flex-row">
          <EventOrganizer name={organizer} profile={profile} className="mb-4 lg:w-1/2 lg:mb-0" />
          <div className="flex flex-col lg:w-1/2 lg:justify-end">
            <div>
              <EventMetadata
                icon="calendar"
                text={date}
                className="mb-1" />
              <EventMetadata
                icon="location"
                text={(online) ? "Evento online" : address}
                className="" />
            </div>
          </div>
        </div>
        <EventLead
          text={description} />
        <ButtonTooltip
          link={link}
          title="Saiba mais"
          text={`${rsvp} confirmações`} />
      </div>
    </div>
  );
}

export default Event;
