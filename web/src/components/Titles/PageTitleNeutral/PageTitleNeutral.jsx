import { HeadingOne,
         SubHeading,
         Title } from "components";

const PageTitleNeutral = ({ title, subtitle, ...params }) => {
  return (
    <Title className={params.className}>
      <HeadingOne title={title} className="font-header-serif text-4xl text-white" />
      <SubHeading title={subtitle} className="text-2xl text-white" />
    </Title>
  );
}

export default PageTitleNeutral;
