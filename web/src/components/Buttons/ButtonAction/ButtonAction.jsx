import { Button } from "components";

const ButtonAction = ({ link, text, ...params }) => {
  return (
    <Button
      link={link}
      text={text}
      onClick={params.onClick}
      className={`bg-white text-green-500 text-xl p-4 inline-block transition ease-in-out hover:scale-105 hover:shadow-sm ${params.className}`} />
  );
}

export default ButtonAction;
