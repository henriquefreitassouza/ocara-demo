import { useQuery } from "react-query";
import { CardFull,
         SectionTitle } from "components";

const ProfileEvents = ({ user }) => {
  const { isLoading, error, data } = useQuery("profileEventsData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/event/list/user/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const Events = () => {
    if (!data || data.result === "error")
      return <p>Não há eventos cadastrados.</p>;

    return (
      <>
        {data.body.map((communityEvent) => (
          <CardFull
            key={communityEvent.namespace}
            image={communityEvent.cover}
            title={communityEvent.title}
            link={`/clubes-de-leitura/${communityEvent.community}/eventos/${communityEvent.namespace}`} />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <div className="mb-8" id="communities">
          <SectionTitle
            title="Eventos criados por mim"
            subtitle=""
            className="mb-4" />
          <div className="mb-4 flex flex-wrap flex-col lg:flex-row">
            <Events />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileEvents;
