export function fetchUserOrders(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/orders/?user.id="+userId);
    const data = await response.json();
    resolve({ data });
  });
}
