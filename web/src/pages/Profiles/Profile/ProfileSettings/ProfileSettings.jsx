import { ButtonSecondary,
         SectionTitle } from "components";

const ProfileSettings = () => {
  return (
    <section className="px-4 py-8">
      <div className="container mx-auto">
        <div id="settings">
          <SectionTitle
            title="Configurações"
            subtitle=""
            className="mb-4" />
          <div>
            <ButtonSecondary link="/logout" text="Sair" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileSettings;
