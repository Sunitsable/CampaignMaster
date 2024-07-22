import React from 'react';
import styled from 'styled-components';
import BgImage from './BgImage';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import ai from '../images/Ai-content-generation-blog-header.jpeg.webp';
import salesImage from '../images/sales.png';

const CatchyText = styled.h1`
    color: hsl(228, 39%, 23%);
    font-weight: 800;
    font-size: 36px;
    text-align: center;
    margin: 20px 0;
`;

const CardsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px;

    & > div {
        margin: 0 10px;
    }
`;
const handleLogout = () => {
  // Logic for logging out the user
  // For example, clearing user session data and redirecting to login page
  console.log("User logged out");
  // Assuming you use localStorage to manage user sessions
  localStorage.removeItem('userSession');
  window.location.href = '/login'; // Adjust the path to your login page
};
const HomePage = () => {
    const navigate = useNavigate();

    return (
        <BgImage>
            <CatchyText style={{fontSize:'70px'}}>Discover the Power of AI-Driven Content Creation, Performance Tracking, and More!</CatchyText>
            <button className="logout-button" onClick={handleLogout}style={{fontSize:'30px'}}>Logout</button>
            <CardsContainer>
                <Card cardname={"Generate Content"} link={"/generatecontent"} image={ai} className="feature" />
                <Card cardname={"Track Performance"} link={"/trackperformance"} image={"https://blog.vantagecircle.com/content/images/size/w1000/2021/03/Employee-tracking.png"} className="feature" />
            </CardsContainer>
            <CardsContainer>
                <Card cardname={"Get Optimal Budget"} link={"/getoptsales"} image={salesImage} className="feature" />
                <Card cardname={"Get Best Time"} link={"/bestTime"} image={"https://www.mentionlytics.com/wp-content/uploads/2023/04/Best-Time-to-post-on-Social-Media-1140x400.jpg"} className="feature" />
            </CardsContainer>
            <CardsContainer>
                <Card cardname={"Advice to Beat Competition"} link={"/gettargetaudi"} image={"https://www.teamly.com/blog/wp-content/uploads/2023/04/understanding-target-audience.png"} className="feature" />
            </CardsContainer>
        </BgImage>
    );
}

export default HomePage;
