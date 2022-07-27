import { BookEditForm,
         PageTitle } from "components";

const BookEditData = ({ book }) => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Atualize a resenha"
          subtitle="Mostre para a sua rede o que mudou"
          className="text-center mb-8" />
        <div>
          <BookEditForm book={book} />
        </div>
      </div>
    </section>
  );
}

export default BookEditData;
