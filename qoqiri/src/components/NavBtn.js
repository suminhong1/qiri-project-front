import styled from 'styled-components';

const StyledNavBtn = styled.NavBtn`
    .NavBtn {
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
`;

const NavBtn = () => {
    return (
        <StyledNavBtn>
            <div className="navbutton">
                <a href="#" title="위로">
                    <i className="fa-solid fa-caret-up">::before</i>
                </a>
                <a href="#" title="아래로">
                    <i className="fa-solid fa-caret-down">:: before</i>
                </a>
            </div>
        </StyledNavBtn>
    );
};

export default NavBtn;
