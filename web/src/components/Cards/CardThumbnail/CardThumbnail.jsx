import { ButtonSecondary,
         EventMetadata } from "components";

const CardThumbnail = ({ image, title, date, lead, link, text }) => {
  if (date) date = (<div className="mx-auto">
                      <EventMetadata icon="calendar" text={date} className="justify-center items-center my-2" />
                    </div>);

  return (
    <div className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <div className="my-2 md:m-2">
        <div className="h-36 bg-gray-300 mb-2 bg-cover bg-center" style={{ backgroundImage: `url(${image})`}}>
        </div>
        <div className="text-center">
          <h3 className="font-header-serif text-xl">{title}</h3>
          <div className="">
            {date}
            <p className="mb-4">{lead}</p>
          </div>
          <ButtonSecondary text={text} link={link} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default CardThumbnail;
