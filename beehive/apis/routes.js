// API Prefix
const API_PREFIX = "/api";

// Base API Endpoint
const BASE_URL = process.env.api_host + API_PREFIX;

// AUTH API
const AUTH_PREFIX = BASE_URL + "/auth";
const LOGIN_API = AUTH_PREFIX + "/login";
const SIGNUP_API = AUTH_PREFIX + "/signup";
const LOGOUT_API = AUTH_PREFIX + "/logout";

export { LOGIN_API, SIGNUP_API, LOGOUT_API };
