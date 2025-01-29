class Auth {
  static getToken() {
    return localStorage.getItem("id_token");
  }

  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  static isTokenExpired(token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }

  static login(token) {
    localStorage.setItem("id_token", token);
    window.location.assign("/dashboard");
  }

  static logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/login");
  }
}

export default Auth;
