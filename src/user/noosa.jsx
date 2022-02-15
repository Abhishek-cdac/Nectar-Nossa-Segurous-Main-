import React from 'react';
// import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.css';
import AppHeader from './Header/AppHeader';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import { Tab } from '@material-ui/core';
import Dashboard from "./Dashboard"


// const { TabPane } = Tabs;
const Tabs =Object.freeze([
{label:"Dashboard", link:"user/"},
{label:"PayPremium", link:"user/paypremium"},
{label:"Claims", link:"user/newClaim"},
{label:"Complaint", link:"user/complaint"},
{label:"Nossa Card", link:"user/noosacard"},
{label:"Service Request", link:"user/servicerequest"},
{label:"Reimbursement", link:"user/reimbursement"},
{label:"Holidays", link:"user/holidays"},
{label:"Settings", link:"user/setting"},
{label:"Help & Support", link:"user/helpandsupport"}])




// const { Header } = Layout;

export default function Noosa() {
    let navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="sb-nav-fixed bg-light">

            
            <AppHeader />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav mt-4">
                                {Tabs.map(({label,link})=>{
                                    console.log('naga sai fasdkjfaskjfkjasbfkasd')
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
                        {/* <div>
                            <Dashboard/>
                        </div> */}
                        </div>
            </div>
        </div>
    );
}
