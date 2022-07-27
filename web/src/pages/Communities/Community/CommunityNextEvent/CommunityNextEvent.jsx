import { useQuery } from "react-query";
import { Event,
         SectionTitle } from "components"

const CommunityNextEvent = ({ community, event: communityEvent, isMember }) => {
  if (!communityEvent)
    return <p className="text-center">Não há próximos eventos agendados.</p>;

  const CommunityNextEvent = () => {
    const { isLoading, error, data } = useQuery("communityNextEventData", () =>
      fetch(`${process.env.REACT_APP_API_ADDRESS}/user/${communityEvent.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((result) => result.json())
    );



    const eventLink = `/clubes-de-leitura/${community.namespace}/eventos/${communityEvent.namespace}`;
    const eventAddress = `${communityEvent.place.address},
                          ${communityEvent.place.number},
                          ${communityEvent.place.neighborhood},
                          ${communityEvent.place.city},
                          ${communityEvent.place.state},
                          ${communityEvent.place.postal_code}`;

    const eventDay = new Date(communityEvent.date).getDate();
    const eventMonth = new Date(communityEvent.date).toLocaleString("pt-BR", { month: "short" });

    if (isLoading || error) return;

    return (
      <Event
        month={eventMonth}
        day={eventDay}
        cover={communityEvent.cover}
        title={communityEvent.title}
        organizer={data.body.name}
        profile={data.body.picture}
        date={communityEvent.date}
        online={communityEvent.online}
        address={eventAddress}
        description={communityEvent.description}
        link={eventLink}
        rsvp={(communityEvent.rsvp_list) ? communityEvent.rsvp_list.length : 0}
      />
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto lg:w-2/3 xl:w-1/2">
        <SectionTitle
          title="Próximo encontro"
          subtitle=""
          className="text-center mb-8" />
        <CommunityNextEvent />
      </div>
    </section>
  );
}

export default CommunityNextEvent;
