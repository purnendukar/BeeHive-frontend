import { PROJECT_API } from "../routes";

// Project Members APIs function

export const getProjectMemberList = async (token, project_id) => {
  const PROJECT_MEMBER_API = PROJECT_API + `/${project_id}/members`;
  const res = await fetch(PROJECT_MEMBER_API + `?project_id=${project_id}`, {
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

export const getProjectMember = async (token, id) => {
  const PROJECT_MEMBER_API = PROJECT_API + `/${project_id}/members`;
  const res = await fetch(PROJECT_MEMBER_API + `/${id}`, {
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

export const createProjectMember = async (token, body) => {
  const PROJECT_MEMBER_API = PROJECT_API + `/${project_id}/members`;
  const res = await fetch(PROJECT_MEMBER_API, {
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

export const updateProjectMember = async (token, body, id) => {
  const PROJECT_MEMBER_API = PROJECT_API + `/${project_id}/members`;
  const res = await fetch(PROJECT_MEMBER_API + `/${id}`, {
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
