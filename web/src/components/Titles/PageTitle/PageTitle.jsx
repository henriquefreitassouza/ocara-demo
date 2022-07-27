import { HeadingOne,
         SubHeading,
         Title } from "components";

const PageTitle = ({ title, subtitle, ...params }) => {
  return (
    <Title className={params.className}>
      <HeadingOne title={title} className="font-header-serif text-4xl" />
      <SubHeading title={subtitle} className="text-2xl text-gray-500" />
    </Title>
  );
}

export default PageTitle;
