import React from "react";
// import { Tabs, Layout } from 'antd';
import "antd/dist/antd.css";
import AppHeader from "../user/Header/AppHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// const { TabPane } = Tabs;
const Tabs = Object.freeze([
  { label: "Dashboard", link: "admin/dashboard" },
  { label: "ListedPolices", link: "admin/listedPolices" },
  { label: "HrList", link: "admin/HrList" },
  { label: "Premium", link: "admin/paypremium" },
  { label: "Claims", link: "admin/newClaim" },
  { label: "Complaint Management", link: "admin/complaint" },
  { label: "Service Request", link: "admin/servicerequest" },
  { label: "Reimbursement", link: "admin/reimbursement" },
  { label: "Holidays", link: "admin/holidays" },
  { label: "Settings", link: "admin/setting" },
  { label: "Help & Support", link: "admin/helpandsupport" },
]);

// const { Header } = Layout;

export default function Noosa() {
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <div class="sb-nav-fixed bg-light">
      <AppHeader />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav mt-4">
                {Tabs.map(({ label, link }) => {
                  const isActive = location.pathname.split("/")[1] === link;
                  return (
                    <a
                      class={`nav-link ${isActive ? "active" : ""}`}
                      key={link}
                      onClick={() => navigate(`/${link}`)}
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
        Complaint
        <div id="layoutSidenav_content">
          <div class="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
