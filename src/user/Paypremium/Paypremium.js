import React,{useEffect,useState} from "react";
import { Tabs, Button } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import { getAllUserPolicyList } from "../../services/authentication";


import Active from "./Active";
import Inactive from "./Inactive";

const { TabPane } = Tabs;

const Paypremium = () => {
  const [activetableData,setActiveTableData] =useState('')
  const [InactiveTableData, setInactiveTableData] = useState('')
  const [activeData,setActiveData] = useState('')
  const [inactiveData,setInActiveData] = useState('')


  const handleActiveTab = async() =>{
    try {
      let tableDataArr=[]; 
      const data = {
        policy_id:'',
        user_id:'',
        agent_id:'',
        premiumPlan:'',
        activeStatus:'0',
      }
     const resp = await getAllUserPolicyList(data);
      // console.log('active',resp)
      setActiveData(resp && resp)
      resp && resp.data.map((data,i)=>{
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          Amount:data.premiumAmount,
          date: data.updatedAt,
        }
        tableDataArr.push(value)
      })
      setActiveTableData(tableDataArr)
      
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }
  const handleInActiveTab = async() =>{
    try {
      let tableDataArr=[]; 
      const data = {
        policy_id:'',
        user_id:'',
        agent_id:'',
        premiumPlan:'',
        activeStatus:'1',
      }
     const resp = await getAllUserPolicyList(data);
      // console.log('inactive',resp)
      setInActiveData(resp && resp)
      resp && resp.data.map((data,i)=>{
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          Amount:data.premiumAmount,
          date: data.updatedAt,
        }
        tableDataArr.push(value)
      })
      setInactiveTableData(tableDataArr)
      
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }

  useEffect(() => {
    handleActiveTab()
    handleInActiveTab()
  }, [])
  return (
    <div>
      <div>
        <h3>My polocies</h3>
      </div>
      <div>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "flex-end",
            flexDirection: "row",
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
        <div>
          <Tabs defaultActiveKey="1"  size="Large">
            <TabPane tab="Active" key="Active">
              <Active tableData={activetableData} activeData={activeData} />
            </TabPane>
            <TabPane tab="InActive" key="InActive">
              <Inactive tableData={InactiveTableData} inactiveData={inactiveData} />
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div>
     
      {/* <UserPolicy/> */}
      </div>
    </div>
  );
};
export default Paypremium;
