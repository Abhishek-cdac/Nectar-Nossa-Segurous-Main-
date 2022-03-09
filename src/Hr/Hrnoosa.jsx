import React,{useState} from 'react';
// import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.min.css';
import AppHeader from '../user/Header/AppHeader';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import { Tab } from '@material-ui/core';


// const { TabPane } = Tabs;
const Tabs =Object.freeze([{label:"Dashboard", link:"hr/"},
{label:"ListedPolicy", link:"hr/listedPolices"},
{label:"Client", link:"hr/client"},
// { label: "Client" , link: "hr/Demo"},
{label:"Premium", link:"hr/paypremium"},
{label:"Claims", link:"hr/newClaim"},
{label:"Complaint Managment", link:"hr/complaint"},
// { label: "Complaint Managment" , link: "hr/Demo"},
{label:"Service Request", link:"hr/servicerequest"},
// { label: "Service Request" , link: "hr/Demo"},
{label:"Reimbursement", link:"hr/reimbursement"},
// { label: "Reimbursement" , link: "hr/Demo"},
{label:"Holidays", link:"hr/holidays"},
// { label: "Holidays" , link: "hr/Demo"},
{label:"Settings", link:"hr/setting"},
// { label: "Settings" , link: "hr/Demo"},
{label:"Help & Support", link:"hr/helpandsupport"}
// { label: "Help & Support" , link: "hr/Demo"},
])




// const { Header } = Layout;

export default function Hrnoosa() {
    let navigate = useNavigate();
    const [toggle, setToggle] = useState("");
  const location = useLocation();
  const handleClick = (value) => {
    setToggle(value);
  };
  return (
    <div
      className={
        toggle
          ? "sb-nav-fixed bg-light sb-sidenav-toggled"
          : "sb-nav-fixed bg-light"
      }
    >

            <AppHeader handleClick={handleClick}/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav mt-4">
                                {Tabs.map(({label,link})=>{
                                    const isActive = location.pathname.split("/")[1] === link;
                                    return(<a className= {`nav-link ${isActive ? 'active' : ''}`} key={link} onClick={()=>navigate(`/${link}`)}>

                                    {label}
                                </a>)
                                })}
                                
                               
                            </div>
                        </div>

                    </nav>
                </div>Complaint
                <div id="layoutSidenav_content">
                    <div className="container-fluid">
                        <Outlet/>
                        </div>
                        </div>
            </div>
        </div>
    );
}
