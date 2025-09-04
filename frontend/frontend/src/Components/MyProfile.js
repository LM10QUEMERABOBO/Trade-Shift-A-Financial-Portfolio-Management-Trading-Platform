import React, { useState, useEffect } from 'react';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Must be set at login
  const storedUser = localStorage.getItem("username");
  // 🔹 Fetch user data on page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/users/${storedUser}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          setMessage("Failed to load user data.");
        }
      } catch (error) {
        setMessage("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token]);

  // 🔹 Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Handle form submit (update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (err) {
      setMessage("Error while updating profile.");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div
      className="update-profile-container"
      style={{
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ color: '#2c7be5', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        My Profile
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '600' }}>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '600' }}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '600' }}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: '600' }}>password:</label>
          <input
            type="tel"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#2c7be5',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Changes
        </button>
      </form>

      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
    </div>
  );
};

export default UpdateProfile;
