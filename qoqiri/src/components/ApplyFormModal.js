import Profile from "./Profile";
import styled from "styled-components";
const StyledApplyForm = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.2);
`;

const ApplyFormModal = ({ userId, postSEQ }) => {
  return (
    <StyledApplyForm>
      <Profile userId={userId} postSEQ={postSEQ} />
    </StyledApplyForm>
  );
};
export default ApplyFormModal;
