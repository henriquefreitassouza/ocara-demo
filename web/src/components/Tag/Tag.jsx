import { Link } from "react-router-dom";

const Tag = ({ link, title }) => {
  return (
    <Link
      className="p-4 m-2 bg-orange-600 text-white inline-block rounded-sm transition ease-in-out hover:scale-105 hover:shadow-sm"
      to={link}>{title}</Link>
  );
}

export default Tag;
