import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background-color: #f4f4f4;
`;

const Header = styled.header`
  width: 100%;
  background-color: #4a90e2;
  color: #fff;
  padding: 20px 0;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  margin: 0;

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
  }

  li {
    margin: 0 15px;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    transition: color 0.3s;
  }

  a:hover {
    color: #ffcc00;
  }
`;

const MainContent = styled.main`
  margin-top: 80px;  /* Adjust this value according to the height of the header */
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  width: 90%;
  max-width: 1200px;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 40px 0;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f9f9f9;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 10px;
  font-size: 1.5em;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #f9f9f9;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    font-size: 1em;
  }

  th {
    background-color: #e1e1e1;
    color: #333;
  }
`;

const Loading = styled.div`
  font-size: 1.5em;
  color: #333;
  margin-top: 50px;
`;

const InputContainer = styled.div`
  margin: 20px 0;
  text-align: center;

  input[type="number"] {
    padding: 10px;
    font-size: 1em;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  textarea {
    padding: 10px;
    font-size: 1em;
    width: 100%;
    max-width: 600px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  button {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #4a90e2;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #357ab8;
    }
  }
`;

const UserActivityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
`;

const UserActivityCard = styled.div`
  flex: 1 1 30%;
  min-width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BestTime = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [hour, setHour] = useState('');
  const [activity, setActivity] = useState({});
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [sentimentError, setSentimentError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5500/optimize-schedule');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (hour) {
      try {
        const response = await axios.get(`http://127.0.0.1:5500/user-activity?hour=${hour}`);
        setActivity(response.data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    }
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
  const handleSentimentAnalysis = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5500/sentiment-analysis', { text });
      setSentiment(response.data);
      setSentimentError(null);
    } catch (error) {
      setSentiment(null);
      setSentimentError('Error analyzing sentiment');
      console.error('Error analyzing sentiment:', error);
    }
  };

  const renderTopTimes = () => {
    return Object.entries(data).map(([platform, hours]) => (
      <div key={platform} style={{ flex: '1 1 30%', minWidth: '300px' }}>
        <Section>
          <Title>Top 10 Best Times for {platform}</Title>
          <DataTable>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Hour</th>
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{hour}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Section>
      </div>
    ));
  };

  const renderUserActivity = () => {
    const renderSummary = () => {
      return (
        <UserActivityContainer>
          {Object.entries(data).map(([platform, hours]) => {
            const totalActivity = hours.reduce((sum, hour) => sum + hour, 0);
            return (
              <UserActivityCard key={platform}>
                <h4>{platform}</h4>
                <p><strong>Total Activity:</strong> {totalActivity}</p>
                <p><strong>Average Activity per Hour:</strong> {(totalActivity / hours.length).toFixed(2)}</p>
              </UserActivityCard>
            );
          })}
        </UserActivityContainer>
      );
    };

    return (
      <Section id="user-activity">
        <Title>User Activity</Title>
        {renderSummary()}
        <InputContainer>
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="Enter hour (0-23)"
          />
          <button onClick={handleSearch}>Get Activity</button>
          {Object.entries(activity).length > 0 && (
            <div>
              <h3>Activity at Hour {hour}:</h3>
              <ul>
                {Object.entries(activity).map(([platform, total]) => (
                  <li key={platform}>{platform}: {total}</li>
                ))}
              </ul>
            </div>
          )}
        </InputContainer>
      </Section>
    );
  };

  const renderSentimentAnalysis = () => {
    return (
      <Section id="sentiment-analysis">
        <Title>Sentiment Analysis</Title>
        <br />
        <h2>Analyze your captions and hashtags to make an everlasting impression!!</h2>
        <InputContainer>
          <textarea
            rows="5"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
          />
          <br />
          <button onClick={handleSentimentAnalysis}>Analyze Sentiment</button>
          {sentiment && (
            <div>
              <h3>Sentiment Analysis Result:</h3>
              <p><strong>Sentiment:</strong> {sentiment.sentiment}</p>
              <p><strong>Score:</strong> {(sentiment.score * 100).toFixed(2)}%</p>
            </div>
          )}
          {sentimentError && <p style={{ color: 'red' }}>{sentimentError}</p>}
        </InputContainer>
      </Section>
    );
  };

  return (
    <Container>
      <Header>
        <h1 style={{fontSize:'50px'}}>Optimal strategies to reach out to lakhs of People!!</h1>
        <button className="logout-button" onClick={handleLogout}style={{fontSize:'30px'}}>Logout</button>
      <button className="go-home-button" onClick={handleGoHome} style={{fontSize:'30px'}}>Go to Homepage</button>
        <Nav>
          <ul>
          <li><a href="#best-time" style={{fontSize:'30px'}}>Best Time to Post</a></li>
            <li><a href="#user-activity"style={{fontSize:'30px'}}>User Activity</a></li>
            
            <li><a href="#sentiment-analysis"style={{fontSize:'30px'}}>Sentiment Analysis</a></li>
          </ul>
        </Nav>
      </Header>
      <MainContent>
        {loading ? <Loading>Loading...</Loading> : (
          <Section id="best-time">
            <Title>Best Time to Post</Title>
            <FlexContainer>
              {renderTopTimes()}
            </FlexContainer>
          </Section>
        )}
        {renderUserActivity()}
        {renderSentimentAnalysis()}
      </MainContent>
    </Container>
  );
};

export default BestTime;
