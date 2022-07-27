import { useContext } from "react";
import { UserContext } from "contexts";
import { CallOut } from "components";

const HomeCallToAction = () => {
  const { authenticated } = useContext(UserContext);

  if (authenticated) return;
  
  return (
    <CallOut
      title="Viaje por meio da leitura"
      description="Explore novos mundos e conheça novas pessoas hoje mesmo"
      link="/#hero"
      text="Criar nova conta" />
  );
}

export default HomeCallToAction;
