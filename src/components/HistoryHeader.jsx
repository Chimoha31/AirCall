import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HistoryHeader.scss";

const HistoryHeader = ({inbox, setInbox, handleSelectedInbox}) => {
  const navigate = useNavigate();
  const handleSelectedAllCalls = () => {
    setInbox(false);
    navigate("/all_calls");
  };

  return (
    <div className="d-flex justify-content-evenly align-items-center history_header">
      {inbox ? (
        <>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "900",
              color: "#333",
              borderBottom: "2px solid #f25e07",
            }}
          >
            Inbox
          </p>
          <p onClick={handleSelectedAllCalls}>All calls</p>
        </>
      ) : (
        <>
          <p onClick={handleSelectedInbox}>Inbox</p>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: "900",
              color: "#333",
              borderBottom: "2px solid #f25e07",
            }}
          >
            All calls
          </p>
        </>
      )}
    </div>
  );
};

export default HistoryHeader;
