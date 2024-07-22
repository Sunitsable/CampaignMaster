import styled from "styled-components";
import { mobile, mobileL, mobileS, sharedMobileMandL, tablet } from "../Responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: start;

    ${mobile({ padding: "0" })}
    ${mobileL({ padding: "10px" })}
    ${sharedMobileMandL({
        height: "180vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    })}
    ${tablet({
        height: "150vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
    })}
    ${mobileS({
        height: "150vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
    })}
`;

const Left = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 0;

    ${sharedMobileMandL({
        width: "80%",
        alignItems: "center",
    })}
    ${tablet({
        width: "80%",
        alignItems: "center",
    })}
    ${mobileS({
        width: "90%",
        alignItems: "center",
    })}
`;

const Title = styled.h1`
    color: hsl(228, 39%, 23%);
    font-weight: 800;
    font-size: 100px;
    margin-bottom: 20px;

    ${mobile({ fontSize: "30px" })}
    ${mobileL({ fontSize: "20px" })}
    ${sharedMobileMandL({
        textAlign: "center",
        marginBottom: "40px",
    })}
    ${mobileS({
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "26px",
    })}
    ${tablet({
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "40px",
    })}
`;

const Desc = styled.p`
    color: hsl(227, 12%, 61%);
    text-align: justify;
    letter-spacing: 1px;
    font-size: 50px;
    font-weight: 600;
    line-height: 1.5;
    width: 100%;
    margin-bottom: 30px;
    margin-left:120px;

    ${sharedMobileMandL({
        textAlign: "center",
        marginRight: "0",
    })}
    ${mobileS({
        textAlign: "center",
        margin: "10px 0",
        fontSize: "14px",
    })}
    ${tablet({
        textAlign: "center",
        marginRight: "0",
        fontSize: "18px",
    })}
`;

const ButtonIntro = styled.button`
    background-color: hsl(12, 88%, 59%);
    color: #fff;
    border: none;
    border-radius: 50px;
    height: 50px;
    padding: 0 30px;
    cursor: pointer;
    margin-top: 30px;
    margin-left:120px;

    &:hover {
        background-color: hsl(13, 100%, 70%);
    }

    ${sharedMobileMandL({
        margin: "50px 0 0 0",
    })}
    ${mobileS({
        margin: "50px 0 0 0",
    })}
    ${tablet({
        margin: "50px 0 0 0",
        justifyContent: "center",
    })}
`;

const SpanButton = styled.span`
    font-weight: 600;
`;

const Intro = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Left>
                <Title>Bring everyone together to build better products.</Title>
                <Desc>Get Predictions of Your Content, Compare the Social Media Platform for Increasing your Contents Reach.</Desc>
                <ButtonIntro onClick={() => navigate('/login')}>
                    <SpanButton>Get Started</SpanButton>
                </ButtonIntro>
            </Left>
        </Container>
    );
};

export default Intro;
