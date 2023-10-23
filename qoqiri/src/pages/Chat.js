import React, { useState, useEffect } from 'react';
import { getChatRooms } from '../api/chat';

const Chat = () => {
  const [roomName, setRoomName] = useState('');
  const [chatrooms, setChatrooms] = useState(null);

  const chatRoomAPI = async () => {
    const result = await getChatRooms();
    setChatrooms(result.data)
  }

  useEffect(() => {
    chatRoomAPI();
  }, []);


  // const createRoom = () => {
  //   if (roomName === '') {
  //     alert('방 제목을 입력해 주십시요.');
  //     return;
  //   }
    
  //   const data = { name: roomName }

  //   axios.post("http://localhost:8080/chat/room", data)
  //     .then(response => {
  //       alert(`${room_name} 방 개설에 성공하였습니다.`);
  //       console.log(room_name)
  //       setRoomName('');
  //     })
  //     .catch(error => {
  //       alert('채팅방 개설에 실패하였습니다.');
  //       console.log(room_name)
  //     });
  // }

  const enterRoom = (chatRoomSEQ) => {
    const sender = prompt('대화명을 입력해 주세요.');
    if (sender !== null && sender !== '') {
      localStorage.setItem('wschat.sender', sender);
      localStorage.setItem('wschat.roomId', chatRoomSEQ);
      window.location.href = `/chatRoom/${chatRoomSEQ}`;
    }
  }

  return (
    <div className="container" id="app">
      <div className="row">
        <div className="col-md-12">
          <h3>채팅방 리스트</h3>
        </div>
      </div>
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          // onKeyUp={(e) => { if (e.key === 'Enter') createRoom(); }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            // onClick={createRoom}
          >
            채팅방 개설
          </button>
        </div>
      </div>
      <ul className="list-group">
        {chatrooms?.map((chatRoom) => (
          <li
            key={chatRoom.chatRoomSEQ}
            className="list-group-item list-group-item-action"
            onClick={() => enterRoom(chatRoom.chatRoomSEQ)}
          >
            {chatRoom.post.postTitle}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
