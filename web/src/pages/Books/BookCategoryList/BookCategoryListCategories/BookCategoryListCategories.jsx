import { useQuery } from "react-query";
import { CardFull,
        PageTitle } from "components";

const BookCategoryListCategories = () => {
  const { isLoading, error, data } = useQuery("bookCategoryListCategoriesData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/genre`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  const BookCategoryCategories = () => {
    if (!data || data.result === "error") return;

    return (
      <>
        {data.body.map((genre) => (
          <CardFull
            key={genre}
            title={genre}
            link={`/categorias/${genre.toLowerCase()}`} />
        ))}
      </>
    );
  }

  if (isLoading || error) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Descubra sua próxima paixão literária"
          subtitle="Navegue pelas seções e saiba o que a comunidade está falando"
          className="text-center mb-8" />
        <div className="flex flex-wrap flex-col lg:flex-row">
          <BookCategoryCategories />
        </div>
      </div>
    </section>
  );
}

export default BookCategoryListCategories;
