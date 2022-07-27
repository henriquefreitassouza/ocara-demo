import { Link } from "react-router-dom";

const Button = ({ link, text, ...params }) => {
  if (!link) link = "/";

  return (
    <Link
      className={params.className}
      to={link}
      onClick={params.onClick}>{text}</Link>
  );
}

export default Button;
