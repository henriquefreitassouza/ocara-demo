import { ButtonSecondary,
         SectionTitle } from "components";

const ProfileBio = ({ user }) => {
  const ProfileData = ({ field, value }) => {
    return (
      <div className="mb-2">
        <strong className="mr-2">{`${field}:`}</strong>
        <span>{value}</span>
      </div>
    )
  }

  if (!user) return;

  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <div className="mb-8" id="profile">
          <SectionTitle
            title="Meu Perfil"
            subtitle=""
            className="mb-4" />
          <div>
            <ProfileData field="Nome" value={user.name} />
            <ProfileData field="Sobrenome" value={user.surname} />
            <ProfileData field="E-mail" value={user.email} />
            <ProfileData field="Bio" value={user.bio} />
            <ButtonSecondary link="/perfil/editar" text="Editar" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileBio;
