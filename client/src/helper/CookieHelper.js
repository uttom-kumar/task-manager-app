import Cookies from "js-cookie";

class CookieHelper {
  getToken() {
    return localStorage.getItem("token");
  }

  SetUserDetails(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserDetails() {
    return JSON.parse(localStorage.getItem("user"));
  }

  removeSession() {
    localStorage.removeItem("token");
    window.location.href="/login";
  }
}

export const { getToken, SetUserDetails, getUserDetails, removeSession,  } = new CookieHelper();