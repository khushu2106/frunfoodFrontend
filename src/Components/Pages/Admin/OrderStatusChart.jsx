import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js components register karna zaroori hai
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrderStatusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/dashboard/order-status")
      .then(res => setData(res.data))
      .catch(err => console.error("API Error:", err));
  }, []);

  if (!Array.isArray(data) || data.length === 0)
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>No Data Available</p>;

  const chartData = {
    // Null ko "Pending" mein convert karne ke liye logic
    labels: data.map(item => item.status === null ? "Pending" : item.status.toUpperCase()),
    datasets: [{
      label: "Total Orders",
      data: data.map(item => item.total),
      // Dynamic colors: Paid ke liye Green, baki sab (Pending) ke liye Orange/Yellow
      backgroundColor: data.map(item => 
        item.status === "paid" ? "rgba(34, 197, 94, 0.8)" : "rgba(245, 158, 11, 0.8)"
      ),
      borderColor: data.map(item => 
        item.status === "paid" ? "rgb(34, 197, 94)" : "rgb(245, 158, 11)"
      ),
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // Legend hide kiya hai kyunki single dataset hai
      title: { display: true, text: 'Order Status Overview' }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrderStatusChart;