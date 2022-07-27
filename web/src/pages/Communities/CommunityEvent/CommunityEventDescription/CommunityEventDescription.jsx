import { SectionTitle } from "components";

const CommunityEventDescription = ({ description }) => {
  const CommunityEventText = () => {
    return (
      <>
        <p>{description}</p>
      </>
    );
  }

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <SectionTitle
          title="Sobre o evento"
          subtitle=""
          className="text-center mb-4" />
        <CommunityEventText />
      </div>
    </section>
  );
}

export default CommunityEventDescription;
