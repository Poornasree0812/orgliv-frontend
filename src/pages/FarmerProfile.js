import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FarmerProfile.css";

function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchFarmerProfile();
  }, []);

  const fetchFarmerProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmer(res.data);
    } catch (err) {
      console.log("Profile fetch error:", err);
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/update-profile",
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
      console.log("Update error:", err);
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
              type="text"
              value={farmer.phone || ""}
              placeholder="Phone"
              onChange={(e) =>
                setFarmer({ ...farmer, phone: e.target.value })
              }
            />

            <input
              type="text"
              value={farmer.village || ""}
              placeholder="Village"
              onChange={(e) =>
                setFarmer({ ...farmer, village: e.target.value })
              }
            />

            <input
              type="text"
              value={farmer.farmName || ""}
              placeholder="Farm Name"
              onChange={(e) =>
                setFarmer({ ...farmer, farmName: e.target.value })
              }
            />

            <button className="save-btn" onClick={updateProfile}>
              Save Changes
            </button>

            <button className="cancel-btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <p><b>Phone:</b> {farmer.phone || "Not added"}</p>
            <p><b>Village:</b> {farmer.village || "Not added"}</p>
            <p><b>Farm Name:</b> {farmer.farmName || "Not added"}</p>

            <button className="edit-btn" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          </>
        )}

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
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
