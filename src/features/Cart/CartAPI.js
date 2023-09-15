export function AddToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchCartById(id) {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart?user=" + id);
    const data = await response.json();
    resolve({ data });
  });
}

export function UpdateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function RemoveCartItem(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:4000/cart/" + itemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data: { id: itemId } });
    } catch (error) {
      reject(error);
    }
  });
}

export function restCart(userId) {
  return new Promise(async (resolve) => {
    const responce = await fetchCartById(userId);
    const items = responce.data;
    for (let item of items) {
      await RemoveCartItem(item.id);
    }
    resolve({ status: "success" });
  });
}
