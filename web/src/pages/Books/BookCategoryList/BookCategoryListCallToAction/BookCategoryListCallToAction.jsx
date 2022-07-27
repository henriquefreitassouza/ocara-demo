import { useContext } from "react";
import { UserContext } from "contexts";
import { CallOut } from "components";

const BookCategoryListCallToAction = () => {
  const { authenticated } = useContext(UserContext);

  if (authenticated) return;

  return (
    <CallOut
      title="Viaje por meio da leitura"
      description="Explore novos mundos e conheça novas pessoas hoje mesmo"
      link="/"
      text="Criar nova conta" />
  );
}

export default BookCategoryListCallToAction;
