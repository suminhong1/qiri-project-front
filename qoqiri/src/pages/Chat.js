import { useEffect } from "react";

const Chat = () => {
  var sock = new SockJS("http://localhost:8080/chat");
  let client = Stomp.over(sock);
  useEffect(() => {
    client.connect({},() => {
        console.log('Connected : ' + auth.userInfo.userNickname)
        client.send("/app/join", {}, JSON.stringify(auth.userInfo.userId))

        client.send(`/app/chat/${(메세지받을대상)userInfo.userId}`,{},JSON.stringify(res.data))

        client.subscribe('/queue/addChatToClient/'+auth.userInfo.userId, function(chatMessage) {
            const chatmessage = JSON.parse(chatMessage.body)
        })
    })
    return () => client.disconnect();
  }, [client, auth.userInfo.userId, dispatch]);
};
