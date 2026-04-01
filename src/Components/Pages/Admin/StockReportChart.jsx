import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";

const StockReportChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard/low-stock")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!Array.isArray(data) || data.length === 0)
    return <p>No Low Stock</p>;

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [{
      data: data.map(item => item.stock),
      backgroundColor: ["#ef4444","#f59e0b","#8b5cf6","#14b8a6"]
    }]
  };

  return <Pie data={chartData} />;
};

export default StockReportChart;