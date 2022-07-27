import { Nav } from "components";

const NavMenuItem = ({ link, text, ...params }) => {
  return (
    <Nav
      className="text-gray-500 hover:text-gray-700 hover:underline inline-block lg:p-1"
      link={link}
      text={text}
      onClick={params.onClick}></Nav>
  );
}

export default NavMenuItem;
