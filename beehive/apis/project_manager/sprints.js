import { SPRINT_API } from "../routes";

// Sprint APIs function

export const getSprintList = async (token) => {
  const res = await fetch(SPRINT_API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    method: "GET",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const getSprint = async (token, id) => {
  const res = await fetch(SPRINT_API + `/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    method: "GET",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const createSprint = async (token, body) => {
  const res = await fetch(SPRINT_API, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    method: "POST",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const updateSprint = async (token, body, id) => {
  const res = await fetch(SPRINT_API + `/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + token,
    },
    body: body,
    method: "POST",
  });
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};
