import React from "react";
import ProfileUp from "../components/ProfileUp";
import { useParams } from "react-router-dom";

const MiniUp = () => {
  const { userId } = useParams();

  return <ProfileUp userId={userId} />;
};

export default MiniUp;
