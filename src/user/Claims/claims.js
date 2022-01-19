import React from "react";
import { Table, Input, Button,Breadcrumb,Dropdown,Modal, Menu,Form } from "antd";
import {CSVLink} from "react-csv";
import {DeleteOutlined,PlusOutlined,FilterOutlined,EditOutlined} from "@ant-design/icons"; 
import { useNavigate, useLocation } from "react-router-dom";
import NewClaim from "./Newclaim"





const Claims = () =>{

  let navigate = useNavigate();

    const data = [

    ]
const columns = [
    {
      title: "Claim Id",
      dataIndex: "Id",
      key: "Id",
      ellipsis: true,
      render: (text,record) => (
        <a
          style={{ color: "#4cbb17" }}
          //onClick={() => handleClaimIdClick(text,record)}
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
        dataIndex: "Name",
        key: "Name",
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
      dataIndex: "Date",
      key: "Date",
      ellipsis: true,
    },
    
    {
      title: "Staus",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
  ];


  return(
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
            onClick={()=> navigate("/NewClaim")}
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
        dataSource={data}
        //onChange={this.handleChange}
        pagination={true}
        total={10}
      />
      {/* <div><span>shown Results {length}</span></div> */}
      <NewClaim/>
    </div>
  )


  
} 
export default Claims;