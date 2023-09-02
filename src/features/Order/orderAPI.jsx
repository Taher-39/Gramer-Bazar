export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
