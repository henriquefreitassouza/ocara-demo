import { useQuery } from "react-query";
import { ButtonSecondary,
         CardFull,
         SectionTitle } from "components";

const ProfileExcerpts = ({ user }) => {
  const { isLoading, error, data } = useQuery("profileExcerptsData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/user/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const Books = () => {
    if (!data || data.result === "error")
      return <p>Não há livros resenhados por você.</p>;

    return (
      <>
        {data.body.map((book) => (
          <CardFull
            key={book.namespace}
            image={book.cover}
            title={book.title}
            link={`/categorias/${book.genre}/${book.namespace}`} />
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
            title="Resenhas feitas por mim"
            subtitle=""
            className="mb-4" />
          <div className="mb-4 flex flex-wrap flex-col lg:flex-row">
            <Books />
          </div>
          <div className="text-center">
            <ButtonSecondary
              link="/perfil/resenhas/criar"
              text="Criar nova resenha" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileExcerpts;
