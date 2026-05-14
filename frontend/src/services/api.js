const BASE_URL = "http://localhost:5000/api";

export const fetchProducts = async (search = "", category = "") => {
  const res = await fetch(
    `${BASE_URL}/products?search=${search}&category=${category}`
  );
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const seedProducts = async () => {
  const res = await fetch(`${BASE_URL}/products/seed`);
  return res.json();
};