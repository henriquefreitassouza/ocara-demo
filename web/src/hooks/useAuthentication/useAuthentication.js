import { useState } from "react";
import { handleLocalStorageValue } from "utils";

function useAuthentication() {
  const [credentials] = useState({
    account: handleLocalStorageValue("account", ""),
    user: handleLocalStorageValue("user", ""),
    name: handleLocalStorageValue("name", ""),
    email: handleLocalStorageValue("email", "")
  });

  if (!credentials.account || !credentials.user || !credentials.name || !credentials.email) return null;

  return credentials;
}

export default useAuthentication;
