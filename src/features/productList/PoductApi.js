export function fetchAllProducts() {
  // todo: we will not hard code server url here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/products");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter) {
  //filter = {'category': 'laptop'}
  // TODO: on server we will support multi value 
  let queryString = ''
  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
  }

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4000/products?"+queryString);
    const data = await response.json();
    resolve({ data });
  });
}

