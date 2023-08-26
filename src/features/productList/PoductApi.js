// A mock function to mimic making an async request for data
export function fetchCount() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    resolve({ data });
  });
}
