import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { ProfileBio,
         ProfileCommunities,
         ProfileCover,
         ProfileEvents,
         ProfileExcerpts,
         ProfileSettings } from "pages";

const Profile = () => {
  const { account } = useOutletContext();
  const { isLoading, error, data } = useQuery("profileData", () =>
    fetch(`${process.env.REACT_APP_API_ADDRESS}/user/account/${account}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
  );

  if (isLoading || error) return;

  return (
    <>
      <ProfileCover user={data.body} />
      <ProfileBio user={data.body} />
      <ProfileCommunities user={data.body} />
      <ProfileEvents user={data.body} />
      <ProfileExcerpts user={data.body} />
      <ProfileSettings />
    </>
  );
}

export default Profile;
