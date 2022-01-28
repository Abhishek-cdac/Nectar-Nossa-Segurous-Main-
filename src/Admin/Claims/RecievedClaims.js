import React from "react";
import {Table} from "antd";
import { EditOutlined,DeleteOutlined,EyeOutlined,EllipsisOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import {getClaimsList} from "../../services/authentication"



const RecievedClaims = () =>{
 


  
  const menu = (
    <Menu>
      <Menu.Item key="1">Re-assign</Menu.Item>
      <Menu.Item key="2">Accept</Menu.Item>
      <Menu.Item key="3">Reject</Menu.Item>
    </Menu>
    )

    const columns = [
      {
        title: "Claim ID",
        dataIndex: "id",
        key: "id",
        ellipsis: true,
        render: (text,record) => (
          <a
            style={{ color: "#4cbb17" }}
            //onClick={() => handlePolicyNameClick(text,record)}
          >
            {text}
          </a>
        ),
      },
        {
          title: "Policy Holder",
          dataIndex: "name",
          key: "name",
          ellipsis: true,        
          
        },
    
        {
          title: "Policy Name",
          dataIndex: "name",
          key: "name",
          ellipsis: true,
        },
        {
          title: "Claim Amt",
          dataIndex: "amount",
          key: "amount",
          ellipsis: true,
        },
        {
          title: "Request Date",
          dataIndex: "date",
          key: "date",
          ellipsis: true,
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          ellipsis: true,
        },
        {
          title: "Assigned By",
          dataIndex: "agent",
          key: "agent",
          ellipsis: true,
        },
        {
          title: "Action",
          key: "action",
          ellipsis: true,
          render: (text,record) => {
            return (
              <>
                <EyeOutlined  style={{ color: "#000089", paddingLeft: "10px" }} 
    />
    <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" >
         <EllipsisOutlined  style={{paddingLeft:"30px"}} />
          </a>        
        </Dropdown>
              </>
            );
          },
        },
      ]; 

      

      return(
        <>
        <Table
        columns={columns}
        //dataSource={}
        //onChange={this.handleChange}
        pagination={true}
        total={10}
      />
      </>
    );
};
export default RecievedClaims