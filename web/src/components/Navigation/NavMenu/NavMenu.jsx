import { useContext } from "react";
import { UserContext } from "contexts";
import { ButtonSecondary,
         NavMenuItem } from "components";

const NavMenu = ({ toggle }) => {
  const { authenticated } = useContext(UserContext);

  const Authenticate = () => {
    return (authenticated)
      ? <NavMenuItem link="/perfil" text="Meu Perfil" />
      : <ButtonSecondary link="/login" text="Entrar" />;
  }

  return (
    <ul className={toggle ? "block mt-4 lg:mt-0" : "hidden lg:block"}>
      <li className="mb-2 lg:mb-0 lg:inline-block lg:mx-1"><NavMenuItem link="/clubes-de-leitura" text="Clubes de Leitura" /></li>
      <li className="mb-2 lg:mb-0 lg:inline-block lg:mx-1"><NavMenuItem link="/categorias" text="Descubra" /></li>
      <li className="mb-2 lg:mb-0 lg:inline-block lg:mx-1"><NavMenuItem link="/sobre-a-ocara" text="Sobre a Ocara" /></li>
      <li className="lg:inline-block lg:mx-1"><Authenticate /></li>
    </ul>
  );
}

export default NavMenu;
