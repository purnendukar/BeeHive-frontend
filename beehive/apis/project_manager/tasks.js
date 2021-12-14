import { TASK_API } from "../routes";
import { getQueryString } from "../utils";

// Task APIs function

export const getTaskList = async (token, query = {}) => {
  const query_string = getQueryString(query);
  const URL = query_string == "" ? TASK_API : `${TASK_API}?${query_string}`;
  const res = await fetch(URL, {
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

export const getTask = async (token, id) => {
  const res = await fetch(TASK_API + `/${id}`, {
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

export const createTask = async (token, body) => {
  const res = await fetch(TASK_API, {
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

export const updateTask = async (token, body, id) => {
  const res = await fetch(TASK_API + `/${id}`, {
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
