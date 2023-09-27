import { useEffect } from "react";
import authService from "services/authService";
import { useStores } from "stores/rootStore";

export const useAuthentication = () => {
  const { authenticationStore } = useStores();
  useEffect(() => {
    authService
      .loggedin()
      .then((res) => {
        if (res) {
          authenticationStore.setIsAuthenticate(true);
          authenticationStore.setUsername(res.Username);
        } else {
          authenticationStore.setIsAuthenticate(false);
          authenticationStore.setUsername(undefined);
        }
      })
      .catch((err) => {
        authenticationStore.setIsAuthenticate(false);
        authenticationStore.setUsername(undefined);
      });
  }, []);
};
