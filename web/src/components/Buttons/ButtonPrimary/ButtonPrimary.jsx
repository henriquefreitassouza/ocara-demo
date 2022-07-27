import { Button } from "components";

const ButtonPrimary = ({ link, text, ...params }) => {
  return (
    <Button
      link={link}
      text={text}
      onClick={params.onClick}
      className={`bg-orange-500 rounded-sm text-white p-2 inline-block text-center transition ease-in-out hover:scale-105 hover:shadow-sm ${params.className}`} />
  );
}

export default ButtonPrimary;
