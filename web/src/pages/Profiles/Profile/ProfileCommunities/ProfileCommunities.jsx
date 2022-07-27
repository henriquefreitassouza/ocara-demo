import { useQuery } from "react-query";
import { ButtonSecondary,
         CardFull,
         SectionTitle } from "components";

const ProfileCommunities = ({ user }) => {
  const { isLoading, error, data } = useQuery("profileCommunitiesData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/community/list/user/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const Communities = () => {
    if (!data || data.result === "error")
      return <p>Não há comunidades cadastradas.</p>;

    return (
      <>
        {data.body.map((community) => (
          <CardFull
            key={community.namespace}
            image={community.cover}
            title={community.name}
            description={community.excerpt}
            link={`/clubes-de-leitura/${community.namespace}`} />
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
            title="Clubes criados por mim"
            subtitle=""
            className="mb-4" />
          <div className="mb-4 flex flex-wrap flex-col lg:flex-row">
            <Communities />
          </div>
          <div className="text-center">
            <ButtonSecondary
              link="/perfil/clubes-de-leitura/criar"
              text="Criar nova comunidade" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileCommunities;
