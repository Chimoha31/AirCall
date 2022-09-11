import React from "react";
import '../styles/Loader.scss';

const Loader = () => {
  return (
    <div className="lds-ring d-flex flex-column justify-content-center align-items-center" style={{height: "60vh", width: "100%"}}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
