
export const API_URL = "http://localhost:5000/alerts";

export const fetchAlerts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Network response not ok");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching alerts:", err);
    return [];
  }
};
