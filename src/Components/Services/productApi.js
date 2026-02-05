const BASE_URL = "http://localhost:5000/api/products";

export const getAllProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const searchProducts = async (q) => {
  const res = await fetch(`${BASE_URL}/search?q=${q}`);
  return res.json();
};

export const filterProducts = async (filters) => {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${BASE_URL}/filter?${params}`);
  return res.json();
};
