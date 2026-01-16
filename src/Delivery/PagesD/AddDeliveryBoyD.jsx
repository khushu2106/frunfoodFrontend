import "./AddDeliveryBoyD.css";
import { useState } from "react";

const AddDeliveryBoyD = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    vehicleNumber: "",
    address: "",
    vehicleType: "Bike",
    status: "Disable",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  return (
    <div className="addDB-container">
      <div className="addDB-card">
        <h2 className="addDB-title">Add Delivery Boy</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Telephone"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Enter the Address"
            rows="3"
            onChange={handleChange}
          ></textarea>

          <div className="select-group">
            <label>Vehicle Type</label>
            <select name="vehicleType" onChange={handleChange}>
              <option>Bike</option>
              <option>Scooter</option>
              <option>Cycle</option>
            </select>
          </div>

          <div className="select-group">
            <label>Delivery Boy Status</label>
            <select name="status" onChange={handleChange}>
              <option>Disable</option>
              <option>Enable</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Add Delivery Boy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryBoyD;
