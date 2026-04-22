const USER_KEY = "workerzone:user";
const RESET_KEY = "workerzone:resetTokens";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCurrentUser() {
  return readJson(USER_KEY, null);
}

export function setCurrentUser(user) {
  if (!user) localStorage.removeItem(USER_KEY);
  else writeJson(USER_KEY, user);
}

export function signup({ name, email, password }) {
  if (!email || !password) throw new Error("Email and password are required.");
  const user = { id: crypto.randomUUID(), name: name || "User", email };
  setCurrentUser(user);
  return user;
}

export function login({ email, password }) {
  if (!email || !password) throw new Error("Email and password are required.");
  const existing = getCurrentUser();
  const user = existing?.email === email ? existing : { id: crypto.randomUUID(), name: "User", email };
  setCurrentUser(user);
  return user;
}

export function logout() {
  setCurrentUser(null);
}

export function requestPasswordReset(email) {
  if (!email) throw new Error("Email is required.");
  const tokens = readJson(RESET_KEY, {});
  const token = crypto.randomUUID();
  tokens[token] = { email, createdAt: Date.now() };
  writeJson(RESET_KEY, tokens);
  return token;
}

export function resetPassword({ token, password }) {
  if (!token) throw new Error("Invalid reset link.");
  if (!password || password.length < 6) throw new Error("Password must be at least 6 characters.");
  const tokens = readJson(RESET_KEY, {});
  if (!tokens[token]) throw new Error("Reset link is expired or invalid.");
  delete tokens[token];
  writeJson(RESET_KEY, tokens);
  return true;
}

