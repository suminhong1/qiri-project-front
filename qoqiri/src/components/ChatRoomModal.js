import styled from "styled-components";
import ChatRoom from "./ChatRoom";
import { Modal } from "react-bootstrap";

const CustomModal = styled(Modal)`
  & .modal-dialog {
    min-width: 900px;
    min-height: 900px;
  }

  & .modal-content {
    height: 900px;
  }
  & .modal-body {
  }
`;

const ChatRoomModal = ({ show, handleClose, chatRoomId }) => {
  if (show && chatRoomId !== null) {
    return (
      <CustomModal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChatRoom chatRoomId={chatRoomId} />
        </Modal.Body>
      </CustomModal>
    );
  }

  // chatRoomId가 null이거나 show가 false인 경우 모달을 렌더링하지 않음
  return null;
};

export default ChatRoomModal;
