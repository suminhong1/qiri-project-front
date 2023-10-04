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

const LoginNav = () => {
    return (
        <StyledNavBtn>
            <div className="navbutton">
                <a href="#" title="위로">
                    <i className="fa-solid fa-caret-up">::before</i>
                </a>
                <a href="#" title="댓글로"></a>
                <a href="#" title="아래로">
                    <i className="fa-solid fa-caret-down">:: before</i>
                </a>
                <a className="newWrite" href="#"></a>
            </div>
        </StyledNavBtn>
    );
};

export default LoginNav;
