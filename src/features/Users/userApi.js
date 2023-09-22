export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/orders/?user=" + userId
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchLoggedInUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/auth/" + userId);
    const data = await response.json();
    resolve({ data });
  });
}

export function updateUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:4000/auth/" + userData.id,
        {
          method: "PATCH",
          body: JSON.stringify(userData),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
