import React, { useState, useEffect } from "react";
import { Tabs, Button, Input, Breadcrumb,Dropdown, Menu } from "antd";
import { CSVLink } from "react-csv";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import Hractive from "./Hractive";
import HrInactive from "./HrInactive";

import { getAllUserPolicyList } from "../../services/authentication";

const { Search } = Input;

const Hrlisted = () => {
  const [activetableData, setActiveTableData] = useState("");
  const [InactiveTableData, setInactiveTableData] = useState("");
  const [activeData, setActiveData] = useState('')
  const [inactiveData, setinactiveData] = useState('')
  const [tabStatus, setTabStatus] = useState('Active')
  const { TabPane } = Tabs;

  const onSearch = (value) =>{
    const activefilterData = activeData.filter((data)=>{
    const itemData = data.policy.policyName.toUpperCase();
    const textData = value.toUpperCase();
    return itemData.indexOf(textData) > -1
  });
    const searchFilter = handleFilterData(activefilterData)
    setActiveTableData(searchFilter)
  }
  const handleActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: "",
        agent_id: "",
        premiumPlan: "",
        activeStatus: "0",
      };
      const resp = await getAllUserPolicyList(data);
      setActiveData(resp && resp.data)
      resp &&
        resp.data.map((data, i) => {
          const value = {
            key: data.id,
            name: data.policy.policyName,
            code: data.policy.policyCode,
            number:data.policy.registration,
            type: data.policy.policyType,
            count: null
          };
          tableDataArr.push(value);
        });
      setActiveTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  const handleInActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: "",
        agent_id: "",
        premiumPlan: "",
        activeStatus: "1",
      };
      const resp = await getAllUserPolicyList(data);
      setinactiveData(resp && resp.data)
      resp &&
        resp.data.map((data, i) => {
          const value = {
            key: data.id,
            name: data.policy.policyName,
            code: data.policy.policyCode,
            number:data.policy.registration,
            type: data.policy.policyType,
            count: null
          };
          tableDataArr.push(value);
        });
      setInactiveTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleActiveTab();
    handleInActiveTab();
  }, []);

  const handleFilterData = (filterData) =>{
    const tableDataArr =[];
    console.log('filterData',filterData)
    if(filterData.length > 0){
     filterData.map((data, i) => {
      const value = {
        key: data.id,
        name: data.policy.policyName,
        code: data.policy.policyCode,
        number:data.policy.registration,
        type: data.policy.policyType,
        count: null
      };
      tableDataArr.push(value);
    });
  }
    return tableDataArr
  }

  const handleClick = (type) =>{
    const activefilterData = activeData.filter((data)=>data.policy.policyType === type)
    const inactivefilterData = inactiveData.filter((data)=>data.policy.policyType === type)
    const active = handleFilterData(activefilterData)
    const Inactive = handleFilterData(inactivefilterData)
    if(tabStatus === 'Active'){
      console.log('activefilterData',activefilterData)
      setActiveTableData(active)
    }else{
      console.log('inactivefilterData',inactivefilterData)
      setInactiveTableData(Inactive)
    }
    
  }

  const content = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('General')}>General</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('Health')}>Health</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('Health & General')}>Health & General</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('Vehicle')}>Vehicle</a>
      </Menu.Item>
    </Menu>)

// key: data.id,
// name: data.policyName,
// code: data.policyCode,
// type: data.policyType,
// count: data.Activecount,
// number: data.registration,
     //csv
  const policyCSVData = () =>{
    let ActivePoliciesData =[]
    const activetableDataArray = activetableData && activetableData
    const InactiveTableDataArray = InactiveTableData && InactiveTableData
    if(activetableDataArray){
      ActivePoliciesData.push('Policy Name,Policy Code,registration,Policy Type,Active Count\n')
      activetableDataArray.map((excelData)=>{
        ActivePoliciesData.push(
          `${excelData.name},${excelData.code}, ${excelData.number}, ${excelData.type},${null}\n`
        )
      })
    }
    if(InactiveTableDataArray){
     InactiveTableDataArray.map((excelData)=>{
        ActivePoliciesData.push(
          `${excelData.name},${excelData.code}, ${excelData.number}, ${excelData.type},${null}\n`
        )
      })
    }
    return ActivePoliciesData.join('')
  }
  const policyCSV = policyCSVData()
  // CSV END
 

  const handleCallBack = (key) =>{
    setTabStatus(key)
  }

  return (
    <div>
      <div className="container-fluid">
        <Breadcrumb style={{ marginTop: "20px" }}>
          <Breadcrumb.Item >Home</Breadcrumb.Item>
          <Breadcrumb.Item>ListedPolocies</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row"
          style={{
            marginTop: "20px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div className="col-12 col-sm-3 col-md-3">
          <h3>Listed Policy</h3>
        </div>
        <div className="nav justify-content-center">
        <div className="col-12 col-sm-5 col-md-5" style={{ display: "flex", flexDirection: "row" }}>
          <Search
            placeholder="search Policy"
            onSearch={onSearch}
            style={{
              borderRadius: "25px",
            }}
          />
        </div>
        <div className="col-12 col-sm-3 col-md-3" style={{ display: "flex", flexDirection: "row" }}>
        <Dropdown placement="bottomCenter" overlay={content} arrow>
            <Button
              style={{
                borderRadius: "5px",
                backgroundColor: "#61b33b",
                color: "white",
              }}
            >
              <FilterOutlined /> Add Filters
            </Button>
          </Dropdown>
        </div>
        <div className="col-12 col-sm-3 col-md-3" style={{ display: "flex", flexDirection: "row" }}>
        <Button
            style={{
              color: "#ffffff",
              backgroundColor: "#000089",
              borderRadius: "5px"
            }}
          >
            <CSVLink data={policyCSV} target="_blank">
              Download PDF/CSV
            </CSVLink>
          </Button>
        </div>
        </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Tabs
              defaultActiveKey="1"
              style={{ fontSize: "30px" }}
              size="Large"
              onChange={handleCallBack}
            >
              <TabPane tab="Active" key="Active">
                <Hractive tableData={activetableData} data={activeData}/>
              </TabPane>
              <TabPane tab="InActive" key="InActive">
                <HrInactive tableData={InactiveTableData} data={inactiveData}/>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hrlisted;
