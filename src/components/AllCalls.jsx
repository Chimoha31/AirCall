import React, { useEffect, useState } from "react";
import "../styles/AllCalls.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { MdOutlineArchive } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import MenuBar from "./MenuBar";
import Loader from "./Loader";

const AllCalls = ({ handleSelectedInbox, inbox }) => {
  const [loading, setLoading] = useState(true);
  const [callInfo, setCallInfo] = useState([]);
  const navigate = useNavigate();

  const AllCallInfo = async () => {
    setLoading(true);
    await axios
      .get(`https://aircall-job.herokuapp.com/activities`)
      .then((res) => {
  // Updated Line 24 - 26 (Used condition to navigate home when refresh)
        if(inbox) {
          navigate("/")
        }
        setCallInfo(res.data);
        console.log(callInfo);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  const handleArchive = async (id) => {
    await axios
      .post(`https://aircall-job.herokuapp.com/activities/${id}`, {
        is_archived: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    AllCallInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="mt-3 callInfo_container">
      {loading ? (
        <Loader />
      ) : (
        <div className="info_body">
          <ScrollToBottom className="scroll">
            {callInfo.map((info) => (
              <div
                key={info.id}
                className="d-flex flex-column justify-content-center align-items-center each_callInfo"
              >
                <p className="date">
                  {info.created_at.split("").splice(0, 10).join("")}
                </p>
                <div className="d-flex align-items-center justify-content-evenly gap-3 info">
                  <div>
                    {info.direction === "outbound" ? (
                      <BsFillTelephoneOutboundFill style={{ color: "green" }} />
                    ) : (
                      <BsFillTelephoneInboundFill style={{ color: "brown" }} />
                    )}
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-evenly">
                    <div className="d-flex gap-2">
                      {info.direction === "outbound" ? (
                        <>
                          <p
                            style={{
                              marginBottom: "0",
                              fontSize: "0.7rem",
                              color: "#727272",
                            }}
                          >
                            {info.call_type[0].toUpperCase() +
                              info.call_type.slice(1)}
                          </p>
                          <strong>{info.to}</strong>
                        </>
                      ) : (
                        <>
                          <p
                            style={{
                              marginBottom: "0",
                              fontSize: "0.7rem",
                              color: "#727272",
                            }}
                          >
                            {info.call_type[0].toUpperCase() +
                              info.call_type.slice(1)}
                          </p>
                          <strong>{info.from}</strong>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <p
                      style={{
                        marginBottom: "0",
                        fontSize: "0.7rem",
                        color: "#727272",
                      }}
                    >
                      {info.created_at
                        .split("")
                        .splice(11, 11)
                        .join("")
                        .split("")
                        .splice(0, 5)
                        .join("")}
                    </p>
                  </div>
                  <div className="detailInfo_icon">
                    <MdOutlineArchive
                      className="mx-1"
                      onClick={() => handleArchive(info.id)}
                    />
                    <BsInfoCircle
                      onClick={() => navigate(`/detail_info/${info.id}`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
          <MenuBar handleSelectedInbox={handleSelectedInbox} />
        </div>
      )}
    </div>
  );
};

export default AllCalls;
