import React from 'react';
import { Tabs, Layout } from 'antd';
import Dashboard from './Dashboard';
import 'antd/dist/antd.css';
import Paypremium from './Paypremium/Paypremium'
import Claims from "./Claims/claims";
import { useNavigate  } from "react-router-dom";
import UserServices from './UserServices/UserServices'
import Complaint from './Complaints/Complaint'
import NossaCard from './NossaCard/NossaCard'
const { TabPane } = Tabs;
const { Header } = Layout;

export default function Noosa() {
    let navigate = useNavigate();
    return (
        <div style={{ margin: '0px 7%' }}>
            <Layout>
                <Header style={{ backgroundColor: '#61b33b' }}></Header>
            </Layout>
            <Tabs tabPosition='left' destroyInactiveTabPane
            // activeKey={(match.params.source ? match.params.source : "")}
            // onChange={(key) => {
            //     navigate(`/${key}`);
            // }}
             tabBarGutter={10}>
                <TabPane tab='Dashboard' key='dashboard'>
                    <Dashboard />
                </TabPane>
                <TabPane tab='Pay Premium' key='paypremium'>
                    <Paypremium/>
                </TabPane>
                <TabPane tab='Claims' key='claims'>
                    <Claims/>
                </TabPane>
                <TabPane tab='Complaint' key='complaint'>
                    <Complaint/>
                </TabPane>
                <TabPane tab='Noosa Card' key='noosacard'>
                   <NossaCard/>
                </TabPane>
                <TabPane tab='Service Request' key='servicerequest'>
                 <UserServices/>
                </TabPane>
                <TabPane tab='Reimbursement' key='reimbursement'>
                    Reimbursement Content
                </TabPane>
                <TabPane tab='Holidays' key='holidays'>
                    Holidays Content
                </TabPane>
                <TabPane tab='Setting' key='setting'>
                    Setting Content
                </TabPane>
                <TabPane tab='Help & Support' key='helpandsupport'>
                    Help & Support Content
                </TabPane>
            </Tabs>
        </div>
    );
}
