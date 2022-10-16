import React from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const [appState, changeState] = useState({
    activeObj: null,
  });
  function toggleActive(index) {
    changeState({ ...appState, activeObj: index });
  }
  function toggleActiveStyles(index) {
    if (index === appState.activeObj) {
      return "dashOpt active";
    } else {
      return "dashOpt";
    }
  }
  return (
    <div>
      <div className="sideBar">
        <Link to="/" className="dash">
          <div
            className={toggleActiveStyles(1)}
            key={1}
            onClick={() => {
              toggleActive(1);
            }}
          >
            <DashboardOutlinedIcon fontSize="medium" />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to="/clients" className="dash">
          <div
            className={toggleActiveStyles(2)}
            key={2}
            onClick={() => {
              toggleActive(2);
            }}
          >
            <PeopleAltOutlinedIcon fontSize="medium" />
            <p>Clients</p>
          </div>
        </Link>
        <Link to="/invoices" className="dash">
          <div
            className={toggleActiveStyles(3)}
            key={3}
            onClick={() => {
              toggleActive(3);
            }}
          >
            <ReceiptOutlinedIcon fontSize="medium" />
            <p>Invoices</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
