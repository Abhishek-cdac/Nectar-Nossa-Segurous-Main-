import React,{useState} from 'react';
import { Table,Button} from 'antd';
import { useNavigate } from "react-router-dom";
import {UserOutlined,SaveFilled,MailFilled} from '@ant-design/icons';
import UserPolicy from "./UserPolicy";


const data = [
    {
        key: '1',
        name: 'Accidents at work',
        code: 'NS00011122',
        type: 'yearly',
        status: 'Premium Paid',
        Amount:'$2500',
        date:"05-01-2022 5:00pm"
    },  
    { 
        key: '2',
        name: 'seguro automotive',
        code: 'NS00011122',
        type: 'Monthly',
        status: 'Premium Due',
        Amount:'$300',
        date:"05-01-2022 5:00pm"


    },
    { 
        key: '2',
        name: 'seguro automotive',
        code: 'NS00011122',
        type: 'Monthly',
        status: 'Premium Due',
        Amount:'$300',
        date:"05-01-2022 5:00pm"


    },
];

const Active = (props)=>{
    // console.log('props active',props)
    const table = props.tableData;
    // const data = props.activeData;
    let navigate = useNavigate();
    const [activePolicyTablePage,setactivePolicyTablePage] =useState(true)
    const [policyDetailsPage,setpolicyDetailsPage] = useState(false)
    const [selectedRecord,setSelectedRecord] = useState('')

    const handlePolicyNoClick = (text,record) =>{    
        setSelectedRecord(record)
        setactivePolicyTablePage(false)
        setpolicyDetailsPage(true)
    }
    const handleBacktoActivePage =()=>{
        setactivePolicyTablePage(true)
        setpolicyDetailsPage(false)
    }
    const columns = [
        {
            
            title: 'S.No',
            dataIndex: 'key',
            key:'key',
            ellipsis: true,
        },
        {
            
            title: 'Policy Number',
            dataIndex: 'code',
            key:'code',
            ellipsis: true,
            render: (text,record) => (
                <a onClick={() => handlePolicyNoClick(text,record)}
                >
                  {text}
                </a>
            ),
        },
    
        {
            
            title: 'Policy Name',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            sorter:(a,b)=>a.name.length - b.name.length,


        },
        {
            
            title: 'Last Premium Paid',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true,
        },
        {
            
            title: 'Premium plan',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
        },
        {
            
            title: 'Premium',
            dataIndex: 'Amount',
            key: 'Amount',
            ellipsis: true,
            
        },
        {
            
            title: 'staus',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render:PremiumPaid => <a>{PremiumPaid}</a>
         },
       
    ]

    
    return(
        <>
        {activePolicyTablePage && <div>
        <Table
            columns={columns}
            dataSource={table}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
        />
        <div style={{padding:"30px", display:"flex",flexDirection:"row"}}>
            <div>
            <UserOutlined/>
            <p>Customer Service</p>
            </div>
            <div style={{paddingLeft:"30px"}}>
            <MailFilled/> 
            <p>Raise A Complaint</p>
            </div>
          <div style={{paddingLeft:"30px"}}>
            <SaveFilled/>
            <p>Download statement</p>
            </div>
        </div>
        </div>}
        {policyDetailsPage && <UserPolicy selectedRecord={selectedRecord} data={props.activeData} status={true} handleBacktoActivePage={handleBacktoActivePage}/> }
    </>
    )
}
export default Active
