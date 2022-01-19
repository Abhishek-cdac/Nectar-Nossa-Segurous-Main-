import React, { useState, useEffect } from "react";
import { Table, Input, Button,Breadcrumb,Dropdown,Modal, Menu,Form,InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import {CSVLink} from "react-csv";
import { DeleteOutlined,PlusOutlined,FilterOutlined,EditOutlined } from "@ant-design/icons"; 
import AccidentList from "./Accidentlist";
import { getPolicyList, addPolicyList,deletePolicyList,editPolicyList } from "../../services/authentication";


const { Search } = Input;

// "id": 2,
//             "policyName": "JIVAN BIMA Policy 2",
//             "policyCode": "NS0000000011",
//             "registration": "190475648325",
//             "policyType": "Health",
//             "policyDuration": "5.00",
//             "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//             "activStatus": true,
//             "status": true,
//             "createdAt": "2022-01-06T13:30:54.000Z",
//             "updatedAt": "2022-01-10T04:35:13.000Z",
//             "totalcount": 0

const ListedPolocies = () => {
  let navigate = useNavigate();
  const [accidentListStatus, setAccidentListStatus] = useState(false);
  const [policyListStatus, setPolicyListStatus] = useState(true);
  const [selectedPolicyData, setSelectedPolicyData] = useState("");
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [addPolicyData, setAddPolicyData] = useState('')
  // const[editPolicyData,setEditPolicyData]=useState(" ")
  const [tableData,setTableData] = useState('')
  const [policyListArray, setPolicyListArray] = useState('')
  const [policyId,setPolicyId]=useState("")
  const [policyName,setPolicyName]=useState("")
  const [registration,setRegistration]=useState("")
  const [policyDuration,setPolicyDuration]=useState("")
  const [policyType,setPolicyType]=useState("")
  const[policyDescription,setPolicyDescription]=useState("")
  const [listAPIupdateStatus, setListAPIupdateStatus] = useState(false)
  const Token =  window.localStorage.getItem('token');
  console.log('Token in list', Token)
  const data ={
    search:'',
    type:'',
    id:''
  }
  const onSearch = (value) => {
    const searchData ={
      search:value,
      type:'',
      id:''
    }
    handleGetPolicyListServiceCall(searchData)
    setListAPIupdateStatus(true)
  }

  const handleClick = (type) =>{
    const searchData ={
      search:'',
      type:type,
      id:''
    }
    handleGetPolicyListServiceCall(searchData)
    setListAPIupdateStatus(true)
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
  //csv
  const policyCSVData = () =>{
    let PoliciesData =[]
    const policyListArrayData = policyListArray && policyListArray
    if(policyListArrayData){
      PoliciesData.push('Policy Name,Policy Code,Registration Number,Policy Type,Policy Duration,Policy Description\n')
      policyListArrayData.map((excelData)=>{
        console.log('exceldata',excelData)
        PoliciesData.push(
          `${excelData.policyName},${excelData.policyCode}, ${excelData.registration}, ${excelData.policyType},${excelData.policyDuration},${excelData.description}\n`
        )
      })
    }
    return PoliciesData.join('')
  }
  const policyCSV = policyCSVData()
  // CSV END
 
  ///LIST API SERVICE CALL AND FUNCTIONALITY STARTED

const handleGetPolicyListServiceCall = async (data) =>{
  try {
    let tableDataArr=[]; 
    const resp = await getPolicyList(data);
    setPolicyListArray(resp && resp.data)
    resp && resp.data.map((data,i)=>{
      const value = {
        key: data.id,
        name: data.policyName,
        code: data.policyCode,
        type: data.policyType,
        count: data.totalcount,
        number: data.registration,
      }
      console.log(value)
      tableDataArr.push(value)
    })
    setTableData(tableDataArr)
   console.log('resp',resp)
  } catch (error) {
      console.log('error',error)
    // showAlert('In valide data', "error");
  }
}
useEffect(()=>{
 handleGetPolicyListServiceCall(data)
},[listAPIupdateStatus])

///LIST API SERVICE CALL AND FUNCTIONALITY ENDED
  const handlePolicyNameClick = (text,record) => {
    setPolicyListStatus(false);
    setAccidentListStatus(true);
    setSelectedPolicyData(record);
  };
  const handleShowModal = () =>{
    setIsModalVisible(true)
  }
  const handleCancel = ()=>{
    setIsModalVisible(false)
  }
  const handleEditShowModal = (text,record) =>{
    console.log(record,text)
   const value =  policyListArray.find((data)=>data.id === record.key)
   console.log('value',value)
   if(value){
    setPolicyId(value.id)
    setPolicyName(value.policyName)
    setRegistration(value.registration)
    setPolicyDuration(value.policyDuration)
    setPolicyType(value.policyType)
    setPolicyDescription(value.description)
   }
    setIsEditModalVisible(true)

  }
  const handelEditCancel= () =>{
    setIsEditModalVisible(false)
  }

  useEffect(() => {
    return () => {
      setPolicyListStatus(true); 
      setAccidentListStatus(false);
    };
  }, []);

   ///ADD API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleAddPolicyListAPI = async (addPolicyData) =>{
    const payload= {
      'policyName': addPolicyData.policyName,
      'registration': addPolicyData.policyRegistration,
      'policyType':addPolicyData.policyType,
      'policyDuration': addPolicyData.policyDuration,
      'description': addPolicyData.policyDescription,
      'token':Token
    }
    try {
      const resp = await addPolicyList(payload);
      console.log('success')
      handleGetPolicyListServiceCall(data)
      setListAPIupdateStatus(true)
      handleCancel()
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }


  const onFinish = (values) =>{
    setAddPolicyData(values)
    handleAddPolicyListAPI(values)
  }
  const onFinishFailed = (errorInfo)=>{
    console.log('Failed',errorInfo)
  }

   ///ADD API SERVICE CALL AND FUNCTIONALITY ENDED


    //Edit API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleEditPolicyListAPI = async () =>{

    const payload= {
      'id':policyId,
      'policyName': policyName,
      'registration': registration,
      'policyType':policyType,
      'policyDuration':policyDuration,
      'description': policyDescription
    }
    try {
      const resp = await editPolicyList(payload);
      console.log('success')
      resp && handleGetPolicyListServiceCall(data)
      setListAPIupdateStatus(true)
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    }
  }


  // const onFinish = (values) =>{
  //   setEditPolicyData(values)
  // }

   ///Edit API SERVICE CALL AND FUNCTIONALITY ENDED

 ///DELETE API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleDeletePolicy = async(text,record) =>{
   console.log('nnagvsvgv',text,record)
   const payload = {
     'id':record.key
   }
   try {
    const resp = await deletePolicyList(payload);
    console.log('success')
    handleGetPolicyListServiceCall(data)
    setListAPIupdateStatus(true)
  } catch (error) {
      console.log('error',error)
    // showAlert('In valide data', "error");
  }
  }
 ///DELETE API SERVICE CALL AND FUNCTIONALITY ENDED


  const columns = [
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text,record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handlePolicyNameClick(text,record)}
        >
          {text}
        </a>
      ),
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
    },
    {
      title: "Registration",
      dataIndex: "number",
      key: "number",
      ellipsis: true,
    },
    {
      title: "Policy Type",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
    },
    {
      title: "Active Count",
      dataIndex: "count",
      key: "count",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "action",
      ellipsis: true,
      render: (text,record) => {
        return (
          <>
            <EditOutlined style={{ color: "#000089", paddingLeft: "10px" }} onClick={()=>handleEditShowModal(text,record)}
/>
            <DeleteOutlined style={{paddingLeft:"30px"}}  onClick={()=>handleDeletePolicy(text,record)}/>
          </>
        );
      },
    },
  ];
 
  const handeleBackButton = () =>{
    setPolicyListStatus(true);
    setAccidentListStatus(false);
  }


  return (
    <>
      {policyListStatus && (
        <div>
        <Breadcrumb style={{ marginTop: "20px" }}>
          <Breadcrumb.Item onClick={handeleBackButton}>Home</Breadcrumb.Item>
          <Breadcrumb.Item>ListedPolocies</Breadcrumb.Item>
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
              <h3>Listed Polocies</h3>
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

              <Button
                style={{
                  borderRadius: "5px",
                  marginRight: "10px",
                  backgroundColor: "#61b33b",
                  color:"white"
                }}
                onClick={handleShowModal}
              >
             <PlusOutlined style={{paddingTop:"5px"}}/>   Add New Policy
              </Button>
               <Dropdown placement="bottomCenter" overlay={content} arrow>
              <Button
                style={{
                  borderRadius: "5px",
                  marginRight: "10px",
                  backgroundColor:"#61b33b", 
                  color:"white"
                }}
              >
                 <FilterOutlined/>   Add Filters  
              </Button>
              </Dropdown>
              <div>
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#000089",
                  }}
                >
                  {/* Download PDF/CSV */}
                  <CSVLink data={policyCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={tableData}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
          />
          <div><span>shown Results {policyListArray.length}</span></div>
          <Modal title='Add Policy' visible={isModalVisible} footer={null} onCancel={handleCancel} okText="Create">
           <Form  onFinish={onFinish} onFinishFailed={onFinishFailed}
               
           >
             <Form.Item
               name={'policyName'}
               label="Policy Name"
               style={{marginLeft:"20px"}}

               rules={[
                {
                  required: true,
                  message: 'Please Enter the Policy name',
                },
              ]}>
                     <Input/>
               </Form.Item>   
        
               <Form.Item
               name={'policyRegistration'}
               label="Registration"
               rules={[
                {
                  required: true,
                  message: 'Please Enter the registration',
                },
              ]}>
                   <Input/>
               </Form.Item>  
               <Form.Item
               name={'policyType'}
               label="Policy Type"
               rules={[
                {
                  required: true,
                  message: 'Please Enter the policy Type',
                },
                  {
                  pattern:/^(?:\d*)$/,
                  message:'Please enter numbers only'
                }
              ]}>
                   <InputNumber style={{height:"30px",width:"300px",marginTop:"10px"}}/>
               </Form.Item>  
               <Form.Item
               name={'policyDuration'}
               label="Policy Duration"
               rules={[
                {
                  required: true,
                  message: 'Please Enter the policy Duration',
                },
                {
                  pattern:/^(?:\d*)$/,
                  message:'Please enter numbers only'
                }
              ]}>
                   <InputNumber style={{height:"30px",width:"300px",marginTop:"10px"}}
/>
               </Form.Item>
               <Form.Item
               name={'policyDescription'}
               label="Description"
               rules={[
                {
                  required: true,
                  message: 'Please Enter the Description',
                },
              ]}>
                   <Input.TextArea/>
               </Form.Item>   
               <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-mailnd"}}> 
               <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
               </Form.Item> 
               <Form.Item>
                  <Button type="primary" style={{marginLeft:"30px"}} onClick={handleCancel}>
                    Cancel
                  </Button>
               </Form.Item>  
               </div>
               </Form>
          </Modal>
          <Modal title='Edit Policy' visible={isEditModalVisible} onOk={handleEditPolicyListAPI} onCancel={handelEditCancel}>
          <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="name"
                    placeholder="Policy Name"
                    value={policyName}
                    onChange={(e) => setPolicyName(e.target.value)}
                  /><br/>            
                  <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="number"
                    placeholder="Registration Number"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                  /><br/> 
                  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="type"
                    placeholder="Policy Type"
                    value={policyType}
                    onChange={(e) => setPolicyType(e.target.value)}
                  /><br/> 
                  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="Duration"
                    placeholder="Policy Duration"
                    value={policyDuration}
                    onChange={(e) => setPolicyDuration(e.target.value)}
                  /><br/> 
                  <textarea
                  style={{width:"300px",marginTop:"10px",marginLeft:"80px"}}
                  type="Textarea"
                  placeholder="Policy Description"
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                />
          </Modal>
        </div>
      )}
      {accidentListStatus && <AccidentList data={selectedPolicyData}  handeleBackButton={handeleBackButton}/>}

    </>
  );
};
export default ListedPolocies;
