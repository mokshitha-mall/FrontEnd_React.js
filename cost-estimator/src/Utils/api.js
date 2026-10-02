// Change this to true to test the error screen
const SIMULATE_ERROR = false;

const DB_URL = "/db.json";

async function fetchHttp(url, signal, delayMs = 600) {
  // Check if request was already cancelled
  if (signal?.aborted) {
    throw new DOMException("The operation was aborted", "AbortError");
  }

  // Fetch data
  const response = await fetch(url, {
    signal,
  });

  // Check HTTP error
  if (!response.ok) {
    throw new Error("Unable to load data. Please try again.");
  }

  // Convert response to JSON
  const data = await response.json();

  // Artificial delay so skeleton can be seen
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  // Simulate error if needed
  if (SIMULATE_ERROR) {
    throw new Error("Unable to load projects. Please try again.");
  }

  return data;
}

// Get projects
export async function getProjects({ signal } = {}) {
  const data = await fetchHttp(DB_URL, signal);

  return data.projects;
}

// Get users
export async function getUsers({ signal } = {}) {
  const data = await fetchHttp(DB_URL, signal);

  return data.users;
}