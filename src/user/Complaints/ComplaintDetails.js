import React,{useState} from "react"
import {Button,Modal} from "antd";

const ComplaintDetails = (props)=>{

    const selectedRecord = props && props.selectedRecord;
    const alldata = props && props.data;
    console.log("data",alldata)
    console.log("selecet",selectedRecord)
    const ComplaintList =
    alldata && alldata.filter((data) => data.complaintCode === selectedRecord.id)[0]


    console.log("list",ComplaintList)
     console.log("policuy",ComplaintList && ComplaintList.userPolicy.policy.policyName)
    const [complaintsDetailspage, setcomplaintsDetailspage] = useState(true);
    const[policyName,setPolicyName]=useState('')
     const[complaintId,setComplaintId]=useState("")
    const[status,setStatus]=useState("")
    const[complaintDescription,setComplaintDescription]=useState('')
    const[subject,setsubject]=useState('')
    const[IsResubmitModalVisible,setIsResubmitModalVisible]=useState('')
    const[complaintTablepage,setComplaintTablepage]=useState('')


       const handleresubmitShowModal = () =>{
      console.log("array",ComplaintList)
     const value =  ComplaintList
     console.log('value',value)
     if(value){
       setComplaintId(value.complaintCode)
      setPolicyName(value.userPolicy.policy.policyName)
      setComplaintDescription(value.description)
      setsubject(value.subject)

     }
      setIsResubmitModalVisible(true)
  
    }
      const handlesubmit= () =>{
      setIsResubmitModalVisible(false)
    }  
  const handelEditCancel= () =>{
      setIsResubmitModalVisible(false)
    }  
  

    return(
        <>
        {complaintsDetailspage &&
        <div>
        <div className="row d-flex align-items-center justify-content-between">
                            <div className="col-12">
                                <div className="heading-with-box mb-2">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 text-left">
                                            <h3>Complaint ID :<span className="color-green"></span>{ComplaintList && ComplaintList.complaintCode}</h3>
                                        </div>
                                        <div className="col-lg-6 col-md-6 text-right">
                                            <a href="#" className="btn resolve-color" data-toggle="modal" data-target="#addPolicyList">{ComplaintList && ComplaintList.verifyStatus}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="faq-custom">
                            <div className="detail-box">
                                <div className="card-body form-custom">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                            <div className="table-data">
                                                <span>Policy</span>
                                             
                                                <b>{ComplaintList && ComplaintList.userPolicy.policy.policyName}</b>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                                            <div className="table-data">
                                                <span>Policy type</span>
                                                <b>{ComplaintList && ComplaintList.userPolicy.policy.policyCode}</b>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                            <div className="table-data">
                                                <span>Submitted Date</span>
                                                <b>{ComplaintList && ComplaintList.complaintDate}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                                            <div className="table-data">
                                                <span>Subject</span>
                                                <b>{ComplaintList && ComplaintList.subject}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                                            <div className="table-data">
                                                <span>Remark</span>
                                                <b>{ComplaintList && ComplaintList.description}</b>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="btn-box">
                                                <Button type="submit" className="btn btn-back mb-4 mr-2" style={{width: "90px",color:"white",backgroundColor:"black"}} onClick={props.handleBack}>Back</Button>
                                         <Button type="submit" className="btn btn-reject-claim mb-4 mr-2" style={{width: "180px",color:"white",backgroundColor:"red"}}>Delete Complaint</Button>
                                                <Button type="submit" className="btn btn btn-resubmit mb-4" style={{width: "180px",color:"white",backgroundColor:"#000089"}}  onClick={()=>handleresubmitShowModal()}>Resubmit Complaint</Button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content popup-form">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Resubmit Complaint</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">                 
                      
<Modal title='Resubmit Complaint' visible={IsResubmitModalVisible} onOk={handlesubmit}  onCancel={handelEditCancel}>

                 <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="Id"
                    placeholder="Complaint Id"
                    value={complaintId}
                    onChange={(e) => setComplaintId(e.target.value)}
                  /><br/> 
         
          <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="subject"
                    placeholder="subject"
                    value={subject}
                    onChange={(e) => setsubject(e.target.value)}
                  /><br/>            
                  <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}}
                    type="name"
                    placeholder="policy Name"
                    value={policyName}
                    onChange={(e) => setPolicyName(e.target.value)}
                  /><br/> 
                 
                  <textarea
                  style={{width:"300px",marginTop:"10px",marginLeft:"80px"}}
                  type="Textarea"
                  placeholder="complaint Description"
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                />
      
     
          </Modal>
          </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
                        </div>}
                            
                        </>
    )
}
export default ComplaintDetails