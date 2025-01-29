import jwtDecode from "jwt-decode";

class Auth {
  // Retrieve the token from localStorage
  static getToken() {
    return localStorage.getItem("id_token");
  }

  // Decode the token to get user data
  static getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  // Check if the user is logged in
  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  static isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp < Date.now() / 1000; // Token expires if exp is less than current time
    } catch (err) {
      return false;
    }
  }

  // Save the token to localStorage and redirect to the dashboard
  static login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/dashboard");
  }

  // Remove the token from localStorage and redirect to the homepage
  static logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default Auth;
