import { BookCreateForm,
         PageTitle } from "components";

const BookCreateData = ({ user }) => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Crie uma nova resenha"
          subtitle="E compartilhe seu conhecimento literário"
          className="text-center mb-8" />
        <div>
          <BookCreateForm />
        </div>
      </div>
    </section>
  );
}

export default BookCreateData;
