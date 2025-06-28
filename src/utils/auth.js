const USERS_KEY = "users";

function loadUsers() {
  const stored = localStorage.getItem(USERS_KEY);
  if (stored) return JSON.parse(stored);
  const defaultUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "employee", password: "test123", role: "employee" }
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false };
}

export function logout() {
  localStorage.removeItem("user");
  window.location.href = "/login"; // Force reload to reset React state
}

export function getUser() {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Enhanced signup function that accepts additional profile data.
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {object} additionalData — includes: firstName, lastName, email, phone, address, birthday, etc.
 */
export function signup(username, password, additionalData = {}) {
  const users = loadUsers();
  if (users.some(u => u.username === username)) {
    return { success: false, message: "Username already taken" };
  }

  const newUser = {
    username,
    password,
    role: "employee",
    startDate: new Date().toISOString(),
    avatar: "/img/avatar1.svg", // default avatar
    ...additionalData,
  };

  users.push(newUser);
  saveUsers(users);
  localStorage.setItem("user", JSON.stringify(newUser));

  return { success: true, user: newUser };
}
