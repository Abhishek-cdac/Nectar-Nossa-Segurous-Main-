import {
  Card,Modal,
  Radio,
  Row,
  Col,
  Divider,
  Table,
  Button,
  Input,
  Menu,
  Dropdown,Upload,message
} from "antd";
import React, { useEffect, useState } from "react";
import {editAgentList} from "../../services/authentication";

import { CSVLink } from "react-csv";
import {
  EyeOutlined,
  VerticalAlignBottomOutlined,
  FilterOutlined,
  SmallDashOutlined,
  ArrowUpOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  LoadingOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import AccidentList from "../Listed polices/Accidentlist";
// import { getAllUserPolicyList } from "../../services/authentication";
import { Popover } from "@material-ui/core";
import { render } from "@testing-library/react";

const { Search } = Input;

const HrData = (props) => {
  let navigate = useNavigate();
  const HrData = props.data;
  const [tableData, setTableData] = useState(props.tableData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [loading,SetLoading] = useState(false)
  const [imageUrl,setImageUrl] = useState('')
  const [permanentAddress, setpermanentAddress] = useState(props.data.permanentAddress ? props.data.permanentAddress : '');
  const [firstName, setFirstName] = useState(props.data.firstName ? props.data.firstName : '');
  const [lastName, setLastName] = useState(props.data.lastName ? props.data.lastName : '');
  const [email, setEmail] = useState(props.data.email ? props.data.email : '');
  const [phone, setPhone] = useState(props.data.phone ? props.data.phone : '');
  const [city,setCity] = useState(props.data.city ? props.data.city : '');
  const [gender,setGender] = useState(props.data.gendar ? props.data.gendar : '');
  const [currentAddress, setcurrentAddress] = useState(props.data.currentAddress ? props.data.currentAddress : '');
  const [errorMsg,seterrorMsg] = useState('')
  const [image,setImage] =useState(props.data.profileImg ? props.data.profileImg : '')
  // const[AllHrPolicyListArray,setAllHrPolicyListArray]=useState();
  const [radioButtonValue, setradioButtonValue] = useState(
    HrData.status === true ? "Active" : "InActive"
  );
  let AllHrTabelData = props.AllHrPolicyListArray;
  console.log('AllHrTabelData',props, props.tableData);
  const RadioButtonOnChange = (e) => {
    setradioButtonValue(e.target.value);
  };
  const handleContent = () => (
    <div>
      <p>Send reminder to policy Holder for payment</p>
    </div>
  );
  const handleClearStates = () =>{
    setpermanentAddress('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setCity('')
    setGender('')
    setcurrentAddress('')
  }

  const handleEditShowModal = () =>{
     setIsEditModalVisible(true)
  }
  const handelEditCancel= () =>{
    setIsEditModalVisible(false)
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEditAgentListAPI = async () =>{
    if(firstName === '' || lastName === '' || email ==='' || phone ==='' || gender === ''|| currentAddress === '' || permanentAddress ==='',city === ''){
      seterrorMsg('Please Enter above fileds')
    }else if(validateEmail(email)){
      seterrorMsg('')
      const data= {
        'id':props.data.id,
        'firstName': firstName,
       'lastName':lastName,
       'email': email,
       'phone':phone,
       "gendar":gender,
       'currentAddress':currentAddress,
       'permanentAddress':permanentAddress,
       'city':city,
       'profileImg':image
      }
     try {
       const resp = await editAgentList(data);
       console.log('success')
       handelEditCancel()
       handleClearStates()
      // handleGetAgentListServiceCall()
     } catch (error) {
         console.log('error',error)
       // showAlert('In valide data', "error");
     }
    }else {
      seterrorMsg('Please Enter valid email')
    }
  }

  const handleBack = () => {
    props.handeleBackButton();
  };

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
            <div>
              <Popover placement="bottom" content={handleContent()}>
                {" "}
                <SmallDashOutlined />
              </Popover>
            </div>
            <EyeOutlined style={{ paddingLeft: "30px" }} />
          </>
        );
      },
    },
  ];
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          count: data.numberOfClaims,
          Amount: data.premiumAmount,
          date: data.createdAt,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleClick = (type) => {
    const premiumfilterData =
      props && AllHrTabelData.filter((data) => data.premiumPlan === type);
    const filterData = handleFilterData(premiumfilterData);
    setTableData(filterData);
  };
  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Yearly")}
        >
          Yearly
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Monthly")}
        >
          Monthly
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("quarterly")}
        >
          Quarterly
        </a>
      </Menu.Item>
    </Menu>
  );
  const onSearch = (value) => {
    const policyfilterData =
      props &&
      AllHrTabelData.filter((data) => {
        const itemData = data.policy.policyCode.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    const searchFilter = handleFilterData(policyfilterData);
    setTableData(searchFilter);
  };

  const hrpolicyCSVData = () => {
    let PoliciesData = [];
    const AllHrTabelDataArray = AllHrTabelData && AllHrTabelData;
    if (AllHrTabelDataArray) {
      PoliciesData.push(
        "Policy No,Policy Holder,Policy start Date, Premium Plan, Premium, Premium Status,Claims\n"
      );
      AllHrTabelDataArray.map((excelData) => {
        PoliciesData.push(
          `${excelData.policy.policyCode},${excelData.policy.policyName}, ${excelData.createdAt}, ${excelData.premiumPlan},${excelData.premiumAmount},${excelData.premiumStatus}${excelData.numberOfClaims}\n`
        );
      });
    }
    return PoliciesData.join("");
  };
  const hrpolicyCSV = hrpolicyCSVData();

  const onGenderChange = (e)=>{
    setGender(e.target.value)
  }

  // const getBase64 = (img,callback) =>{
  //   const reader = new FileReader();
  //   reader.addEventListener('load',()=>callback(reader.result))
  //   reader.readAsDataURL(img)
  // }
  const beforeUpload = (file)=> {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const convert2base64 =(e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () =>{
      setImage(reader.result.toString());
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:"10px"}}>
        <div>
          <a
            style={{
              marginTop: "50px",
            }}
            onClick={() => handleBack()}
          >
            <ArrowLeftOutlined style={{ paddingTop: "10px" }} /> BACK
          </a>
        </div>
        <div>
          <Button
            style={{
              display: "flex",
              justifyContent: "flexEnd",
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#61b33b",
              color: "white",
              size: "large",
            }}
            onClick={()=>handleEditShowModal()}
          >
            <EditOutlined /> Edit
          </Button>
        </div>
      </div>  
      
        <div
          className="site-card-wrapper"
          style={{
            padding: "10px",
            backgroundColor: "#eeeeee",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop:"30px"
          }}
        >
          { image &&  <img src={image} />}
          <div
            style={{ display: "flex", justifyContent: "space-around" }}
            style={{
              display: "flex",
              flexDirection: "row",
              fontFamily: "sans-serif",
              fontSize: "18px",
            }}
          >
            <div style={{ marginLeft: "50px" }}>
              <label>Agent:</label>
              <h6>
                {HrData.firstName} {HrData.lastName}
              </h6>{" "}
              <br></br>
              <label>Agent Code:</label>
              <br />
              <h6>need code</h6> <br></br>
              <label>Status:</label>
              <br />
              <Radio.Group
                name="radiogroup"
                defaultValue={"Active"}
                onChange={RadioButtonOnChange}
                value={radioButtonValue}
              >
                <Radio value={"Active"}>Active</Radio>
                <Radio value={"Inactive"}>Inactive</Radio>
              </Radio.Group>
            </div>

            <div style={{ marginLeft: "100px" }}>
              <label>Agent Email:</label>
              <h6>{HrData.email}</h6> <br></br>
              <label>Agent Phone No:</label>
              <br />
              <h6>{HrData.phone}</h6> <br></br>
              <label>Agent Location:</label>
              <br />
              <h6>{HrData.city}</h6>
            </div>
            <div style={{ marginLeft: "100px" }}>
              <label>Agent Adress:</label>
              <h6>{HrData.currentAddress}</h6>
            </div>
          </div>
        </div>

        <div className="site-card-wrapper" style={{ marginTop: "20px" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Card>
                <div
                // style={{
                //   backgroundColor: "#FFB6C1",
                // }}
                >
                  <Row>
                    <Col
                      span={20}
                      style={{
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                    
                      <div style={{height:"75px"}}>Clients</div>
                    </Col>
                    <Col span={4}>{HrData.totalClient}</Col>
                  </Row>
                </div>
                <div style={{backgroundColor:"greenyellow"}}>
                  <Divider />
                  <div>
                  <Row>
                    <Col span={4} >View</Col>
                
                    <Col span={20} style={{ color: "61b33b" }}>
                      <ArrowUpOutlined
                        style={{ color: "#000000", justifyItem: "flex-end" }}
                      />
                    </Col>
                  </Row>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div
                // style={{
                //   backgroundColor: "#FFB6C1",
                // }}
                >
                  <Row>
                    <Col
                      span={20}
                      style={{
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      <div>Complaints</div>
                      <div>Assigned</div>
                    </Col>
                    <Col span={4}>{HrData.totalComplaint}</Col>
                  </Row>
                </div>
                <div style={{backgroundColor:"greenyellow"}}>
                  <Divider />
                  <div>
                  <Row>
                    <Col span={4} >View</Col>
                
                    <Col span={20} style={{ color: "61b33b" }}>
                      <ArrowUpOutlined
                        style={{ color: "#000000", justifyItem: "flex-end" }}
                      />
                    </Col>
                  </Row>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card>
                <div
                // style={{
                //   backgroundColor: "#FFB6C1",
                // }}
                >
                  <Row>
                    <Col
                      span={20}
                      style={{
                        color: "#000000",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      <div>Complaints</div>
                      <div>Received</div>
                    </Col>
                    <Col span={4}>{HrData.totalResolvedComplaint}</Col>
                  </Row>
                </div>
                <div style={{backgroundColor:"greenyellow"}}>
                  <Divider />
                  <div>
                  <Row>
                    <Col span={4} >View</Col>
                
                    <Col span={20} style={{ color: "61b33b" }}>
                      <ArrowUpOutlined
                        style={{ color: "#000000", justifyItem: "flex-end" }}
                      />
                    </Col>
                  </Row>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
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
            <h3> </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              placeholder="search Policy"
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
              <CSVLink data={hrpolicyCSV} target="_blank">
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
        <div>
          <span>shown Results {tableData && tableData.length}</span>
        </div>
       
     <Modal title='Edit Agent' visible={isEditModalVisible} onOk={handleEditAgentListAPI} onCancel={handelEditCancel}>
          <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="firstname"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  /><br/>    
                  <input
                   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  /><br/> 
                  <input
                   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  /><br/>          
                  <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  /><br/> 
                  <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  /><br/>
                   <select
                    placeholder="select the Gender"
                    onChange={onGenderChange}
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                  // allowClear
                  >
                    <option value="male">male</option>
                    <option value="female">female</option>
                    <option value="other">other</option>
                  </select>
                  <br/>
                  <textarea
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="currentAddress"
                    placeholder="Current Adress"
                    value={currentAddress}
                    onChange={(e) => setcurrentAddress(e.target.value)}
                  /><br/> 
                  <textarea
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="permanentAddress"
                    placeholder="permanent Address"
                    value={permanentAddress}
                    onChange={(e) => setpermanentAddress(e.target.value)}
                    />
                   {image ? (
                    <img src={image} />
                  ) : (
                    <div>
                      <input id='fileupload' type='file' onChange={(e)=>convert2base64(e)}/>
                      <label htmlFor="fileupload">Upload File</label>
                    </div>
                  )}
                 
                    
                  <p style={{color:'red',marginLeft:'45px'}}>{errorMsg}</p>
          </Modal> 
    </div>
  );
};
export default HrData;
