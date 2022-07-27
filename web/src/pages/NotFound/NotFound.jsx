import { PageTitle } from "components";

const NotFound = () => {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <PageTitle
        title="404 - Página não encontrada"
        subtitle="Ops! A página que você busca não está aqui."
        className="text-center" />
    </div>
  );
}

export default NotFound;
