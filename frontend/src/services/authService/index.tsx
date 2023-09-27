import httpService from "services/httpService";

class AuthService {
  public async login(username: string, password: string): Promise<any> {
    const result = await httpService.post("/api/user/login", {
      Username:username,
      Password:password
    });

    localStorage.setItem("token", result.data.access_token);
    localStorage.setItem("username", result.data.username);
    return result.data;
  }

  public async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  public async loggedin(): Promise<any> {
    const token = localStorage.getItem("token");
    if (token) {
      const result = await httpService.get("/api/user/authorization");
      return result.data;
    } else {
      return false;
    }
  }
}

export default new AuthService();
