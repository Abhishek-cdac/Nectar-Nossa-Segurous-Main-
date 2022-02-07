import React from 'react';
// import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.css';
import AppHeader from './Header/AppHeader';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import { Tab } from '@material-ui/core';


// const { TabPane } = Tabs;
const Tabs =Object.freeze([{label:"Dashboard", link:"user/dashboard"},
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
        <div class="sb-nav-fixed bg-light">


            <AppHeader />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div class="sb-sidenav-menu">
                            <div class="nav mt-4">
                                {Tabs.map(({label,link})=>{
                                    const isActive = location.pathname.split("/")[1] === link;
                                    return(<a class= {`nav-link ${isActive ? 'active' : ''}`} key={link} onClick={()=>navigate(`/${link}`)}>

                                    {label}
                                </a>)
                                })}
                                
                               
                            </div>
                        </div>

                    </nav>
                </div>Complaint
                <div id="layoutSidenav_content">
                    <div class="container-fluid">
                        <Outlet/>
                        </div>
                        </div>
            </div>
        </div>
    );
}
