const BookExcerptHeader = ({ cover }) => {
  return (
    <section className="px-4">
      <div className="container mx-auto">
        <div className="h-64 bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${cover})`}}>

        </div>
      </div>
    </section>
  );
}

export default BookExcerptHeader;
