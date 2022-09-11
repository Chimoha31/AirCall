import React, { useState, useEffect } from "react";
import "../styles/Inbox.scss";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsFillTelephoneInboundFill } from "react-icons/bs";
import { MdOutlineArchive } from "react-icons/md";
import MenuBar from "./MenuBar";
import Loader from "./Loader";

const Inbox = () => {
  const [loading, setLoading] = useState(true);
  const [callInfo, setCallInfo] = useState([]);

  const AllCallInfo = async () => {
    setLoading(true);
    await axios
      .get(`https://aircall-job.herokuapp.com/activities`)
      .then((res) => {
        setCallInfo(res.data);
        console.log(callInfo);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
  };

  const handleArchive = () => {
    // archive voicemail
  }

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
            <div className="d-flex align-items-center justify-content-center gap-2 info">
              <div>
                <MdOutlineArchive
                  style={{ fontSize: "1.2rem", color: "#727272" }}
                />
              </div>
              <p style={{ marginBottom: "0", cursor: "pointer" }} onClick={handleArchive()}>Archive All Calls</p>
            </div>
            {callInfo.map((info) => (
              <div
                key={info.id}
                className="d-flex flex-column justify-content-center align-items-center each_callInfo"
              >
                {info.call_type === "voicemail" && (
                  <>
                    <p className="date">
                      {info.created_at.split("").splice(0, 10).join("")}
                    </p>
                    <div className="d-flex align-items-center justify-content-evenly gap-3 info">
                      <div>
                        <BsFillTelephoneInboundFill
                          style={{ color: "brown" }}
                        />
                      </div>
                      <div className="d-flex flex-column align-items-center justify-content-evenly">
                        <div className="d-flex gap-2">
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
                    </div>
                  </>
                )}
              </div>
            ))}

          </ScrollToBottom>
          <MenuBar />
        </div>
      )}
    </div>
  );
};

export default Inbox;
