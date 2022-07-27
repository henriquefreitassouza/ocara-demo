import { useNavigate } from "react-router-dom";
import { BreadcrumbItem,
         BreadcrumbTrail,
         ButtonSecondary,
         ButtonDanger,
         PageTitle } from "components";
import { handleFetch,
         sanitizeProper } from "utils";

const BookExcerptExcerpt = ({ book, user }) => {
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const confirmation = window.confirm("Deseja mesmo excluir esta resenha?");
    if (!confirmation) return;

    try {
      await handleFetch(`${process.env.REACT_APP_API_ADDRESS}/book/${book._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      window.alert("Resenha excluída");

      return navigate("/perfil");
    } catch (e) { window.alert("Falha ao deletar a resenha"); }
  }

  const Breadcrumb = () => {
    return (
      <BreadcrumbTrail className="hidden lg:block lg:text-center lg:mb-8">
        <BreadcrumbItem link="/" text="Home" />
        <BreadcrumbItem link={`/categorias/${book.genre}`} text={sanitizeProper(book.genre)} />
        <BreadcrumbItem link={`/categorias/${book.genre}/${book.namespace}`} text={book.title} last="true" />
      </BreadcrumbTrail>
    );
  }

  const BookExcerptEdit = () => {
    if (book.user === user) {
      return (
        <div className="text-center mb-4">
          <ButtonSecondary link={`/perfil/resenhas/${book.namespace}/editar`} text="Editar resenha" className="mr-4" />
          <ButtonDanger text="Apagar resenha" onClick={(e) => handleClick(e)} />
        </div>
      );
    }

    return null;
  }

  const BookExcerptDescription = () => {
    return (
      <>
        <PageTitle
          title={book.title}
          subtitle={book.author[0].name}
          className="text-center mb-8" />
        <p>{book.excerpt}</p>
      </>
    );
  }

  if (!book) return;
  
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <Breadcrumb />
        <BookExcerptEdit />
        <BookExcerptDescription />
      </div>
    </section>
  );
}

export default BookExcerptExcerpt;
