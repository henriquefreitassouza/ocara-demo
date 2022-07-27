import { HeadingTwo,
         SubHeading,
         Title } from "components";

const SectionTitleNeutral = ({ title, subtitle, ...params }) => {
  return (
    <Title className={params.className}>
      <HeadingTwo title={title} className="font-header-serif text-3xl text-white" />
      <SubHeading title={subtitle} className="text-lg text-white" />
    </Title>
  );
}

export default SectionTitleNeutral;
