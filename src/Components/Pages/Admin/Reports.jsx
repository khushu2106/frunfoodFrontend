import React, { useState } from "react";
import axios from "axios";
import "./Reports.css"

const AdminReports = () => {

  const [type, setType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const validate = () => {
    if (!startDate || !endDate)
      return "Please select both dates";

    if (new Date(startDate) > new Date(endDate))
      return "Start date cannot be after End date";

    if (new Date(endDate) > new Date())
      return "Future dates not allowed";

    return null;
  };

  const fetchReport = async () => {
    setError("");
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      const res = await axios.get(
        "http://localhost:5000/api/reports",
        { params: { type, startDate, endDate } }
      );
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch report");
      setData([]);
    }
  };

  const downloadPDF = () => {
    const validationError = validate();
    if (validationError) return setError(validationError);

    window.open(
      `http://localhost:5000/api/reports/pdf?type=${type}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  return (
    <div>
      <h2>Generate Reports</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="sales">Sales Report</option>
        <option value="orders">Order Report</option>
        <option value="customers">Customer Report</option>
        <option value="products">Product Report</option>
        <option value="payments">Payment Report</option>
        <option value="feedback">Feedback Report</option>
        <option value="cancelled_orders">Cancelled Orders Report</option>
        <option value="offers">Offer Report</option>
        <option value="stock">Stock Report</option>
        <option value="delivery">Delivery Report</option>
      </select>

      <br /><br />

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <br /><br />

      <button onClick={fetchReport}>Generate</button>
      <button onClick={downloadPDF}>Download PDF</button>

      <hr />

      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReports;