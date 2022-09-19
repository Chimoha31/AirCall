import React, { Fragment, useEffect, useState } from "react";
import "../styles/DetailInfo.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { TbArrowBack } from "react-icons/tb";
import { Card } from "react-bootstrap";
import user from "../assets/images/user.png";

const DetailInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [detailInfo, setDetailInfo] = useState({});
  const callType = Object.values(detailInfo);

  const callTypeUpperCase =
    typeof callType[8] === "string"
      ? callType[8][0].toUpperCase() + callType[8].slice(1)
      : "";
      
  const date =
    typeof callType[1] === "string"
      ? callType[1].split("").splice(0, 10).join("")
      : "";
  console.log(date);

  const time =
    typeof callType[1] === "string"
      ? callType[1].split("").splice(11, 5).join("")
      : "";
  console.log(time);

  const getDetailInfo = async () => {
    await axios
      .get(`https://aircall-job.herokuapp.com/activities/${params.id}`)
      .then((res) => {
        setDetailInfo(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDetailInfo();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className="detailInfo_container">
        <Card
          style={{ width: "18rem" }}
          className="p-3 d-flex flex-column justify-content-evenly align-items-center card"
        >
          <Card.Img
            variant="top"
            src={user}
            className="border rounded-circle user_img mb-2"
          />
          <Card.Title>
            {detailInfo.direction === "inbound" ? (
              <div className="d-flex flex-column justify-content-center align-items-center call">
                <h5>{detailInfo.from}</h5>
                <p>Called to {detailInfo.to}</p>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center call">
                <h5>{detailInfo.to}</h5>
                <p>Called from {detailInfo.from}</p>
              </div>
            )}
          </Card.Title>
          <div className="date_time">
            {date} - {time} -
          </div>

          <Card.Body>
            <Card.Text>{callTypeUpperCase}</Card.Text>
            <Card.Text>
              {Math.floor(detailInfo.duration / 60)} minutes
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="detailInfo" onClick={() => navigate("/all_calls")}>
        <TbArrowBack style={{ fontSize: "1.3rem" }} className="mx-2" />
        Back to All Calls
      </div>
    </Fragment>
  );
};

export default DetailInfo;
