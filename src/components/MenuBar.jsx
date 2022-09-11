import React from "react";
import "../styles/MenuBar.scss";
import { FaPhoneAlt } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { IoIosKeypad } from "react-icons/io";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ handleSelectedInbox }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-evenly gap-2 menubar_container">
      <FaPhoneAlt
        className="bar_icon phone"
        onClick={() => {
          navigate("/");
          handleSelectedInbox();
        }}
      />
      <BiUser
        className="bar_icon contacts"
        onClick={() => {
          navigate("/contacts");
        }}
      />
      <IoIosKeypad className="bar_icon keyboard" />
      <AiOutlineSetting className="bar_icon settings" />
      <MdOutlineRadioButtonChecked className="bar_icon record" />
    </div>
  );
};

export default MenuBar;
