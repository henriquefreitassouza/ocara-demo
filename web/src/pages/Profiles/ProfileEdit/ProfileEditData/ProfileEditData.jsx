import { ProfileEditForm,
         PageTitle } from "components";

const ProfileEditData = ({ user }) => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <PageTitle
          title="Atualize seu perfil"
          subtitle="Mostre para a sua rede o que mudou"
          className="text-center mb-8" />
        <div>
          <ProfileEditForm user={user} />
        </div>
      </div>
    </section>
  );
}

export default ProfileEditData;
