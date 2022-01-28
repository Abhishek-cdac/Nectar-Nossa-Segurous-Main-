
import React, { useState } from "react";
//import './UserClaim.style.css'
import { useNavigate } from "react-router-dom";
import { Button,Modal,Form,DatePicker } from "antd";
import { getEditClaim,getDeleteClaim } from "../../services/authentication";

const UserClaim = (props) => {
    const selectedRecord = props && props.SelectedRecord;
    const alldata = props && props.data;
    console.log("data", alldata)
    const status = props && props.status;
const ClaimList =
        alldata && alldata.filter((data) => data.id === selectedRecord.id)[0];    
    const ClaimListDetails = ClaimList && ClaimList
    console.log("ClaimListDetails", ClaimListDetails)
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [ClaimName, setClaimName] = useState(ClaimListDetails.name ? ClaimListDetails.name : '')
    const [claimEmailId, setClaimEmailId] = useState(ClaimListDetails.email ? ClaimListDetails.email : '')
    const [claimPhone, setClaimPhone] = useState(ClaimListDetails.phone ? ClaimListDetails.phone : '')
    const [claimAddress, setClaimAdress] = useState(ClaimListDetails.address ? ClaimListDetails.address : '')
    const [diagnosis, setdiagnosis] = useState(ClaimListDetails.diagnosis ? ClaimListDetails.diagnosis : '')
    const [relationOccupation, setrelationOccupation] = useState(ClaimListDetails.relationOccupation ? ClaimListDetails.relationOccupation : '')
    const [coveredByOtherInsurance, setcoveredByOtherInsurance] = useState(ClaimListDetails.coveredByOtherInsurance ? ClaimListDetails.coveredByOtherInsurance : '')
    const [companyName, setcompanyName] = useState(ClaimListDetails.companyName ? ClaimListDetails.companyName :'')
    const [sumInsured, setsumInsured] = useState(ClaimListDetails.sumInsured ? ClaimListDetails.sumInsured :'')
    const [relationWithInsured, setrelationWithInsured] = useState(ClaimListDetails.relationWithInsured ? ClaimListDetails.relationWithInsured :'')
    const [relationName, setrelationName] = useState(ClaimListDetails.relationName ? ClaimListDetails.relationName :'')
    const [relationGender, setrelationGender] = useState(ClaimListDetails.relationGender ? ClaimListDetails.relationGender :'')
    const [relationAge, setrelationAge] = useState(ClaimListDetails.relationAge ? ClaimListDetails.relationAge :'')
    const [relationEmail, setrelationEmail] = useState(ClaimListDetails.relationEmail ? ClaimListDetails.relationEmail :'')
    const [relationPhone, setRelationPhone] = useState(ClaimListDetails.relationPhone ? ClaimListDetails.relationPhone :'')
    const [relationAddress, setRelationAdress] =useState(ClaimListDetails.relationAddress ? ClaimListDetails.relationAddress :'')
    const [claimhospitalName,setclaimhospitalName] = useState(ClaimListDetails.claim_details.hospitalName ? ClaimListDetails.claim_details.hospitalName :'')
    const [roomCategory, setroomCategory] = useState(ClaimListDetails.claim_details.roomCategory ? ClaimListDetails.claim_details.roomCategory :'')
    const [claimreason, setclaimreason] = useState(ClaimListDetails.claim_details.reason ? ClaimListDetails.claim_details.reason :'')
    const [injuryCause, setinjuryCause] = useState(ClaimListDetails.claim_details.injuryCause ? ClaimListDetails.claim_details.injuryCause :'') 
    const [preHospitalExpense, setpreHospitalExpense] = useState(ClaimListDetails.claim_details.preHospitalExpense ? ClaimListDetails.claim_details.preHospitalExpense :'')
    const [postHospitalExpense,setpostHospitalExpense]= useState(ClaimListDetails.claim_details.postHospitalExpense ? ClaimListDetails.claim_details.postHospitalExpense :'')
    const [hospitalExpense, sethospitalExpense] = useState(ClaimListDetails.claim_details.hospitalExpense ? ClaimListDetails.claim_details.hospitalExpense :'')
    const [ambulanceExpense, setambulanceExpense] = useState(ClaimListDetails.claim_details.ambulanceExpense ? ClaimListDetails.claim_details.ambulanceExpense :'')
    const [otherExpense, setotherExpense] = useState(ClaimListDetails.claim_details.otherExpense ? ClaimListDetails.claim_details.otherExpense :'')
    const [preHospitalDuration, setpreHospitalDuration] = useState(ClaimListDetails.claim_details.preHospitalDuration ? ClaimListDetails.claim_details.preHospitalDuration :'')
    const [postHospitalDuration, setpostHospitalDuration] = useState(ClaimListDetails.claim_details.postHospitalDuration ? ClaimListDetails.claim_details.postHospitalDuration :'')
    const [healthCheckupExpense, sethealthCheckupExpense] = useState(ClaimListDetails.claim_details.healthCheckupExpense ? ClaimListDetails.claim_details.healthCheckupExpense :'')
    const [hospitalDailyCash, sethospitalDailyCash] = useState(ClaimListDetails.claim_details.hospitalDailyCash ? ClaimListDetails.claim_details.hospitalDailyCash :'')
    const [surgicalCash, setsurgicalCash] = useState(ClaimListDetails.claim_details.surgicalCash ? ClaimListDetails.claim_details.surgicalCash :'')
    const [criticalIllnessbenefit, setcriticalIllnessbenefit] = useState(ClaimListDetails.claim_details.criticalIllnessbenefit ? ClaimListDetails.claim_details.criticalIllnessbenefit :'')
    const [convalescence, setconvalescence] = useState(ClaimListDetails.claim_details.convalescence ? ClaimListDetails.claim_details.convalescence :'')
    const [lumpSumBenefit, setlumpSumBenefit] = useState(ClaimListDetails.claim_details.lumpSumBenefit ? ClaimListDetails.claim_details.lumpSumBenefit :'')
    const [otherCharges, setotherCharges] = useState(ClaimListDetails.claim_details.otherCharges ? ClaimListDetails.claim_details.otherCharges :'')
    const [lumpSumBenefitDetail, setlumpSumBenefitDetail] = useState(ClaimListDetails.claim_details.lumpSumBenefitDetail ? ClaimListDetails.claim_details.lumpSumBenefitDetail :'')
    const [dateAdmission, setdateAdmission] = useState(ClaimListDetails.claim_details.dateAdmission ? ClaimListDetails.claim_details.dateAdmission :'')
    const [dateDischarge, setdateDischarge] = useState(ClaimListDetails.claim_details.dateDischarge ? ClaimListDetails.claim_details.dateDischarge : '')
    const [dateInjury, setdateInjury] = useState(ClaimListDetails.claim_details.dateInjury ? ClaimListDetails.claim_details.dateInjury :'')
    const [realtionDOB, setrealtionDOB] = useState(ClaimListDetails.relationDOB ? ClaimListDetails.relationDOB :'')
    const [errorMsg,seterrorMsg] = useState('')
    
    const handelEditCancel = () => {
        setIsEditModalVisible(false)
    }
    const handleEditAgentListAPI = () => {
        setIsEditModalVisible(false)
    }
    const handleShowModal = ()=>{
        setIsEditModalVisible(true)
    }
    const onFinish = async(values) =>{
        console.log(values)
        const payload = {
            "name": ClaimName,
            "phone": claimPhone,
            "email": claimEmailId,
            "address": claimAddress,
 
            "coveredByOtherInsurance": coveredByOtherInsurance,
            "diagnosis": diagnosis,
            "companyName": companyName,
            "sumInsured": sumInsured,
            "relationWithInsured": relationWithInsured,
            "relationName": relationName,
            "relationGender": relationGender,
            "relationDOB": realtionDOB,
            "relationAge": relationAge,
            "relationOccupation": relationOccupation,
            "relationAddress": relationAddress,
            "relationPhone": relationPhone,
            "relationEmail": relationEmail,
                "hospitalName": claimhospitalName,
                "roomCategory": roomCategory,
                "reason": claimreason,
                "injuryCause": injuryCause,
                "dateInjury": dateInjury, 
                "dateAdmission": dateAdmission, 
                "dateDischarge": dateDischarge, 
                "preHospitalExpense": preHospitalExpense,
                "hospitalExpense": hospitalExpense,
                "postHospitalExpense": postHospitalExpense,
                "healthCheckupExpense": healthCheckupExpense,
                "ambulanceExpense": ambulanceExpense,
                "otherExpense": otherExpense,
                "preHospitalDuration": preHospitalDuration,
                "postHospitaDuration": postHospitalExpense,
                "hospitalDailyCash": hospitalDailyCash,
                "surgicalCash": surgicalCash,
                "criticalIllnessbenefit": criticalIllnessbenefit,
                "convalescence": convalescence,
                "lumpSumBenefit": lumpSumBenefit,
                "otherCharges": otherCharges,
                "lumpSumBenefitDetail": lumpSumBenefitDetail,
             
            }
        if(claimPhone === ''|| claimEmailId === ''||claimAddress === ''|| ClaimName === ''){
            seterrorMsg('Please Fill all fileds.')
        }else if(values.dateAdmission === undefined || values.dateDischarge === undefined || values.dateInjury === undefined || values.realtionDOB === undefined){
            seterrorMsg('Please Fill all fileds.')
        }else{
            try { 
                const resp = await getEditClaim(payload);
                console.log('record Edited successfuly')
                 handelEditCancel()
              } catch (error) {
                  console.log('error',error)
                // showAlert('In valide data', "error");
              }
        }
    }

    const handleDeleteClaim = async() =>{
        const value = ClaimList && ClaimList
        const payload = {'id':value.id}
         try {
            const resp = await getDeleteClaim(payload);
                console.log('record deleted successfuly')
          } catch (error) {
              console.log('error',error)
            // showAlert('In valide data', "error");
          }
    }

    let navigate = useNavigate();
    return (
        <>
            <div>
                <div class="row d-flex align-items-center justify-content-between">
                    <div class="col-12">
                        <div class="heading-with-box">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 text-left">
                                    <h3>Claim ID : <span class="color-green">{ClaimList && ClaimList.claim_details.claim_id}</span></h3>
                                </div>
                                <div class="col-lg-6 col-md-6 text-right">
                                    <a href="" class="grey-color" data-toggle="modal" data-target="#addPolicyList">Status : <span>{ClaimList && ClaimList.verifyStatus}</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Details of Primary Insured</h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>NS Account No*</b>
                                <p>{ }</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Policy No</b>
                                <p>{ClaimList && ClaimList.userPolicy.policy.policyCode}</p>

                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>User Name</b>
                                <p>
                                    {ClaimList && ClaimList.userPolicy.user.firstName}{" "}
                                    {ClaimList && ClaimList.userPolicy.user.lastName}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Policy Name</b>
                                <p>{ClaimList && ClaimList.userPolicy.user.policyName}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Phone No</b>
                                <p>{ClaimList && ClaimList.userPolicy.user.phone}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Email Address</b>
                                <p>{ClaimList && ClaimList.userPolicy.user.email}</p>
                            </div>
                            <div class="col-md-9 col-sm-9 col-12">
                                <b>Address</b>
                                <p>{ClaimList && ClaimList.address} </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Details of Insurance History</h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <div class="row">
                            <div class="col-md-4 col-sm-4 col-12">
                                <b>Currently covered by any other Mediclaim / Health Insurance</b>
                                <p>{ClaimList && ClaimList.coveredByOtherInsurance}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Diagnosis</b>
                                <p>{ClaimList && ClaimList.diagnosis}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Company Name</b>
                                <p>{ClaimList && ClaimList.companyName}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Policy No</b>
                                <p>{ClaimList && ClaimList.policyNo}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Sum Insured</b>
                                <p>{ClaimList && ClaimList.sumInsured}</p>
                            </div>
                        </div>
                    </div>
                </div>detail-box-End

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Details of Insured Person Hospitalized</h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Relationship to Primary Insured</b>
                                <p>{ClaimList && ClaimList.relationWithInsured}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Name</b>
                                <p> {ClaimList && ClaimList.relationName
                                }</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Gender</b>
                                <p>{ClaimList && ClaimList.relationGender}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Date of Birth</b>
                                <p>{ClaimList && ClaimList.relationDOB}</p>
                            </div>
                            <div class="col-md-1 col-sm-1 col-12">
                                <b>Age</b>
                                <p>{ClaimList && ClaimList.relationAge}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Email Address</b>
                                <p>{ClaimList && ClaimList.relationEmail}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Occupation</b>
                                <p>{ClaimList && ClaimList.relationOccupation}</p>
                            </div>
                            <div class="col-md-9 col-sm-9 col-12">
                                <b>Phone No</b>
                                <p>{ClaimList && ClaimList.relationPhone}</p>
                            </div>
                        </div>
                    </div>
                </div>detail-box-End

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Details of Hospitalization</h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Name of Hospital where Admited</b>
                                <p>{ClaimList && ClaimList.claim_details.hospitalName}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Room Category occupied</b>
                                <p>{ClaimList && ClaimList.claim_details.roomCategory} </p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Hospitalization due to</b>
                                <p>{ClaimList && ClaimList.claim_details.reason}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>If injury give cause</b>
                                <p>{ClaimList && ClaimList.claim_details.injuryCause}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <b>Date of Injury</b>
                                <p>{ClaimList && ClaimList.claim_details.dateInjury}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Date of Admission</b>
                                <p>{ClaimList && ClaimList.claim_details.dateAdmission}</p>
                            </div>
                            <div class="col-md-9 col-sm-9 col-12">
                                <b>Date of Discharge</b>
                                <p>{ClaimList && ClaimList.claim_details.dateDischarge}</p>
                            </div>
                        </div>
                    </div>
                </div>detail-box-End

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Details of Claim</h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <h4 class="dt">{ClaimList && ClaimList.claim_details.dateDischarge}</h4>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Pre -hospitalization expenses</b>
                                <p>{ClaimList && ClaimList.claim_details.preHospitalExpense}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Hospitalization expenses</b>
                                <p>{ClaimList && ClaimList.claim_details.hospitalExpense}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Post-hospitalization expenses</b>
                                <p>{ClaimList && ClaimList.claim_details.postHospitalExpense}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Health-Check up cost</b>
                                <p>{ClaimList && ClaimList.claim_details.healthCheckupExpense}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Ambulance Charges</b>
                                <p>{ClaimList && ClaimList.claim_details.ambulanceExpense}</p>
                            </div>
                            <div class="col-md-9 col-sm-9 col-12">
                                <b>Others Charges</b>
                                <p>{ClaimList && ClaimList.claim_details.otherCharges}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <hr class="mt-0" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Pre -hospitalization period</b>
                                <p>{ClaimList && ClaimList.claim_details.preHospitalDuration}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Post -hospitalization period</b>
                                <p>{ClaimList && ClaimList.claim_details.postHospitaDuration}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Post-hospitalization expenses</b>
                                <p>Tabl{ClaimList && ClaimList.claim_details.postHospitalExpense}ets</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Hospital Daily cash</b>
                                <p>{ClaimList && ClaimList.claim_details.hospitalDailyCash}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Surgical Cash</b>
                                <p>{ClaimList && ClaimList.claim_details.surgicalCash}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Critical Illness benefit</b>
                                <p>{ClaimList && ClaimList.claim_details.criticalIllnessbenefit}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Convalescence</b>
                                <p>{ClaimList && ClaimList.claim_details.convalescence}</p>
                            </div>
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Pre/Post hospitalization Lump sum benefit</b>
                                <p>{ClaimList && ClaimList.claim_details.lumpSumBenefit}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 col-sm-3 col-12">
                                <b>Others Charges</b>
                                <p>{ClaimList && ClaimList.claim_details.otherCharges}</p>
                            </div>
                            <div class="col-md-9 col-sm-9 col-12">
                                <b>Details of Lump sum / cash benefit claimed</b>
                                <p>{ClaimList && ClaimList.claim_details.lumpSumBenefitDetail}</p>
                            </div>
                        </div>
                        <hr class="mt-0" />
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-6">
                                <strong class="float-left mb-3">Grand TOTAL</strong>
                            </div>
                            <div class="col-md-6 col-sm-6 col-6">
                                <strong class="green-text float-right mb-3">{ClaimList && ClaimList.claim_details.dateDischarge}</strong>
                            </div>
                        </div>
                    </div>
                </div><detail-box-End />

                <div class="detail-box">
                    <div class="row">
                        <div class="col-12">
                            <h1 class="pl-4">Claim Documents Submitted - Check Lis <a href="#" class="float-right">Download All <img src="assets/img/ic_file_download.png" alt="" /> </a></h1>
                        </div>
                    </div>
                    <div class="detail-box-inner pl-4 pr-4">
                        <div class="row">
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="detail-pdf-box">
                                    <img src="assets/img/vrmllewr.png" alt="" class="img-responsive" />
                                </div>
                                <p class="text-center mt-2">{ClaimList && ClaimList.claim_documents}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="detail-pdf-box">
                                    <img src="assets/img/vrmllewr.png" alt="" class="img-responsive" />
                                </div>
                                <p class="text-center mt-2">{ClaimList && ClaimList.claim_documents}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="detail-pdf-box">
                                    <img src="assets/img/vrmllewr.png" alt="" class="img-responsive" />
                                </div>
                                <p class="text-center mt-2">{ClaimList && ClaimList.claim_documents}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="detail-pdf-box">
                                    <img src="assets/img/vrmllewr.png" alt="" class="img-responsive" />
                                </div>
                                <p class="text-center mt-2">{ClaimList && ClaimList.claim_documents}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="detail-pdf-box">
                                    <img src="assets/img/vrmllewr.png" alt="" class="img-responsive" />
                                </div>
                                <p class="text-center mt-2">{ClaimList && ClaimList.claim_documents}</p>
                            </div>
                            <div class="col-md-2 col-sm-2 col-12">
                                <div class="all-pdf-box">
                                    {ClaimList && ClaimList.claim_documents}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">&nbsp;</div>
                    <div class="col-12 col-md-2 col-sm-2">
                        <Button class="btn btn-back mb-2" type="submit" style={{ width: "180px", color: "white", backgroundColor: "black" }} onClick={()=>props.handleback()}>Back</Button>
                    </div>
                    <div class="col-12 col-md-2 col-sm-2">
                        <Button class="btn btn-approve-claim mb-2" type="submit" style={{ width: "180px", color: "white", backgroundColor: "red" }} onClick={()=>handleDeleteClaim()}>Delete Claim</Button>
                    </div>
                    <div class="col-12 col-md-2 col-sm-2">
                        <Button class="btn btn-reject-claim mb-2" type="submit"  onClick={() =>handleShowModal()} style={{ width: "180px", color: "white", backgroundColor: "#000089" }}>Edit Claim</Button>
                    </div>

                </div>


                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Nossa 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
                <Modal title='Edit Agent' visible={isEditModalVisible} footer={null} onCancel={handelEditCancel} okText="Create">
                <Form onFinish={onFinish}>
          <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Name"
                    value={ClaimName}
                    onChange={(e) => setClaimName(e.target.value)}
                  /><br/>            
                  <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="email"
                    placeholder="Claim Email"
                    value={claimEmailId}
                    onChange={(e) => setClaimEmailId(e.target.value)}
                  /><br/> 
                  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="number"
                    maxlength="10"
                    placeholder="Phone"
                    value={claimPhone}
                    onChange={(e) => setClaimPhone(e.target.value)}
                  /><br/> 
                   <Form.Item name={'realtionDOB'}>
                    <DatePicker  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}} onChange={(date) => setrealtionDOB(date)}/>
                  </Form.Item>
                  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="Address"
                    placeholder="Address"
                    value={claimAddress}
                    onChange={(e) => setClaimAdress(e.target.value)}
                  /><br/> 
                  {/* <textarea
                  style={{width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                  type="Textarea"
                  placeholder="Permenant Adress"
                  value={PermenantAdress}
                  onChange={(e) => setPermenantAdress(e.target.value)}
                /> */}
                <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                         label={'coveredByOtherInsurance'} value={coveredByOtherInsurance} onChange={(e)=>setcoveredByOtherInsurance(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select><br/> 
                <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                         label={'diagnosis'} value={diagnosis} onChange={(e)=> setdiagnosis(e.target.value)}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
                <br/> 
                 <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setcompanyName(e.target.value)}
                  /><br/> 
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Sum Insured"
                    value={sumInsured}
                    onChange={(e) => setsumInsured(e.target.value)}
                  /><br/> 
                   <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                         label={'Relation With Insured'} value={relationWithInsured} onChange={(e)=> setrelationWithInsured(e.target.value)}>
                <option value="self">Self</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="wife">Wife</option>
                </select><br/> 
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Relation Name"
                    value={relationName}
                    onChange={(e) => setrelationName(e.target.value)}
                  /><br/> 
                  <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                         label={'Relation Gender'} value={relationGender} onChange={(e)=> setrelationGender(e.target.value)}>
                <option value="self">Male</option>
                <option value="father">Female</option>
                </select>
                <br/>
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="number"
                    placeholder="Relation Gender"
                    value={relationAge}
                    onChange={(e) => setrelationAge(e.target.value)}
                  /><br/> 
                  <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                         label={'Relation Occupation'} value={relationOccupation} onChange={(e)=>setrelationOccupation(e.target.value)}>
                <option value="self">Job</option>
                <option value="father">Business</option>
                </select><br/>
                <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="email"
                    placeholder="Claim Email"
                    value={relationEmail}
                    onChange={(e) => setrelationEmail(e.target.value)}
                  /><br/> 
                  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="number"
                    maxlength="10"
                    placeholder="Phone"
                    value={relationPhone}
                    onChange={(e) => setRelationPhone(e.target.value)}
                  /><br/>
                   <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="Address"
                    placeholder="Relation Address"
                    value={relationAddress}
                    onChange={(e) => setRelationAdress(e.target.value)}
                  /><br/> 
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Hospital Name"
                    value={claimhospitalName}
                    onChange={(e) => setclaimhospitalName(e.target.value)}
                  /><br/> 
                  <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                         label={'Room Category'} value={roomCategory} onChange={(e)=> setroomCategory(e.target.value)}>
                <option value="self">Single</option>
                <option value="father">Multi</option>
                </select><br/>
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Reason"
                    value={claimreason}
                    onChange={(e) => setclaimreason(e.target.value)}
                  /><br/> 
                  <select  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}} 
                  label={'InjuryCause'} value={injuryCause} onChange={(e)=> setinjuryCause(e.target.value)}>
           <option value="traffic">Road Traffic Accident</option>
                      <option value="accident">Accident</option>
                      <option value="killing">Killing</option>
         </select><br/>
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="PreHospital Expense"
                    value={preHospitalExpense}
                    onChange={(e) => setpreHospitalExpense(e.target.value)}
                  /><br/> 
                   <input
                    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                    type="name"
                    placeholder="Hospital Expense"
                    value={hospitalExpense}
                    onChange={(e) => sethospitalExpense(e.target.value)}
                  /><br/>  <input
                  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                  type="name"
                  placeholder="PostHospital Expense"
                  value={postHospitalExpense}
                  onChange={(e) => setpostHospitalExpense(e.target.value)}
                /><br/>  <input
                style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Health Checkup"
                value={healthCheckupExpense}
                onChange={(e) => sethealthCheckupExpense(e.target.value)}
              /><br/>  <input
              style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
              type="name"
              placeholder="Ambulance Expense"
              value={ambulanceExpense}
              onChange={(e) => setambulanceExpense(e.target.value)}
            /><br/>  <input
            style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
            type="name"
            placeholder="Other Expense"
            value={otherExpense}
            onChange={(e) => setotherExpense(e.target.value)}
          /><br/> 
          <input
          style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
          type="name"
          placeholder="PreHospital Duration"
          value={preHospitalDuration}
          onChange={(e) => setpreHospitalDuration(e.target.value)}
        /><br/> 
        <input
        style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
        type="name"
        placeholder="PostHospital Duration"
        value={postHospitalDuration}
        onChange={(e) => setpostHospitalDuration(e.target.value)}
      /><br/> 
      <input
      style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
      type="name"
      placeholder="hospital DailyCash"
      value={hospitalDailyCash}
      onChange={(e) => sethospitalDailyCash(e.target.value)}
    /><br/> 
    <input
    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
    type="name"
    placeholder="Surgical Cash"
    value={surgicalCash}
    onChange={(e) => setsurgicalCash(e.target.value)}
  /><br/> 
  <Form.Item name={'dateInjury'}>
  <DatePicker  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}} onChange={(date) => setdateInjury(date)}/>
</Form.Item>
 <Form.Item name={'dateAdmission'}>
 <DatePicker  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}} onChange={(date) => setdateAdmission(date)}/>
</Form.Item>
 <Form.Item name={'dateDischarge'}>
 <DatePicker  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px"}} onChange={(date) => setdateDischarge(date)}/>
</Form.Item>
  <input
  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
  type="name"
  placeholder="CriticalIllnessbenefit"
  value={criticalIllnessbenefit}
  onChange={(e) => setcriticalIllnessbenefit(e.target.value)}
/><br/> 
 <input
 style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
 type="name"
 placeholder="Convalescence"
 value={convalescence}
 onChange={(e) => setconvalescence(e.target.value)}
/><br/> 
 <input
 style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
 type="name"
 placeholder="LumpSumBenefit"
 value={lumpSumBenefit}
 onChange={(e) => setlumpSumBenefit(e.target.value)}
/><br/> 
<input
 style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
 type="name"
 placeholder="OtherCharges"
 value={otherCharges}
 onChange={(e) => setotherCharges(e.target.value)}
/><br/> <input
 style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
 type="name"
 placeholder="lumpSumBenefitDetail"
 value={lumpSumBenefitDetail}
 onChange={(e) => setlumpSumBenefitDetail(e.target.value)}
/><br/> 
<label style={{color:'red'}}>{errorMsg}</label>
<br/>
<Button type="primary" htmlType="submit" >
            Submit
          </Button>
          </Form >
          </Modal >
            </div >

        </>



    );
}
export default UserClaim
