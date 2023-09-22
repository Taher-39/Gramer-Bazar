export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        resolve(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
// fetch order with query id
export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:4000/orders/admin?" + queryString
      );
      const data = await response.json();
      const totalOrders = await response.headers.get("X-Total-Count");
      resolve({ data: { orders: data, totalOrders: +totalOrders } });
    } catch (error) {
      reject(error);
    }
  });
}
// update order with params id
export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/orders/" + order.id, {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const updatedOrder = await response.json();

      resolve({ data: updatedOrder });
    } catch (error) {
      reject(error);
    }
  });
}
