import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { ProfileEditData } from "pages";

const ProfileEdit = () => {
  const { account } = useOutletContext();

  const { isLoading, error, data } = useQuery("profileEditData", () =>
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
    <ProfileEditData user={data.body} />
  );
}

export default ProfileEdit;
