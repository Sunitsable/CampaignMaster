import React, { useState } from 'react';
import axios from 'axios';
import './TrackPerfom.css'; // Import the CSS file

const TrackPerfom = () => {
    const [formData, setFormData] = useState({
        days: '',
        max_bid_cpm: '',
        impressions: '',
        cost: ''
    });

    const [performanceResult, setPerformanceResult] = useState(null);
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
            // Send POST request to Express server
            const response = await axios.post('http://localhost:5000/performance', formData);
    
            // Check if response data has the expected fields
            const { predicted_clicks, engagement_rate, cost_per_click, estimated_reach } = response.data;
    
            if (predicted_clicks !== undefined && engagement_rate !== undefined && cost_per_click !== undefined && estimated_reach !== undefined) {
                // Set the result and clear any previous error
                setPerformanceResult({
                    predicted_clicks,
                    engagement_rate,
                    cost_per_click,
                    estimated_reach
                });
                setError(null);
            } else {
                // Handle case where response format is unexpected
                setError('Invalid response format');
                setPerformanceResult(null);
            }
        } catch (error) {
            // Log and set error message if request fails
            console.error('Error:', error.message);
            setError('An error occurred while processing the request.');
            setPerformanceResult(null);
        }
    };

    return (
        <div className="container">
            <header className="page-header">
                <h1>Unlock Your Campaign’s Potential</h1>
                <p>Get insights and predictions to optimize your marketing efforts.</p>
            </header>
            <form onSubmit={handleSubmit} className='form-container'>
                <div className="form-group">
                    <label htmlFor="days">No of Days</label>
                    <input type="number" className="form-control" id="days" name="days" value={formData.days} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="max_bid_cpm">Max Bid CPM</label>
                    <input type="number" className="form-control" id="max_bid_cpm" name="max_bid_cpm" value={formData.max_bid_cpm} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="impressions">Impressions</label>
                    <input type="number" className="form-control" id="impressions" name="impressions" value={formData.impressions} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Media Cost</label>
                    <input type="number" className="form-control" id="cost" name="cost" value={formData.cost} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary"style={{fontSize:'20px'}}>Get performance of your campaign</button>
            </form>

            {performanceResult && (
                <div className="results-container">
                    <h2>Performance Prediction</h2>
                    <p><strong>Predicted Clicks:</strong> {performanceResult.predicted_clicks}</p>
                    <p><strong>Engagement Rate:</strong> {performanceResult.engagement_rate.toFixed(2)}%</p>
                    <p><strong>Cost Per Click:</strong> ${performanceResult.cost_per_click.toFixed(2)}</p>
                    <p><strong>Estimated Reach:</strong> {performanceResult.estimated_reach}</p>
                </div>
            )}
            {error && <div className="text-danger">{error}</div>}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="go-home-button" onClick={handleGoHome}>Go to Homepage</button>
        </div>
    );
}

export default TrackPerfom;
