import styled from "styled-components";

import RobotLogo from "../assets/Welcome.gif";

export const Welcome =({currentUser})=>{
    return (
        <>
        <Container>
            <img src={RobotLogo} alt="" />
            <h1> Welcome, <span>{currentUser===undefined ? "" : currentUser.username}!</span></h1>
            <h3>Please Select a Chat to Start Messaging.</h3>
        </Container>
        </>
    )
}

const Container =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    gap: .5rem;
    img {
        height: 15rem;
    }

    span {
        color: #4e00ff;
    }
    
`

