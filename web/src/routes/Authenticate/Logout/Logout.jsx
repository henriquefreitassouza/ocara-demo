import { useContext } from "react";
import { UserContext } from "contexts";

const Logout = () => {
  const auth = useContext(UserContext);
  localStorage.clear();

  auth.setAuthenticated(false);

  window.location.href = "/";
}

export default Logout;
