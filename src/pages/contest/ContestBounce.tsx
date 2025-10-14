import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const ContestBounce = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/contest");
  }, []);

  return <div></div>;
};

export default ContestBounce;
