export function createUser(userData) {
return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //todo: on server get limited data (not password)
    resolve({ data });
  });
}

export async function checkIfEmailExists(email) {
  const response = await fetch("http://localhost:4000/users");
  const data = await response.json();
  const existingUser = data.find((user) => user.email === email);
  return !!existingUser; // Return true if the user exists, false otherwise
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:4000/users?email=" + email);
    const data = await response.json();
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "User credential wrong" });
      }
    } else {
      reject({ message: "User not found" });
    }
  });
}



