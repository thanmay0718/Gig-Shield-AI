import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function errorMessage(error, fallback) {
  return error?.response?.data?.message || error?.response?.data?.error || fallback;
}

export async function loginUser(payload) {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to log in"));
  }
}

export async function registerUser(payload) {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to register"));
  }
}

export async function getWorkers() {
  try {
    const { data } = await api.get("/workers");
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load workers"));
  }
}

export async function createWorker(payload) {
  try {
    const { data } = await api.post("/workers", payload);
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to create worker"));
  }
}

export async function getPolicies() {
  try {
    const { data } = await api.get("/policies");
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load policies"));
  }
}

export async function createPolicy(payload) {
  try {
    const { data } = await api.post("/policies", payload);
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to create policy"));
  }
}

export async function getClaims() {
  try {
    const { data } = await api.get("/claims");
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load claims"));
  }
}

export async function createClaim(payload) {
  try {
    const { data } = await api.post("/claims", payload);
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to submit claim"));
  }
}

export async function getFraudAlerts() {
  try {
    const { data } = await api.get("/fraud-alerts");
    return data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load fraud alerts"));
  }
}

export default api;
