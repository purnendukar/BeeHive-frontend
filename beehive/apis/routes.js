// API Prefix
const API_PREFIX = "/api";

// Base API Endpoint
const BASE_URL = process.env.api_host + API_PREFIX;

// AUTH API
const AUTH_PREFIX = BASE_URL + "/auth";
const LOGIN_API = AUTH_PREFIX + "/login";
const SIGNUP_API = AUTH_PREFIX + "/signup";
const LOGOUT_API = AUTH_PREFIX + "/logout";

// Project Manager API
const PROJECT_MANAGER_PREFIX = BASE_URL + "/project-manager";

const PROJECT_API = PROJECT_MANAGER_PREFIX + "/projects";
const SPRINT_API = PROJECT_MANAGER_PREFIX + "/sprints";
const TASK_API = PROJECT_MANAGER_PREFIX + "/tasks";

export { LOGIN_API, SIGNUP_API, LOGOUT_API, PROJECT_API, SPRINT_API, TASK_API };
