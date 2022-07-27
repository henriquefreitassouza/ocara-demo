import { Button } from "components";

const ButtonSecondary = ({ link, text, ...params }) => {
  return (
    <Button
      link={link}
      text={text}
      onClick={params.onClick}
      className={`p-2 bg-green-500 text-white inline-block transition ease-in-out hover:scale-105 hover:shadow-sm ${params.className}`} />
  );
}

export default ButtonSecondary;
