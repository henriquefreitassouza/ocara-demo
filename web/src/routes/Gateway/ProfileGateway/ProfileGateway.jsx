import { Outlet,
         Navigate } from "react-router-dom";
import { handleLocalStorageValue } from "utils";

const ProfileGateway = () => {
  const account = handleLocalStorageValue("account", "");
  const user = handleLocalStorageValue("user", "");
  const name = handleLocalStorageValue("name", "");
  const email = handleLocalStorageValue("email", "");

  if (!account || !user || !name || !email) return <Navigate to="/login" />;

  return <Outlet context={{ account: account, user: user, name: name, email: email }} />;
}

export default ProfileGateway;
