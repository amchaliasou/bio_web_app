import { makeAutoObservable } from "mobx";

class AuthenticationStore {
  isAuthenticated: boolean = false;
  username: string | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
  }


  public setIsAuthenticate = (value:boolean) => {
    this.isAuthenticated = value;
  };

  public setUsername = (value: string | undefined) => {
    this.username = value;
  };

  public logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    this.isAuthenticated = false;
    this.username = undefined;

  }

}

export default AuthenticationStore;