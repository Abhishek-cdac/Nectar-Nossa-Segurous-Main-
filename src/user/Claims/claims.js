import React, { useState,useEffect } from "react";
import { Table, Input, Button,Breadcrumb,Dropdown,Modal, Menu,Form } from "antd";
import {CSVLink} from "react-csv";
import {DeleteOutlined,PlusOutlined,FilterOutlined,EditOutlined} from "@ant-design/icons"; 
import { useNavigate, useLocation } from "react-router-dom";
import NewClaim from "./Newclaim"
import UserClaim from './UserClaim'
import {getClaimsList} from "../../services/authentication"

const Claims = () =>{
  const [addClaim,setAddClaim] = useState(false)
  const [claimTablePage, setclaimTablePage] = useState(true)
  const[SelectedRecord,setSelectedRecord]=useState('')
  const[ClaimDetailsPage,setClaimDetailsPage]=useState('')
  const[ClaimsListArray,setClaimsListArray]=useState('')
  const[TableData,setTableData]=useState('')

  let navigate = useNavigate();

 const handleClaimIdClick = (text,record)=>{
  setclaimTablePage(false)
  setSelectedRecord(record)
  setClaimDetailsPage(true)
 }

 const handleback =()=>{
  setclaimTablePage(true)
  setClaimDetailsPage(false)
 }
 const handleAddBack = () =>{
  setAddClaim(false)
  setclaimTablePage(true)
}
 const handleGetServiceRequestCall = async () => {
  try {
    let tableDataArr = [];
    const resp = await getClaimsList();
    console.log("resp",resp)
    setClaimsListArray(resp && resp.data);
    resp &&
      resp.data.map((data, i) => {
        const value = {
        id:data.claim_details.claim_id,
        policyName:data.userPolicy.policy.policyName,
        code:data.userPolicy.policy.policyCode,
        date:data.claim_details.createdAt,
        status:data.verifyStatus

        };
        console.log(value);
        tableDataArr.push(value);
      });
    console.log("tableDataArr in premium", tableDataArr);
    setTableData(tableDataArr);
    console.log("resp", resp);
  } catch (error) {
    console.log("error", error);
  }
};
useEffect(() => {
  handleGetServiceRequestCall();
}, []);

    
const columns = [
    {
      title: "Claim Id",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text,record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleClaimIdClick(text,record)}
        >
          {text}
        </a>
      ),
    },

     
    {
        title: "Sr.No",
        dataIndex: "No",
        key: "No",
        ellipsis: true,
      },
    
    {
        title: "Policy Name",
        dataIndex: "policyName",
        key: "policyName",
        ellipsis: true,
      },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    
    {
      title: "Staus",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
  ];

  const handleAddClaims = () =>{
    setAddClaim(true)
    setclaimTablePage(false)
  }

  return(
    <div>
    {claimTablePage &&
   <div>
    <Breadcrumb style={{ marginTop: "20px" }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>claims</Breadcrumb.Item>
    </Breadcrumb>
    <div
        style={{
          marginTop: "20px",
          marginBottom: "25px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div>
          <h3>Claim Requests</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>

          <Button
            style={{
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#61b33b",
              color:"white"
            }}
            onClick={()=>handleAddClaims()}
          >
         <PlusOutlined style={{paddingTop:"5px"}}/> New Claim Request
          </Button>
         
          <div>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor: "#000089",
              }}
            >
              {/* Download PDF/CSV */}
              <CSVLink data={""} target="_blank">
                Download PDF/CSV
              </CSVLink>
            </Button>
          </div>
        </div>
    </div>
      <Table
        columns={columns}
        dataSource={TableData}
        pagination={true}
        total={10}
      />
       <div><span>shown Results {ClaimsListArray.length}</span></div> 
    </div>
     }
    {
      addClaim && <NewClaim  data={ClaimsListArray} SelectedRecord={SelectedRecord} handleBack={handleAddBack}/>
   
    }
    {
         ClaimDetailsPage && <UserClaim SelectedRecord={SelectedRecord} data={ClaimsListArray}  handleback={handleback}/>
    }
    </div>
  )
} 
export default Claims;