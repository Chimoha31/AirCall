import React, { useState } from "react";
import AllCalls from "./components/AllCalls";
import Header from "./components/Header";
import "./styles/App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Inbox from "./components/Inbox";
import HistoryHeader from "./components/HistoryHeader";
import DetailInfo from "./components/DetailInfo";

const App = () => {
  const [inbox, setInbox] = useState(true);
  const navigate = useNavigate();

  const handleSelectedInbox = () => {
    setInbox(true);
    navigate("/");
  };

  return (
    <div className="container">
      <Header />
      <div className="container-view">
        <HistoryHeader
          inbox={inbox}
          setInbox={setInbox}
          handleSelectedInbox={handleSelectedInbox}
        />
        <Routes>
          <Route exact path="/" element={<Inbox />} />
          <Route
            exact
            path="all_calls"
            element={<AllCalls handleSelectedInbox={handleSelectedInbox} inbox={inbox} />}
          />
          <Route exact path="/detail_info/:id" element={<DetailInfo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
