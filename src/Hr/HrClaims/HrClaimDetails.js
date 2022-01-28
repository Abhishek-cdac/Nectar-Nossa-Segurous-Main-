import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "antd";
import { verifyClaimList } from "../../services/authentication";


const HrClaimDetails = (props) =>{
    console.log("props",props)
    const selectedRecord = props && props.selectedRecord;
    const alldata = props && props.data;
    console.log("data",alldata)
    const status = props && props.status;
    console.log("selecet",selectedRecord)
    const ClaimList =
    alldata && alldata.filter((data) => data.claim_id === selectedRecord.claim_id)[0];


    console.log("list",ClaimList)
    const [ClaimDetailsPage, setClaimDetailsPage] = useState(true);
    

    
  
 const handleverifyAPI =async(verifyStatus)=>{
    const data={
     "id":ClaimList.id,
     "verifyStatus":  verifyStatus,
    //  "priorityStatus":ClaimList.priorityStatus
    }
    try{
      const resp = await verifyClaimList(data);
      console.log("respppp",resp)
      handlesubmit()
    }
    catch(error){
      console.log("error",error)
    }
 
  }
 
   const handlesubmit = ()=>{
      props.handlesubmit()
   }
 
   
   const handleBack = ()=>{
       props.handleBack()
   }
      let navigate = useNavigate();
    return(
        <>


        {ClaimDetailsPage && (
            <div>
                 <div class="row d-flex align-items-center justify-content-between">
                            <div class="col-12">
                                <div class="heading-with-box">
                                    <div class="row">
                                        <div class="col-lg-6 col-md-6 text-left">
                                            <h3>Claim ID : <span class="color-green">{ClaimList &&ClaimList.claim_details.claim_id}</span></h3>
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
                                        <p>{}</p>
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
                                        <hr class="mt-0"/>
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
                                <hr class="mt-0"/>
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <strong class="float-left mb-3">Grand TOTAL</strong>
                                    </div>
                                    <div class="col-md-6 col-sm-6 col-6">
                                        <strong class="green-text float-right mb-3">{ClaimList && ClaimList.claim_details.dateDischarge}</strong>
                                    </div>
                                </div>
                            </div>
                        </div><detail-box-End/>

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
                                <Button class="btn btn-back mb-2" type="submit" style={{width: "180px",color:"white",backgroundColor:"black"}} onClick={props.handleBack}>Back</Button>
                            </div>
                            <div class="col-12 col-md-2 col-sm-2">
                                <Button class="btn btn-approve-claim mb-2" type="submit" style={{width: "180px",color:"white",backgroundColor:"red"}} onClick={handleverifyAPI('Reject')}>Reject Claim</Button>
                            </div>
                            <div class="col-12 col-md-2 col-sm-2">
                                <Button class="btn btn-reject-claim mb-2" type="submit" style={{width: "180px",color:"white",backgroundColor:"#000089"}} onClick={handleverifyAPI('Approve')}>Approve Claim</Button>
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
                </div>
        )
       }
            
            </>

      

    );
}
export default HrClaimDetails