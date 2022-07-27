import { useQuery } from "react-query";
import { CardFull,
         PageTitle } from "components";

const CommunityListCommunities = () => {
  const { isLoading, error, data } = useQuery("communitiesData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/community/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const CommunityList = () => {
    if (!data || data.result === "error") return;

    return (
      <>
        {data.body.map((community) => (
          <CardFull
            key={community.namespace}
            image={community.cover}
            title={community.name}
            link={`/clubes-de-leitura/${community.namespace}`} />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Participe da conversa"
          subtitle="Entre nos clubes de leitura e converse sobre seus livros prediletos"
          className="text-center mb-8" />
        <div className="flex flex-wrap flex-col lg:flex-row">
          <CommunityList />
        </div>
      </div>
    </section>
  );
}

export default CommunityListCommunities;
