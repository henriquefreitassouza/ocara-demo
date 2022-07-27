import { ButtonSecondary,
         Info } from "components";

const ButtonTooltip = ({ link, title, text, ...params }) => {
  return (
    <div className="flex flex-nowrap items-center justify-between lg:justify-start">
      <ButtonSecondary link={link} text={title} className={params.className} onClick={params.onClick} />
      <Info text={text} />
    </div>
  );
}

export default ButtonTooltip;
