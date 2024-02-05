import React from "react";
import ProfileForm from "../components/ProfileForm";
import { useParams } from "react-router-dom";

const Mini = () => {
  const { userId } = useParams();

  return <ProfileForm userId={userId} />;
};

export default Mini;
