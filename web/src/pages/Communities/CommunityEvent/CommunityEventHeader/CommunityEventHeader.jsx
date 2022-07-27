import { Banner,
         BannerCommunityEvent,
         CalendarEvent } from "components";

const CommunityEventHeader = ({ event: communityEvent, isRsvp, handleRsvp }) => {
  const bannerText = (
    <BannerCommunityEvent
      event={communityEvent}
      isRsvp={isRsvp}
      handleRsvp={handleRsvp} />
  );

  const eventDay = new Date(communityEvent.date).getDate();
  const eventMonth = new Date(communityEvent.date).toLocaleString("pt-BR", { month: "short" });

  const calendar = (
    <CalendarEvent
      month={eventMonth}
      day={eventDay}
      className="bg-white absolute top-4 left-4" />
  );

  return (
    <section className="px-4">
      <div className="container mx-auto">

      <Banner
        image={communityEvent.cover}
        alt={communityEvent.title}
        calendar={calendar}
        inner={bannerText} />
      </div>
    </section>
  );
}

export default CommunityEventHeader;
