import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getChatRoom } from "../api/chat";
import SockJS from "sockjs-client";
import StompJs from 'stompjs';

const ChatRoom = () => {

    const sock = new SockJS('http://localhost:8080/ws');
    const ws= StompJs.over(sock);

    const [roomSEQ, setRoomSEQ] = useState('');
    const [room, setRoom] = useState({});
    const [sender, setSender] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [reconnect, setReconnect] = useState(0);

    const {id} = useParams();

    const getChatRoomAPI = async () => {
        const result = await getChatRoom(id);
        setRoom(result.data);
    }


    const sendMessage = () => {
        ws.send('pub/chat/message', {}, JSON.stringify({
            type: 'TALK',
            roomSEQ: roomSEQ,
            sender: sender,
            message: message
        }));
        setMessage('');
    };

    const recvMessage = (recv) => {
        setMessages([{
            type: recv.type, sender: recv.type == 'ENTER' ? '[알림]' : recv.sender, message: recv.message }, ...messages]);
    };

    const connectWebSocket = () => {
        ws.connect({}, (Frame) => {
            ws.subscribe(`/sub/chat/room/${roomSEQ}`, (message) => {
                const recv = JSON.parse(message.body);
                recvMessage(recv);
            });
            ws.send('/pub/chat/message', {}, JSON.stringify({
                type: 'ENTER',
                roomSEQ: roomSEQ,
                sender: sender
            }));
        }, (error) => {
            if(reconnect <= 5) {
                setTimeout(() => {
                    console.log('connection reconnect');
                    sock = new SockJS('/ws-stomp');
                    ws = StompJs.over(sock);
                    connectWebSocket();
                    setReconnect(reconnect + 1);
                }, 10 * 1000);
            }
        });
     };
    
    useEffect(() => {
         setRoomSEQ(localStorage.getItem('wschat.roomId'));
        setSender(localStorage.getItem('wschat.sender'));
        getChatRoomAPI();
        connectWebSocket();

        return () => {
          if (sock) {
            sock.close();
          }
        };
      }, []);

    return (
        <div className="container" id="app">
          <div>
            <h2>{room?.chatRoomSEQ}</h2>
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <label className="input-group-text">내용</label>
            </div>
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') sendMessage();
              }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={sendMessage}
              >
                보내기
              </button>
            </div>
          </div>
          <ul className="list-group">
            {messages.map((message, index) => (
              <li className="list-group-item" key={index}>
                {message.sender} - {message.message}
              </li>
            ))}
          </ul>
          <div></div>
        </div>
      );
}
export default ChatRoom;