import React,{useEffect, useState} from "react";
import { Table, Button, Input,Menu,Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  VerticalAlignBottomOutlined,
  FilterOutlined,
  SmallDashOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {CSVLink} from "react-csv";
import { getAllUserPolicyList } from "../../services/authentication";
import { Popover } from "@material-ui/core";

const { Search } = Input;

// const Home = () =>{
// //   windows.location ="/listedPolices"
// }


const AccidentList = (props) => {
  let navigate = useNavigate();
  const [allPolicyListArray,setAllPolicyListArray] = useState('')
  const [tableData,setTableData] =useState('')
  const handleContent =()=>(
    <div><p>Send reminder to policy Holder for payment</p></div>
  )
  const columns = [
    {
      title: "Policy Number",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      sorter: (a, b) => a.code.length - b.code.length,
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
    },
 
    {
      title: "Policy holder",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Policy start date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
    },
    {
      title: "Premium",
      dataIndex: "Amount",
      key: "Amount",
      ellipsis: true,
    },
    {
      title: "Premium staus",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
      render: (PremiumPaid) => (
        <a style={{ color: "#4cbb17" }}>{PremiumPaid}</a>
      ),
    },
    {
      title: "claims",
      dataIndex: "count",
      key: "count",
      ellipsis: true,
    },
    {
      title: "options",
      key: "option",
      ellipsis: true,
      render: (record) => {
        return (
          <>
           <div><Popover placement='bottom' content={handleContent()}> <SmallDashOutlined /></Popover></div>
            <EyeOutlined style={{ paddingLeft: "30px" }} />
          </>
        );
      },
    },
  ];

  const handleAllPolicyList = async() =>{
    try {
      let tableDataArr=[]; 
      const Id = props && props.data.key
      const data = {
        policy_id: Id,
        user_id:'',
        agent_id:'',
        premiumPlan:'',
        activeStatus:'',
      }
     const resp = await getAllUserPolicyList(data);
      setAllPolicyListArray(resp && resp.data)
      console.log('success',props,resp)
      resp && resp.data.map((data,i)=>{
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          count: data.numberOfClaims,
          Amount:data.premiumAmount,
          date: data.createdAt,
        }
        console.log(value)
        tableDataArr.push(value)
      })
      setTableData(tableDataArr)
      
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }
  useEffect(() => {
    handleAllPolicyList()

  }, [])
  const handleFilterData = (filterData) =>{
    const tableDataArr =[];
    console.log('filterData',filterData)
    if(filterData.length > 0){
     filterData.map((data, i) => {
      const value = {
        key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          count: data.numberOfClaims,
          Amount:data.premiumAmount,
          date: data.createdAt,
      };
      tableDataArr.push(value);
    });
  }
    return tableDataArr
  }

  const handleBack = () => {
    props.handeleBackButton();
  };
  const handleClick = (type)=>{
    const premiumfilterData = allPolicyListArray && allPolicyListArray.filter((data)=>data.premiumPlan === type)
    const filterData = handleFilterData(premiumfilterData)
    setTableData(filterData)
  }
  const content = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('Yearly')}>Yearly</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('Monthly')}>Monthly</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer" onClick={()=>handleClick('quarterly')}>Quarterly</a>
      </Menu.Item>
    </Menu>)
    const onSearch = (value) => {
      const policyfilterData = allPolicyListArray && allPolicyListArray.filter((data)=>{
        const itemData = data.policy.policyCode.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1
      });
        const searchFilter = handleFilterData(policyfilterData)
        setTableData(searchFilter)
    };
  
const policyCSVData = () =>{
  let PoliciesData =[] 
  const allPoliciesListArray = allPolicyListArray && allPolicyListArray
  if(allPoliciesListArray){
    PoliciesData.push('Policy No,Policy Holder,Policy start Date, Premium Plan, Premium, Premium Status,Claims\n')
    allPoliciesListArray.map((excelData)=>{
      PoliciesData.push(
        `${excelData.policy.policyCode},${excelData.policy.policyName}, ${excelData.createdAt}, ${excelData.premiumPlan},${excelData.premiumAmount},${excelData.premiumStatus}${excelData.numberOfClaims}\n`
      )
    })
  }
  return PoliciesData.join('')
}
const policyCSV = policyCSVData()

  return (
    <>
      <div>
        <a
          style={{
            marginTop:'50px'
           }}
          onClick={() => handleBack()}
        >
          <ArrowLeftOutlined style={{paddingTop:"10px"}}/> BACK
        </a>
      </div>
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
          <h3>Accidents At Work</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Search
            placeholder="search Policy Number"
            onSearch={onSearch}
            style={{
              width: 300,
              borderRadius: "25px",
              marginRight: "10px",
            }}
          />
  <Dropdown placement="bottomCenter" overlay={content} arrow>
          <Button
            style={{
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#61b33b",
              color: "white",
            }}
          >
            <FilterOutlined /> Add Filters
          </Button>
          </Dropdown>
          <Button
            style={{
              borderRadius: "5px",
              backgroundColor: "#000086",
              color: "white",
            }}
          >
             <CSVLink data={policyCSV} target="_blank">
            Download PDF/CSV
            <VerticalAlignBottomOutlined />
            </CSVLink>
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        //onChange={this.handleChange}
        pagination={true}
        total={10}
      />
       <div><span>shown Results {allPolicyListArray && allPolicyListArray.length}</span></div>
    </>
  );
};
export default AccidentList;
