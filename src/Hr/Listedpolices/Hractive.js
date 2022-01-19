import React,{useState,useEffect} from "react"
import { Table,Modal,Input,Form } from "antd";
import { DeleteOutlined,PlusOutlined,FilterOutlined,VerticalAlignBottomOutlined,EditOutlined } from "@ant-design/icons"; 
import { getPolicyList,deletePolicyList,editPolicyList } from "../../services/authentication";



const Hractive = (props) =>{
    const [tableData,setTableData] = useState('')
    const[editPolicyData,setEditPolicyData]=useState(" ")
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [count, setCount] = useState(0)
    const table = props.tableData
    const data ={
        search:'',
        type:'',
        id:''
      }

  const handleEditShowModal = () =>{
    setIsEditModalVisible(true)
  }
  const handelEditCancel= () =>{
    setIsEditModalVisible(false)
  }

  const onFinish = (values) =>{
    setEditPolicyData(values)
  }

//Api integration to policy List
    
// const handleGetPolicyListServiceCall = async (data) =>{
//     try {
//       let tableDataArr=[]; 
//       const resp = await getPolicyList(data);
//       setCount(resp && resp.data.length)
//       resp && resp.data.map((data,i)=>{
//         const value = {
//           key: data.id,
//           name: data.policyName,
//           code: data.policyCode,
//           type: data.policyType,
//           count: data.Activecount,
//           number: data.registration,
//         }
//         console.log(value)
//         tableDataArr.push(value)
//       })
//       setTableData(tableDataArr)
//      console.log('resp',resp)
//     } catch (error) {
//         console.log('error',error)
//       // showAlert('In valide data', "error");
//     }
//   }


//Edit Api

// const handleEditPolicyListAPI = async () =>{

//     const data= {
//       'policyName': editPolicyData.policyName,
//       'registration': editPolicyData.policyRegistration,
//       'policyType':editPolicyData.policyType,
//       'policyDuration': editPolicyData.policyDuration,
//       'description': editPolicyData.policyDescription
//     }
//     try {
//       const resp = await editPolicyList(data);
//       console.log('success')
//       handleGetPolicyListServiceCall()
//     } catch (error) {
//         console.log('error',error)
//       // showAlert('In valide data', "error");
//     }
//   }
// //Delete API integration
//   const handleDeletePolicy = async(text,record) =>{
//     console.log('nnagvsvgv',text,record)
//     const data = {
//       'id':record.key
//     }
//     try {
//      const resp = await deletePolicyList(data);
//      console.log('success')
//      handleGetPolicyListServiceCall()
//    } catch (error) {
//        console.log('error',error)
//      // showAlert('In valide data', "error");
//    }
//    }






const columns = [
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <a
          style={{ color: "#4cbb17" }}
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
      title: "Active Policies",
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
            {/* <EditOutlined style={{ color: "#000089", paddingLeft: "10px" }} onClick={handleEditShowModal}
/>
            <DeleteOutlined style={{paddingLeft:"30px"}}  onClick={()=>handleDeletePolicy(text,record)}/> */}
          </>
        );
      },
    },
  ];

 
return(
    <>
  <Table
  columns={columns}
  dataSource={table}
  //onChange={this.handleChange}
  pagination={true}
/>
<Modal title='Edit Policy' visible={isEditModalVisible} onOk={null} onCancel={handelEditCancel}>
           <Form  onFinish={onFinish} 
          //  onFinishFailed={onFinishFailed}
           >
             <Form.Item
               name={'policyName'}
               label="Policy Name"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input/>
               </Form.Item>   
               {/* <Form.Item
               name={'Code'}
               label="Policy code"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input/>
               </Form.Item>   */}
               <Form.Item
               name={'policyRegistration'}
               label="Registration"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input/>
               </Form.Item>  
               <Form.Item
               name={'policyType'}
               label="Policy Type"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input/>
               </Form.Item>  
               <Form.Item
               name={'policyDuration'}
               label="Policy Duration"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input/>
               </Form.Item>
               <Form.Item
               name={'policyDescription'}
               label="Description"
                 rules={[
                   {
                     required:true
                   },
                 ]}>
                   <Input.TextArea/>
               </Form.Item>   
                   
               </Form>
          </Modal>

</>

);
} 
export default Hractive