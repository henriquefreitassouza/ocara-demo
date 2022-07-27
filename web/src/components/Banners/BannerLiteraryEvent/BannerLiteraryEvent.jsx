import { Button } from "components";

const BannerLiteraryEvent = ({ title, lead, link, text }) => {
  return (
    <>
      <p className="text-3xl font-header-serif mb-2">{title}</p>
      <div className="">
        <p className="text-xl mb-4">{lead}</p>
        <Button link={link} title={text} className="bg-orange-300 text-white p-4 text-xl mr-4" />
      </div>
    </>
  );
}

export default BannerLiteraryEvent;
