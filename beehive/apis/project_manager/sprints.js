import { PROJECT_API } from "../routes";
import { getQueryString } from "../utils";

// Sprint APIs function

export const getSprintList = async (token, project_id, queryString) => {
  const query_string = getQueryString(queryString);
  const SPRINT_API = PROJECT_API + `/${project_id}/sprints`;
  const res = await fetch(
    query_string == "" ? SPRINT_API : SPRINT_API + `?${query_string}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      method: "GET",
    }
  );
  const status = await res.status;
  const result = await res.json();
  return [status, result];
};

export const getSprint = async (token, id) => {
  const SPRINT_API = PROJECT_API + `/${project_id}/sprints`;
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
  const SPRINT_API = PROJECT_API + `/${project_id}/sprints`;
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
  const SPRINT_API = PROJECT_API + `/${project_id}/sprints`;
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
