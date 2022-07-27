import { EventThumbnail,
         NavLink,
         SectionTitle } from "components";

const CommunityPreviousEvents = ({ community, event: communityEvents, isMember }) => {
  const CommunityLastEvents = () => {
    if (!communityEvents || communityEvents.length === 0)
      return <p className="mx-auto">Não há eventos anteriores.</p>;

    return (
      <>
        {communityEvents.slice(0, 2).map((communityEvent) => (
          <EventThumbnail
            key={communityEvent.namespace}
            link={`/clubes-de-leitura/${community.namespace}/eventos/${communityEvent.namespace}`}
            title={communityEvent.title}
            date={communityEvent.date}
            info={(communityEvent.rsvp_list) ? `${communityEvent.rsvp_list.length} participantes` : `0 participantes`}
            cover={communityEvent.cover} />
        ))}
      </>
    );
  }

  const CommunityAllEvents = () => {
    if (!communityEvents || communityEvents.length <= 2) return;

    return (
      <NavLink
        link={`/clubes-de-leitura/${community.namespace}/eventos`}
        text="Ver todos" />
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <SectionTitle
          title="Encontros anteriores"
          subtitle="Veja como foram as conversas que os livros geraram"
          className="text-center mb-8" />
        <div className="flex flex-wrap flex-col lg:flex-row">
          <CommunityLastEvents />
          <CommunityAllEvents />
        </div>
      </div>
    </section>
  );
}

export default CommunityPreviousEvents;
