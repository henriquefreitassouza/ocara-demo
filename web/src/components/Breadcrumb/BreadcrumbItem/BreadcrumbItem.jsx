import { NavLink } from "components";

const BreadcrumbItem = ({ link, text, last, ...params }) => {
  return (
    <li className={`inline-block mx-2 ${(!last) ? "pr-4 border-r-2" : ""}`}>
      <NavLink link={link} text={text} />
    </li>
  );
}

export default BreadcrumbItem;
