import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FarmerProfile.css";

const API = process.env.REACT_APP_API_URL;

function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFarmerProfile();
    // eslint-disable-next-line
  }, []);

  const fetchFarmerProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmer(res.data);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `${API}/api/auth/update-profile`,
        {
          phone: farmer.phone,
          village: farmer.village,
          farmName: farmer.farmName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      alert("Profile update failed.");
    }
  };

  if (!farmer) return <h2 style={{ padding: 20 }}>Loading...</h2>;

  return (
    <div className="farmer-profile-container">
      <h1>My Profile</h1>

      <div className="farmer-card">
        <h2>{farmer.name}</h2>
        <p><b>Email:</b> {farmer.email}</p>

        {editMode ? (
          <>
            <input
              value={farmer.phone || ""}
              onChange={(e) => setFarmer({ ...farmer, phone: e.target.value })}
              placeholder="Phone"
            />
            <input
              value={farmer.village || ""}
              onChange={(e) => setFarmer({ ...farmer, village: e.target.value })}
              placeholder="Village"
            />
            <input
              value={farmer.farmName || ""}
              onChange={(e) => setFarmer({ ...farmer, farmName: e.target.value })}
              placeholder="Farm Name"
            />

            <button onClick={updateProfile}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><b>Phone:</b> {farmer.phone || "Not added"}</p>
            <p><b>Village:</b> {farmer.village || "Not added"}</p>
            <p><b>Farm Name:</b> {farmer.farmName || "Not added"}</p>

            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default FarmerProfile;
