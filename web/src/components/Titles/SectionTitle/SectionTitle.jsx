import { HeadingTwo,
         SubHeading,
         Title } from "components";

const SectionTitle = ({ title, subtitle, ...params }) => {
  return (
    <Title className={params.className}>
      <HeadingTwo title={title} className="font-header-serif text-3xl" />
      <SubHeading title={subtitle} className="text-lg text-gray-500" />
    </Title>
  );
}

export default SectionTitle;
