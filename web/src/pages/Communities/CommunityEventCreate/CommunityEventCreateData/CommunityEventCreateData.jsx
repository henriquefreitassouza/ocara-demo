import { CommunityEventCreateForm,
         PageTitle } from "components";

const CommunityEventCreateData = ({ community }) => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Crie um novo evento"
          subtitle="E junte pessoas apaixonadas pela leitura em uma mesmo lugar ❤️​"
          className="text-center mb-8" />
        <div>
          <CommunityEventCreateForm community={community} />
        </div>
      </div>
    </section>
  );
}

export default CommunityEventCreateData;
