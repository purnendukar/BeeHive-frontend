import { LOGIN_API, LOGOUT_API, SIGNUP_API } from "./routes";

export const login = async (body) => {
  const res = await fetch(LOGIN_API, {
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    method: "POST",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const signup = async (body) => {
  const res = await fetch(SIGNUP_API, {
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    method: "POST",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const logout = async (body) => {
  const res = await fetch(LOGOUT_API, {
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
    method: "POST",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};
