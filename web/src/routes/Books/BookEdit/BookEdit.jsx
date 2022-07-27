import { Navigate,
         useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthentication } from "hooks";
import { BookEditData } from "pages";

const BookEdit = () => {
  const { book } = useParams();
  const credentials = useAuthentication();

  const { isLoading, error, data } = useQuery("bookEditData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/book/list/namespace/${book}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  if (isLoading || error) return;

  if (credentials.user && data.body.user !== credentials.user)
    return <Navigate to={`/categorias/${data.body.genre}/${data.body.namespace}`} replace />;

  return (
    <BookEditData book={data.body} />
  );
}

export default BookEdit;
