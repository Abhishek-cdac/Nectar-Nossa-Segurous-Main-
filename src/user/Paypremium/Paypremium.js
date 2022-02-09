import React, { useEffect, useState } from "react";
import { Tabs, Button, Table } from "antd";
import { VerticalAlignBottomOutlined,UserOutlined,SaveFilled,MailFilled } from "@ant-design/icons";
import { getAllUserPolicyList } from "../../services/authentication";
import UserPolicy from "./UserPolicy";

const { TabPane } = Tabs;

const Paypremium = () => {
  const [activetableData, setActiveTableData] = useState('')
  const [InactiveTableData, setInactiveTableData] = useState('')
  const [activeData, setActiveData] = useState('')
  const [inactiveData, setInActiveData] = useState('')
  const [selectedRecord,setSelectedRecord] = useState('')
  const [status,setStatus]=useState('')
  const [policyDetailsPage,setPolicyDetailsPage] = useState(false)
  const [paypremium, setPaypremium] = useState(true)

  const handleActivepolicyNoClick =(text,record) =>{
    setSelectedRecord(record)
    setStatus(true)
    setPaypremium(false)
    setPolicyDetailsPage(true)
   }
   const handleInActivepolicyNoClick =(text,record) =>{
    setSelectedRecord(record)
    setStatus(false)
    setPaypremium(false)
    setPolicyDetailsPage(true)
  }

  const Inactivecolumns = [
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
            <a onClick={() => handleInActivepolicyNoClick(text,record)}
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
     }
]
const Activecolumns = [
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
          <a onClick={() => handleActivepolicyNoClick(text,record)}
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

  const handleActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: '',
        user_id: '',
        agent_id: '',
        premiumPlan: '',
        activeStatus: '0',
      }
      const resp = await getAllUserPolicyList(data);
      // console.log('active',resp)
      setActiveData(resp && resp)
      resp && resp.data.map((data) => {
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          Amount: data.premiumAmount,
          date: data.updatedAt,
        }
        tableDataArr.push(value)
      })
      setActiveTableData(tableDataArr)

    } catch (error) {
      console.log('error', error)
      // showAlert('In valide data', "error");
    }
  }
  const handleInActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: '',
        user_id: '',
        agent_id: '',
        premiumPlan: '',
        activeStatus: '1',
      }
      const resp = await getAllUserPolicyList(data);
      // console.log('inactive',resp)
      setInActiveData(resp && resp)
      resp && resp.data.map((data) => {
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          Amount: data.premiumAmount,
          date: data.updatedAt,
        }
        tableDataArr.push(value)
      })
      setInactiveTableData(tableDataArr)

    } catch (error) {
      console.log('error', error)
      // showAlert('In valide data', "error");
    }
  }

  useEffect(() => {
    handleActiveTab()
    handleInActiveTab()
  }, [])

const handleBacktoActivePage =()=>{
  setPaypremium(true)
  setPolicyDetailsPage(false)
}

  return (
    <>
     { paypremium && <div>
    <div className="container">
     <div className="ant-row" style={{justifyContent:"space-between"}}>
       <div className="ant-col ant-col-xs-24 ant-col-lg-8" style={{marginTop:"20px"}} >
        <h3>My polocies</h3>
       </div>
     
        <div
          style={{
            marginTop: "20px",
            display:"flex",
            alignItem:""
          }}
        >
          <Button
            style={{
              borderRadius: "5px",
              backgroundColor: "#000086",
              color: "white",
              
            }}
          >
            Download PDF/CSV
            <VerticalAlignBottomOutlined />
          </Button>
        </div>
        </div> 
       <div className="ant-row" style={{marginTop:"5px"}}>
       <div className="ant-col ant-col-xs-20">
          <Tabs defaultActiveKey="1" size="Large">
            <TabPane tab="Active" key="Active">
              <div>
                <Table
                  columns={Activecolumns}
                  dataSource={activetableData}
                  //onChange={this.handleChange}
                  pagination={true}
                  total={10}
                />
                <div style={{ padding: "30px", display: "flex", flexDirection: "row" }}>
                  <div>
                    <UserOutlined />
                    <p>Customer Service</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <MailFilled />
                    <p>Raise A Complaint</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <SaveFilled />
                    <p>Download statement</p>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="InActive" key="InActive">
              <div>
              <Table
                columns={Inactivecolumns}
                dataSource={InactiveTableData}
                //onChange={this.handleChange}
                pagination={true}
                total={10}
              />
              <div style={{ padding: "30px", display: "flex", flexDirection: "row" }}>
                  <div>
                    <UserOutlined />
                    <p>Customer Service</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <MailFilled />
                    <p>Raise A Complaint</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <SaveFilled />
                    <p>Download statement</p>
                  </div>
                </div>
                </div>
              {/* <Inactive tableData={InactiveTableData} inactiveData={inactiveData} /> */}
            </TabPane>
          </Tabs>
          </div>
        </div>
        </div>
      </div>}
      {policyDetailsPage && <UserPolicy selectedRecord = {selectedRecord} data={status ? activeData : inactiveData} status={status} handleBacktoActivePage={handleBacktoActivePage} />}

      {/* {policyDetailsPage && <UserPolicy selectedRecord={selectedRecord} data={props.activeData} status={true} handleBacktoActivePage={handleBacktoActivePage} />} */}
   
    </>
  );
};
export default Paypremium;
