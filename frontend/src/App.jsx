import { useEffect, useState } from "react";
import { fetchAlerts, API_URL } from "./services/api";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({ country: "", city: "", visaType: "Tourist" });

  // fetching alerts from backened
  useEffect(() => {
    const getData = async () => {
      const data = await fetchAlerts();
      setAlerts(data);
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create alert");
      const newAlert = await res.json();
      setAlerts([...alerts, newAlert]);
      setForm({ country: "", city: "", visaType: "Tourist" }); // reset form
    } catch (err) {
      console.error("Error creating alert:", err);
    }
  };


  // updating the status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updatedAlert = await res.json();
      setAlerts(alerts.map((a) => (a.id === id ? updatedAlert : a)));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Deleting the alert
  const deleteAlert = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (res.status !== 204) throw new Error("Failed to delete alert");
      setAlerts(alerts.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting alert:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Visa Alert Tracker</h1>

      {/* Creating Alert Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <select name="visaType" value={form.visaType} onChange={handleChange}>
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Student">Student</option>
        </select>
        <button type="submit">Create Alert</button>
      </form>

      {/* Alerts Table */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Country</th>
            <th>City</th>
            <th>Visa Type</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.id}</td>
              <td>{alert.country}</td>
              <td>{alert.city}</td>
              <td>{alert.visaType}</td>
              <td>{alert.status}</td>
              <td>{new Date(alert.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => {
                    const nextStatus =
                      alert.status === "Active"
                        ? "Booked"
                        : alert.status === "Booked"
                          ? "Expired"
                          : "Active";
                    updateStatus(alert.id, nextStatus);
                  }}
                >
                  Change Status
                </button>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this alert?")) {
                      deleteAlert(alert.id);
                    }
                  }}
                  style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
