import { useQuery } from "react-query";
import { BreadcrumbItem,
         BreadcrumbTrail,
         PageTitle,
         EventThumbnail } from "components";

const CommunityEventListEvents = ({ namespace }) => {
  const { isLoading, error, data } = useQuery("communityEventsData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/event/list/prev/${namespace}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const CommunityEvent = () => {
    return (
      <>
        {data.body.map((communityEvent) => (
          <EventThumbnail
            key={communityEvent.namespace}
            link={`/clubes-de-leitura/${namespace}/events/${communityEvent.namespace}`}
            title={communityEvent.title}
            date={communityEvent.date}
            info={`${(communityEvent.rsvp_list) ? communityEvent.rsvp_list.length : 0} participantes`} />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Eventos anteriores"
          subtitle="Todas as conversas do clube​"
          className="text-center mb-8" />
        <BreadcrumbTrail className="text-center mb-8">
          <BreadcrumbItem link="/" text="Home" />
          <BreadcrumbItem link="/clubes-de-leitura" text="Comunidade 1" />
          <BreadcrumbItem link="/evento-1" text="Evento 1" />
        </BreadcrumbTrail>
        <div className="flex flex-wrap flex-col lg:flex-row">
          <CommunityEvent />
        </div>
      </div>
    </section>
  );
}

export default CommunityEventListEvents;
