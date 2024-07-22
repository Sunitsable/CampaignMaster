import React, { useState } from 'react';
import axios from 'axios';
import './GetOptSales.css'; // Assuming you have CSS for styling

const GetOptSales = () => {
  const [formData, setFormData] = useState({
    instagram: '',
    facebook: '',
    youtube: '',
    twitter: '',
    tiktok: ''
  });

  const [sales, setSales] = useState({});
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogout = () => {
    // Logic for logging out the user
    // For example, clearing user session data and redirecting to login page
    console.log("User logged out");
    // Assuming you use localStorage to manage user sessions
    localStorage.removeItem('userSession');
    window.location.href = '/login'; // Adjust the path to your login page
};
const handleGoHome = () => {
  window.location.href = '/homepage'; // Adjust the path to your homepage
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/optimal-sales', {
            instagram: formData.instagram,
            facebook: formData.facebook,
            youtube: formData.youtube,
            twitter: formData.twitter,
            tiktok: formData.tiktok
        });

        if (response.data.error) {
            setError(response.data.error);
            setSales({});
        } else {
            setSales(response.data);
            setError(null);
        }
    } catch (error) {
        console.error('Error:', error.message);
        setError('An error occurred while processing the request.');
        setSales({});
    }
};


  return (
    <div className="getOpt">
      
                <h1>Get Optimal budget of campaigning on Social Media Platforms</h1>
                
            
      <form onSubmit={handleSubmit} className='form-container'>
        <div className='form-group'>
          <label htmlFor="instagram">Instagram</label>
          <input type="number" id="instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="facebook">Facebook</label>
          <input type="number" id="facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="youtube">YouTube</label>
          <input type="number" id="youtube" name="youtube" value={formData.youtube} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="twitter">Twitter</label>
          <input type="number" id="twitter" name="twitter" value={formData.twitter} onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor="tiktok">TikTok</label>
          <input type="number" id="tiktok" name="tiktok" value={formData.tiktok} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" style={{fontSize:'20px'}}>Get budget</button>
      </form>

      {sales.predictions && (
        <div className="sales-info">
          <h2>Budget  Information</h2>
          <p><strong>Predicted Budget:</strong> ${sales.predictions[0]}</p>
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="go-home-button" onClick={handleGoHome}>Go to Homepage</button>
    </div>
  );
};

export default GetOptSales;
