import { Nav } from "components";

const NavBrand = ({ link, text, ...params }) => {
  return (
    <Nav
      className={`text-gray-700 text-xl ${params.className}`}
      link={link}
      text={text}
      onClick={params.onClick}></Nav>
  );
}

export default NavBrand;
