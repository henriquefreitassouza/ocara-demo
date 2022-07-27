import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthentication } from "hooks";
import { BookExcerptCallToAction,
         BookExcerptExcerpt,
         BookExcerptHeader } from "pages";

const BookExcerpt = () => {
  const { book } = useParams();
  const credentials = useAuthentication();

  const { isLoading, error, data } = useQuery("bookExcerptData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/namespace/${book}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  if (isLoading || error) return;

  return (
    <>
      <BookExcerptHeader cover={data.body.cover} />
      <BookExcerptExcerpt book={data.body} user={credentials?.user} />
      <BookExcerptCallToAction />
    </>
  );
}

export default BookExcerpt;
