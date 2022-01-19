import React,{useState} from 'react';
import { Table,Button} from 'antd';
import { useNavigate } from "react-router-dom";
import {VerticalAlignBottomOutlined} from '@ant-design/icons';
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
    // { 
    //     key: '3',
    //     name: 'seguro automotive',
    //     code: 'NS00011122',
    //     type: 'Monthly',
    //     status: 'Premium Due',
    //     Amount:'$300',
    //     date:"05-01-2022 5:00pm"


    // },
];

const Inactive = (props)=>{
    // console.log('props in active',props)
    const table = props.tableData
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
            
            title: 'Last Premium Datew',
            dataIndex: 'date',
            key: 'date',
            ellipsis: true,
        },
        {
            
            title: 'Premium plan',
            dataIndex: 'type',
            key: 'type',
            ellipsis: true,
            render:title =><a>{title}</a>

        
        },
        {
            
            title: 'Premium',
            dataIndex: 'Amount',
            key: 'Amount',
            ellipsis: true,
            
        },
        {
            
            title: 'Premium staus',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            render:PremiumPaid => <a style={{color:"#4cbb17"}}>{PremiumPaid}</a>
         },
       
    ]

    
    return(
        <>
         {activePolicyTablePage && <div>
        <Table
            columns={columns }
            dataSource={table}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
        />
        </div>}
        {policyDetailsPage && <UserPolicy selectedRecord={selectedRecord} data={props.inactiveData} status={false} handleBacktoActivePage={handleBacktoActivePage}/> }
    </>
    )
}
export default Inactive
