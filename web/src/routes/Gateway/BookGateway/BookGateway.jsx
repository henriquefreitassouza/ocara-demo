import { Outlet,
         Navigate,
         useParams } from "react-router-dom";
import { useGenre,
         useNamespace } from "hooks";

const BookGateway = () => {
  const { category: genre, book } = useParams();
  const [isCategoryValid, loadingCategory] = useGenre(genre);
  const [isNamespaceValid, loadingNamespace] = useNamespace("book", book);

  if (!genre || ((loadingCategory === "2" || loadingCategory === "9") && !isCategoryValid)) return <Navigate to="/categorias" replace />;

  if (book) {
    if ((loadingNamespace === "2" || loadingNamespace === "9") && !isNamespaceValid) return <Navigate to={`/categorias/${genre}`} replace />;
  }

  return <Outlet />;
}

export default BookGateway;
