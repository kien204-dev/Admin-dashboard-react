const BASE_URL = "https://the-wild-oasis-api.vercel.app/api";

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API lỗi: ${res.status}`);
  return res.json();
}

export const getCabins     = () => apiFetch("cabins");
export const getCabin      = (id) => apiFetch(`cabins/${id}`);
export const getGuests     = () => apiFetch("guests");
export const getSettings   = () => apiFetch("settings");
export const getBookings   = () => apiFetch("bookings");
export const createBooking = (data) =>
  apiFetch("bookings", { method: "POST", body: JSON.stringify(data) });