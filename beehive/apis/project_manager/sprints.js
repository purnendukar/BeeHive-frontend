import { PROJECT_API } from "../routes";
import { getQueryString } from "../utils";

// Sprint APIs function

export const getSprintList = async (token, project_id, query = {}) => {
  const query_string = getQueryString(query);
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

export const getSprint = async (token, project_id, id) => {
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

export const createSprint = async (token, project_id, body) => {
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

export const updateSprint = async (token, project_id, body, id) => {
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
