import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

const TopProductsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard/top-products")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!Array.isArray(data) || data.length === 0)
    return <p>No Data</p>;

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [{
      label: "Total Sold",
      data: data.map(item => item.totalSold),
      backgroundColor: "#10b981"
    }]
  };

  return <Bar data={chartData} />;
};

export default TopProductsChart;