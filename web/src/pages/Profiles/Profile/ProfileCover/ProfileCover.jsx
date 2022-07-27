import { Cover } from "components";

const ProfileCover = ({ user }) => {
  if (!user) return;

  return (
    <section className="px-4">
      <div className="container mx-auto">
        <Cover
          cover={user.cover}
          profile={user.picture}
          title={(user.surname) ? `${user.name} ${user.surname}` : user.name}
          lead={user.bio} />
      </div>
    </section>
  );
}

export default ProfileCover;
