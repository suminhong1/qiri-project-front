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
    button {
        display: flex;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: #ff7f38;
        text-decoration: none;
        padding-top: 5px;
        border-radius: 5px;
        color: white;
        border: none;
    }
    q {
        color: white;
        font-weight: 900;
    }
`;

const NavBtn = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };
    return (
        <StyledNavBtn>
            <div className="navbutton">
                <button onClick={scrollToTop} title="위로">
                    <div className="q">△</div>
                </button>
                <button onClick={scrollToBottom} title="아래로">
                    <div className="q">▽</div>
                </button>
            </div>
        </StyledNavBtn>
    );
};

export default NavBtn;
