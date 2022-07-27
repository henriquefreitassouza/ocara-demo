import { useState } from "react";
import { UserContext } from "contexts";
import { useAuthentication } from "hooks";

const UserProvider = ({ children }) => {
  const credentials = useAuthentication();
  const [authenticated, setAuthenticated] = useState((credentials) ? true : false);

  return (
    <UserContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
