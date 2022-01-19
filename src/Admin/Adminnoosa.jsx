import React from 'react';
import { Tabs } from 'antd';
import Dashboard from "./AdminDashboard";
import Polices from '../Admin/Listed polices/listedpolocies';
import HrList from '../Admin/Hr list/Hrlist';
import Header from "../user/Header/AppHeader";
import 'antd/dist/antd.css';
import Receivedpremium from './Premium/Receivedpremium';

const { TabPane } = Tabs;

export default function noosa() {
    return (
        <div style={{ margin: '0px 7%' }}>
            <Header />
            
            <Tabs tabPosition='left'>
                <TabPane tab='Dashboard' key='dashboard'>
                    <Dashboard />
                </TabPane>
                <TabPane tab='Listed Policies' key='listedpolicies'>
                    <Polices/>
                </TabPane>
                <TabPane tab='HR List' key='Hrlist'>
                   <HrList/>
                </TabPane>
                <TabPane tab='Premium' key='premium'>
                    <Receivedpremium/>
                </TabPane>
                <TabPane tab='Claims' key='claims'>
                    Claims
                </TabPane>
                <TabPane tab='Complaint Management' key='complaintmanagement'>
                    Complaint Management
                </TabPane>
                <TabPane tab='Service Requested' key='servicerequested'>
                    Service Requested
                </TabPane>
                <TabPane tab='Reimbursement' key='reimbursement'>
                    Reimbursement
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
