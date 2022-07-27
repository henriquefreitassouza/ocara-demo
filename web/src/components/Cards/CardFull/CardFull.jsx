import { Link } from "react-router-dom";

const CardFull = ({ image, title, description, link }) => {
  if (description) description = (<p className="text-white">{description}</p>);

  return (
    <div className="basis-full lg:basis-1/3">
      <Link
        className="relative block text-center my-2 p-8 transition ease-in-out hover:scale-105 hover:shadow-2xl lg:m-2"
        to={link}>
        <div
          className="-z-10 absolute rounded-sm bg-green-500 brightness-50 inset-0 bg-cover bg-center"
          style={{backgroundImage: `url(${image})`}}>
        </div>
        <div className="z-10">
          <h3 className="font-header-serif text-xl text-white">{title}</h3>
          {description}
        </div>
      </Link>
    </div>
  );
}

export default CardFull;
