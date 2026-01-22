// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const SalesChart = () => {
//   const [type, setType] = useState('monthly');
//   const [data, setDate] = useState([]);

//   useEffect(() =>{
//     axios.get(`http://localhost:5000/api/admin/sales-graph?type=${type}`).then(res =>{
//       setDate(res.data);
//     })
//     .catch(err => console.error("Sales graph error ",err));
//   }, [type]);

//   return (
//     <>
//      <div style={{ marginBottom: "10px" }}>
//         <select name={type} onChange={(e)=> setType(e.target.value)}>
//           <option value="daily">Daily</option>
//           <option value="daily">Weekly</option>
//           <option value="daily">Monthly</option>
//         </select>
//       </div>
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
//         <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
//       </LineChart>
//     </ResponsiveContainer>
//     </>
//   );
// };

// export default SalesChart;

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SalesChart = () => {
  const [data, setData] = useState([]);

  const staticData = [
    { month: "Jan", total: 12000 },
    { month: "Feb", total: 18000 },
    { month: "Mar", total: 15000 },
    { month: "Apr", total: 22000 },
    { month: "May", total: 26000 },
    { month: "Jun", total: 30000 },
    { month: "Jul", total: 28000 },
    { month: "Aug", total: 35000 },
    { month: "Sep", total: 40000 },
    { month: "Oct", total: 38000 },
    { month: "Nov", total: 45000 },
    { month: "Dec", total: 52000 }
  ];

  useEffect(() => {
    setData(staticData);
  }, []);

  return (
    <>
      <h3>Monthly Sales Report</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesChart;
