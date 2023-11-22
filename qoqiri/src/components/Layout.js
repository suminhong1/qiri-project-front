import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";

const Layout = () => {
  const stompClient = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws/notification");

    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeader: {},
      reconnectDelay: 10000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 5000,
    });
    stompClient.current.onConnect = (frame) => {
      stompClient.current.subscribe(
        `/sub/notification/${user.id}`,
        (message) => {}
      );
    };

    return () => {
      if (stompClient.current.active) {
        stompClient.current.deactivate();
      }
    };
  }, [user]);

  return (
    <>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
