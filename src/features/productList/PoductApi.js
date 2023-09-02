export function fetchAllProducts() {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductById(id) {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/products/"+id);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination) {
  //filter = {'category': ['laptop', 'phone'] }
  //sort = {_sort:  'rating', _order: 'desc'}
  //pagination = {_page:  1, _limit: 10 }
  // TODO: on server we will support multi value
  let queryString = "";
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length > 0) {
      const lastCategory = categoryValue[categoryValue.length - 1];

      queryString += `${key}=${lastCategory}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:4000/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems:+totalItems } });
  });
}


export function fetchProductsCategory() {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/category");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsBrands() {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/brands");
    const data = await response.json();
    resolve({ data });
  });
}
