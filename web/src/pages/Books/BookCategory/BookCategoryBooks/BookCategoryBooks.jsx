import { useQuery } from "react-query";
import { CardThumbnail,
         PageTitle } from "components";

const BookCategoryBooks = ({ genre }) => {
  const { isLoading, error, data } = useQuery("bookCategoryBooksData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/genre/${genre}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const BookCategoryBook = () => {
    if (!data || data.result === "error") return;

    return (
      <>
        {data.body.map((book) => (
          <CardThumbnail
            key={book._id}
            image={book.cover}
            alt={book.title}
            title={book.title}
            lead={book.author[0].name}
            link={`/categorias/${book.genre}/${book.namespace}`}
            text="Saiba mais" />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Infanto Juvenil"
          subtitle="Explore os livros desta seção​"
          className="text-center mb-8" />
        <div className="flex flex-wrap flex-col md:flex-row">
          <BookCategoryBook />
        </div>
      </div>
    </section>
  );
}

export default BookCategoryBooks;
