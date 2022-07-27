import { Nav } from "components";

const NavLink = ({ link, text, ...params }) => {
  return (
    <Nav
      className={`text-gray-500 hover:text-gray-700 hover:underline ${params.className}`}
      link={link}
      text={text}
      onClick={params.onClick}></Nav>
  );
}

export default NavLink;
