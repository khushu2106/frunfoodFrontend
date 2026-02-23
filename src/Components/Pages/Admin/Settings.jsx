import { useEffect, useState } from "react";
import axios from "axios";

function Settings() {

  const [form, setForm] = useState({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const res = await axios.get("http://localhost:5000/api/settings");
    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put("http://localhost:5000/api/settings", form);
    alert("Settings Updated Successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Settings</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="website_name"
          value={form.website_name || ""}
          onChange={handleChange}
          placeholder="Website Name"
        />

        <input
          type="email"
          name="email"
          value={form.email || ""}
          onChange={handleChange}
          placeholder="Email"
        />

        <input
          type="text"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
          placeholder="Phone"
        />

        <input
          type="text"
          name="gst_number"
          value={form.gst_number || ""}
          onChange={handleChange}
          placeholder="GST Number"
        />

        {/* <input
          type="text"
          name="currency"
          value={form.currency || ""}
          onChange={handleChange}
          placeholder="Currency"
        /> */}

        <input
          type="number"
          name="tax_percentage"
          value={form.tax_percentage || ""}
          onChange={handleChange}
          placeholder="Tax %"
        />

        <input
          type="number"
          name="shipping_charge"
          value={form.shipping_charge || ""}
          onChange={handleChange}
          placeholder="Shipping Charge"
        />

        <textarea
          name="address"
          value={form.address || ""}
          onChange={handleChange}
          placeholder="Address"
        ></textarea>

        <button type="submit">Save Settings</button>

      </form>
    </div>
  );
}

export default Settings;