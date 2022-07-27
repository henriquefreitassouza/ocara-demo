import { Button } from "components";

const ButtonNeutral = ({ link, text, ...params }) => {
  return (
    <Button
      link={link}
      text={text}
      onClick={params.onClick}
      className={`p-2 bg-gray-500 text-white inline-block transition ease-in-out hover:scale-105 hover:shadow-sm ${params.className}`} />
  );
}

export default ButtonNeutral;
