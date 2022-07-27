import { useParams } from "react-router-dom";
import { BookCategoryCallToAction,
         BookCategoryBooks } from "pages";

const BookCategory = () => {
  const { category: genre } = useParams();

  return (
    <>
      <BookCategoryBooks genre={genre} />
      <BookCategoryCallToAction />
    </>
  );
}

export default BookCategory;
