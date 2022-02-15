import React, { useState } from "react";
// import { Tabs, Layout } from 'antd';
import "antd/dist/antd.css";
import AppHeader from "../user/Header/AppHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Doctors from "./Reimbursment/Doctors"
import Services from "./Reimbursment/Services"

// const { TabPane } = Tabs;
const Tabs = Object.freeze([
  { label: "Dashboard", link: "admin/" },
  { label: "ListedPolices", link: "admin/listedPolices" },
  { label: "HrList", link: "admin/HrList" },
  { label: "Premium", link: "admin/paypremium" },
  { label: "Claims", link: "admin/newClaim" },
  { label: "Complaint Management", link: "admin/complaint" },
  { label: "Service Request", link: "admin/servicerequest" },
  { label: "Reimbursement", link: "admin/reimbursement" },
  { label: "Holidays", link: "admin/holidays" },
  { label: "Settings", link: "admin/setting" },
  { label: "Help & Support", link: "admin/helpandsupport" }
]);

// const { Header } = Layout;

export default function Noosa() {

  const handleReimbursment = (link) =>{
    setIsActive(!Active)
    navigate(`/${link}`)
  }
  let navigate = useNavigate();
  const location = useLocation();
  const [Active, setIsActive] = useState(false);
  return (
    <div className="sb-nav-fixed bg-light">
      <AppHeader />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav mt-4">
                {Tabs.map(({ label, link }) => {
                  const isActive = location.pathname.split("/")[1] === link;
                  console.log(label);
                  if (label === "Reimbursement") {
                    return (
                      <div style={{ flexDirection: "row" }}>
                        <a
                          className={`nav-link ${isActive ? "active" : ""}`}
                          key={link}
                          onClick={() =>handleReimbursment(link)}
                        >
                          {label}
                          <label style={{ marginLeft: "10px" }}>
                            {Active ? (
                              <CaretUpOutlined />
                            ) : (
                              <CaretDownOutlined />
                            )}
                          </label>
                        </a>
                        {Active ? (
                          <div style={{ backgroundColor: "#898989" }}>
                            <a
                              className={`nav-link ${isActive ? "active" : ""}`}
                              key={link}
                              onClick={() =>navigate(`/admin/reimbursement/service`)}
                            >
                              {console.log("lk",link)}
                              <p style={{ color: "white" }}>Service list</p>
                            </a>
                            <a
                              className={`nav-link ${isActive ? "active" : ""}`}
                              key={link}
                              onClick={() =>navigate(`/admin/reimbursement/doctors`)}
                            >
                              {console.log("dk",link)}
                              <p style={{ color: "white" }}>Doctor list</p>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    );
                  } else {
                    return (
                      <a
                        className={`nav-link ${isActive ? "active" : ""}`}
                        key={link}
                        onClick={() => navigate(`/${link}`)}
                      >
                        {label}
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          </nav>
        </div>
        Complaint
        <div id="layoutSidenav_content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
