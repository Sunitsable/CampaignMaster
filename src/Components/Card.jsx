import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
    width: 900px; /* Adjust width as needed */
    height: 550px; /* Set a fixed height */
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 70%; /* Adjust to keep the aspect ratio */
    object-fit: cover;
`;

const CardContent = styled.div`
    padding: 10px;
    text-align: center;
`;

const Card = ({ cardname, link, image }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <CardContainer onClick={handleClick}>
            <CardImage src={image} alt={cardname} />
            <CardContent>
                <h2 style={{fontSize:'70px'}}>{cardname}</h2>
            </CardContent>
        </CardContainer>
    );
};

export default Card;
