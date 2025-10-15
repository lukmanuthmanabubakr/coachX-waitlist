import React from "react";
import logo from "../../assets/CoachX.svg";
import subLogo from "../../assets/mainLogo.svg";
import "./WelcomeLogo.css";

const WelcomeLogo = ({ fadeOut }) => {
  return (
    <div className={`welcomeLogo ${fadeOut ? "fadeOut" : ""}`}>
      <img className="sublogo" src={subLogo} alt="Sub Logo" />
      <img className="logo" src={logo} alt="Main Logo" />
    </div>
  );
};

export default WelcomeLogo;
