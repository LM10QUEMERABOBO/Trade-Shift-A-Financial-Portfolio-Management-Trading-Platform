import React, { useState } from 'react';

const UpdateProfile = () => {
  // Initial profile data which can be fetched from an API
  const [profile, setProfile] = useState({
    firstName: 'Krish',
    lastName: 'Soni',
    email: 'krishsoni198@gmail.com',
    phone: '8320302446',
  });

  const [formData, setFormData] = useState(profile);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually make an API call to update the profile in backend
    setProfile(formData);
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="update-profile-container" style={{boxShadow:'0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', background: '#f8f9fa', borderRadius: '8px', maxWidth: '600px', margin: '0 auto'}}>
      <h2 style={{ color: '#2c7be5', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <span className="material-icons" style={{ marginRight: '8px' }}>My</span> Profile
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ fontWeight: '600' }}>Firstname:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.firstName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ fontWeight: '600' }}>Lastname:</label>
          <input
            type="text"
            id="name"
            name="lastname"
            value={formData.lastName}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ fontWeight: '600' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="phone" style={{ fontWeight: '600' }}>Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              boxSizing: 'border-box'
            }}
            required
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
            cursor: 'pointer'
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
