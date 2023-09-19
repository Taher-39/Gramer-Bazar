export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/auth/signUp", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
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

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/auth/signIn", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
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

export function signOut(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will remove user session info
    resolve({ data: "success" });
  });
}
