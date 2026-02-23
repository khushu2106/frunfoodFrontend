import React, { useEffect, useState } from "react";
import axios from "axios";
import "./City.css";

const City = () => {
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  const BASE_URL = "http://localhost:5000/api";

  /* ================= FETCH CITIES ================= */
  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/admin/cities`);
      setCities(res.data);
    } catch (err) {
      console.error("City fetch error:", err);
    }
  };

  /* ================= FETCH AREAS BY CITY ================= */
  const fetchAreas = async (cityId) => {
    setSelectedCity(cityId);
    setSelectedArea(null);
    setUsers([]);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/cities/${cityId}/areas`
      );
      setAreas(res.data);
    } catch (err) {
      console.error("Area fetch error:", err);
    }
  };

  /* ================= FETCH USERS BY AREA ================= */
  const fetchUsers = async (areaId) => {
    setSelectedArea(areaId);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/areas/${areaId}/users`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("User fetch error:", err);
    }
  };

  return (
    <div className="city-page">
      <h2>City Management</h2>

      <div className="city-layout">
        {/* ================= CITY LIST ================= */}
        <div className="city-box">
          <h3>Cities</h3>
          {cities.length === 0 ? (
            <p>No cities found</p>
          ) : (
            <ul>
              {cities.map((city) => (
                <li
                  key={city.city_id}
                  className={selectedCity === city.city_id ? "active" : ""}
                  onClick={() => fetchAreas(city.city_id)}
                >
                  {city.city_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ================= AREA LIST ================= */}
        <div className="city-box">
          <h3>Areas</h3>
          {!selectedCity ? (
            <p>Select a city</p>
          ) : areas.length === 0 ? (
            <p>No areas found</p>
          ) : (
            <ul>
              {areas.map((area) => (
                <li
                  key={area.area_id}
                  className={selectedArea === area.area_id ? "active" : ""}
                  onClick={() => fetchUsers(area.area_id)}
                >
                  {area.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ================= USER LIST ================= */}
        <div className="city-box">
          <h3>Users</h3>
          {!selectedArea ? (
            <p>Select an area</p>
          ) : users.length === 0 ? (
            <p>No users found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id}>
                    <td>{u.fname} {u.lname}</td>
                    <td>{u.email}</td>
                    <td>{u.mobile_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default City;