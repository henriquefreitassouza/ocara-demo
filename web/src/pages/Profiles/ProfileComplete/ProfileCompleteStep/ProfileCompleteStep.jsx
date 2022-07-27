import { ProfileCompleteForm,
         PageTitle } from "components";

const ProfileCompleteStep = () => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Complete seu cadastro"
          subtitle="Preencha os dados do seu perfil"
          className="text-center mb-8" />
        <div>
          <ProfileCompleteForm />
        </div>
      </div>
    </section>
  );
}

export default ProfileCompleteStep;
