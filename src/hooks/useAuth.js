const TOKEN_KEY = "token";
const USER_EMAIL_KEY = "userEmail";

export function loginUser(token, email) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_EMAIL_KEY, email);
}


export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
}

export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function getUserEmail() {
  return localStorage.getItem(USER_EMAIL_KEY);
}
