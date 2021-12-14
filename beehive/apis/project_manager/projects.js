import { PROJECT_API } from "../routes";
import { getQueryString } from "../utils";

// Project APIs function

export const getProjectList = async (token) => {
  const res = await fetch(PROJECT_API, {
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

export const getProject = async (token, id) => {
  const res = await fetch(PROJECT_API + `/${id}`, {
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

export const createProject = async (token, body) => {
  const res = await fetch(PROJECT_API, {
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

export const updateProject = async (token, body, id) => {
  const res = await fetch(PROJECT_API + `/${id}`, {
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

// Project Task Status APIs function

export const getProjectStatusList = async (token, project_id, query = {}) => {
  const query_string = getQueryString(query);
  const STATUS_API = PROJECT_API + `/${project_id}/status`;
  const res = await fetch(
    query_string == "" ? STATUS_API : STATUS_API + `?${query_string}`,
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

export const getProjectStatus = async (token, project_id, id) => {
  const res = await fetch(PROJECT_STATUS_API + `/${id}`, {
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

export const createProjectStatus = async (token, project_id, body) => {
  const res = await fetch(PROJECT_STATUS_API, {
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

export const updateProjectStatus = async (token, project_id, body, id) => {
  const res = await fetch(PROJECT_STATUS_API + `/${id}`, {
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
