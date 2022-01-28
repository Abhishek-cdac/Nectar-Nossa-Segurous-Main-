import {Form,Input,Select,Button} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React,{useState,useEffect} from "react";
import './Complaint.style.css';
import {getPolicyList,addComplaintList} from "../../services/authentication"



const getPolicyload = {
    search:'',
    type:'',
    id:''
}

const NewComplaint = () =>{ 
    const {Option}=Select;
    const[policyCode,setpolicyCode]=useState('');
    const[policyName,setpolicyName]=useState('')
  const[addComplaint,setAddComplaint]=useState('')
    const[listAPIUpdateStatus,setListAPIUpdateStatus]=useState('')
    const Token = window.localStorage.getItem('token');
    console.log("Token in list",Token)

const handleGetPolicyListServiceCall = async(data) =>{
    try{
        let tableDataArr=[];
        const resp=await getPolicyList(data);
        console.log("resp in new com[",resp)
        resp&&resp.data.map((data,i)=>{
            tableDataArr.push(data.policyCode)
            tableDataArr.push(data.policyName)
            console.log("data",data)
        })
        setpolicyCode(tableDataArr)
        setpolicyName(tableDataArr)
        console.log("gwhbhjb",tableDataArr)
        console.log("12334",resp)
    }
        catch(error){
            console.log("err",error)
        }
    
}
useEffect(()=>{
    handleGetPolicyListServiceCall(getPolicyload)},[])

//Add api for complaint

const handleAddComplaintListAPI = async(addComplaint) =>{
    console.log("addcomp",addComplaint)
    const payload={
    'userPolicy_id':1,
    'subject':addComplaint.subject,
    'description':addComplaint.description,
    'complaintDate':addComplaint.complaintDate,
    'token':Token
}
try{
    const resp =await addComplaintList(payload);
    console.log('sucess',resp)
    handleGetPolicyListServiceCall()
    setListAPIUpdateStatus(true)
   // handelCancel()
}
catch(error){
    console.log("error",error)
}
}

const onFinish = (values)=>{
     setAddComplaint(values)
    handleAddComplaintListAPI(values)
}
const onFinishFailed = (errorInfo) =>{
    console.log('failed',errorInfo)
}





     // const [newComplaintspage, setNewComplaintspage] = useState(true);
    return(
        <>
        {/* {newComplaintspage && <div> */}
        <Form onFinish={onFinish}>
        <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12">
            <div className="heading-with-box mb-2">
                <div className="row">
                    <div className="col-lg-6 col-md-6 text-left">
                        <h3>New Complaint</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                        <a href="" className="btn" data-toggle="modal" data-target="#addPolicyList">Status : Not Submited</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="faq-custom">
        <div className="detail-box">
            <div className="card-body form-custom">
                <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="form-group">
                            <label for="exampleInputtext" className="mb-1">Policy No.<em>*</em></label>
                            <Form.Item name="policy_No"
                            style={{width:"300px"}}
                            rules =  {[
                                {
                                required: true,
                                message:"policy is Required"
                            },
                            ]}
                            >
                            <Select 
                            placeholder="select a option" allowclear>
                               {policyCode && policyCode.map((data) => (
                                    <Option value={data}>{data}</Option>
                                ))}
                            </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="form-group">
                            <label for="exampleInputtext" className="mb-1">Policy<em>*</em></label>
                            <Form.Item name="policyName"
                            style={{width:"300px"}}
                            rules =  {[
                                {
                                required: true,
                                message:"policyName is Required"
                            },
                            ]}
                            >
                            <Select 
                            placeholder="select a option" allowclear>
                                {policyName && policyName.map((data) => (
                                    <Option value={data}>{data}</Option>
                                ))}
                            </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                        <div className="form-group">
                            <label for="exampleInputtext" className="mb-1">Policy type<em>*</em></label>
                            <Form.Item name="policyType"
                            style={{width:"300px"}}
                            rules =  {[
                                {
                                required: true,
                                message:"policy is Required"
                            },
                            ]}
                            >
                            <Select 
                            placeholder="select a option" allowclear>
                              <Option  value ='General'>General</Option>
                        <Option value ='Health'>Health</Option>
                        <Option value ='General && Health'>General && Health</Option>
                        <Option value ='vehicle'>vehicle</Option>
                            </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="exampleInputHolderName" className="mb-1">Subject<em>*</em></label>
                            <Form.Item name="subject"
                            style={{width:"300px"}}
                            rules =  {[
                                {
                                required: true,
                                message:"subject is Required"
                            },
                            ]}
                            >
                            <Input type="text" className="form-control" id="exampleInputHolderName" aria-describedby="HolderName" placeholder=""/>
                        </Form.Item>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="exampleInputHolderName" className="mb-1">Complaint Description<em>*</em></label>
                            <Form.Item name="description"
                            style={{width:"630px"}}
                            rules =  {[
                                {
                                required: true,
                                message:"description is Required"
                            },
                            ]}
                            >
                            <TextArea  style={{width:"630px"}} type="text" className="form-control" id="exampleInputHolderName" aria-describedby="HolderName" placeholder=""/>
                        </Form.Item>
                        </div>
                    </div>
                    <Button type="submit" htmlType='submit' className="btn btn-primary">Submit Complaint</Button>
                </div>
            </div>
        </div>
    </div>
    </Form>
    {/* </div>} */}
        
</>

    )
}
export default NewComplaint;