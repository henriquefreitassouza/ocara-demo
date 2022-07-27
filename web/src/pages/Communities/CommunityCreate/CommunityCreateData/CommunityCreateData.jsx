import { CommunityCreateForm,
         PageTitle } from "components";

const CommunityCreateData = ({ user }) => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Crie uma nova comunidade"
          subtitle="E organize eventos literários"
          className="text-center mb-8" />
        <div>
          <CommunityCreateForm />
        </div>
      </div>
    </section>
  );
}

export default CommunityCreateData;
