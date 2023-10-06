import styled from 'styled-components';
import React from 'react';
const StyledNavBtn = styled.div`
    .navbutton {
        position: fixed;
        right: 25px;
        bottom: 40px;
        display: flex;
        flex-direction: column;
        gap: 5px;
        row-gap: 5px;
        column-gap: 5px;
        align-items: center;
        justify-content: center;  
        
    }
    a{
        display: flex;
        justify-content: center; 
        width: 30px;
        height: 30px;
        background-color: #ff7f38;       
        text-decoration: none;
        padding-top: 5px;
        border-radius: 5px;
        color: white;
    }
    q{
        color: white;
        font-weight: 900;
    }
`;



const NavBtn = () => {
    return (
        <StyledNavBtn>
            <div className="navbutton">
                <a href="javascript:window.scrollTo({top: 0, behavior: 'smooth'});" title="위로">
                    <i className="q">△</i>
                </a>
                <a href="javascript:window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});" title="아래로">
                    <i className="q">▽</i>
                </a>
            </div>
        </StyledNavBtn>
    );
};

export default NavBtn;
