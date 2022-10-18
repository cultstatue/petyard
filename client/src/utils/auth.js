//document dealing with tokens and user authentication
import decode from "jwt-decode";

class AuthService {
  //retrieve data saved in our token
  getProfile() {
    return decode(this.getToken());
  }

  //check if the user is still logged in
  loggedIn() {
    //checks if there is a saved token and it's still valid
    const token = this.getToken();
    //use type coersion to check if token is NOT undefined adn the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  //check if the toekn has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      //if expiration is less than the current date, set expired to true
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    //Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  // set token to localStorage and reload the page to homepage
  login(idToken) {
    //saves user token to localStorage
    localStorage.setItem("id_token", idToken);

    //relocate
    window.location.assign("/");
  }

  //clear toekn from localStorage and force logout with reload
  logout() {
    // Clear usertoken and rpfile data from localStorage
    localStorage.removeItem("id_token");
    //this will relaod the page and reset the state of the application
    window.location.assign("/");
  }
}

//instantiates new version every time we import it, ensure using a new version of cuntionality and takes out some risk of leaving remnant data hanging around
export default new AuthService();
