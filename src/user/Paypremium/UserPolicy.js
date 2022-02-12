import React, { useState } from "react";
import "./UserPolicy.style.css";
import CreditCard from "./Creditcard";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UserPolicy = (props) => {
  const selectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  const status = props && props.status;
  const policyList =
    alldata && alldata.data.filter((data) => data.id === selectedRecord.key)[0];
  const [policyDetailsPage, setpolicyDetailsPage] = useState(true);
  const [paymentPage, setpaymentPage] = useState(false);
  let navigate = useNavigate();

  const handleBack = () => {
    props.handleBacktoActivePage();
  };
  const handlePayment = () => {
    setpolicyDetailsPage(false);
    setpaymentPage(true);
  };
  const handleClaimRequest = () => {
    navigate("/claim");
  };
  const handleBackToUserPolicy = () => {
    setpolicyDetailsPage(true);
    setpaymentPage(false);
  };
  return (
    <>
      {policyDetailsPage && (
       <div className="container">
            <div className="ant-col ant-col-xs-24 ant-col-lg-8" style={{marginTop:"20px"}} >
            <a
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "20px",
              }}
              onClick={() => handleBack()}
            >
              <ArrowLeftOutlined style={{ paddingTop: "10px",paddingBottom:"10px" }} /> BACK
            </a>
          </div>

          <div class="row d-flex align-items-center justify-content-between">
            <div class="col-12">
              <div class="heading-with-box">
                <div class="row">
                  <div class="col-lg-6 col-md-6 text-left">
                    <h3>
                      Policies No. :{" "}
                      <span class="color-green">
                        {policyList && policyList.policy.policyCode}
                      </span>
                    </h3>
                  </div>

                  <div class="col-lg-6 col-md-6 text-right">
                    <a
                      href=""
                      class="danger-color"
                      data-toggle="modal"
                      data-target="#addPolicyList"
                    >
                      Status: Premium Due
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="policy-box">
            <div class="row">
              <div class="col-12">
                <div class="table-data">
                  <span>Policy Holder Name</span>
                  <b>
                    {policyList && policyList.user.firstName}{" "}
                    {policyList && policyList.user.lastName}
                  </b>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Policy</span>
                  <b>{policyList && policyList.policy.policyName}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Policy Type</span>
                  <b>{policyList && policyList.policy.policyType}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Policy Start date</span>
                  <b>{policyList && policyList.createdAt}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Maturity date</span>
                  <b>{policyList && policyList.policyMaturityDate}</b>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Premium plan</span>
                  <b>{policyList && policyList.premiumPlan}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Premium</span>
                  <b>{policyList && policyList.premiumAmount}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">
                  <span>Premium Due date</span>
                  <b>{policyList && policyList.updatedAt}</b>
                </div>
              </div>
              <div class="col-12 col-md-3 col-sm-3">
                <div class="table-data">&nbsp;</div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md-10">
                <div class="table-data">
                  <span>Details</span>
                  <p>{policyList && policyList.policy.description}</p>
                  <a
                    data-toggle="collapse"
                    href=""
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    see more
                  </a>
                  {/* <div class="collapse" id="collapseExample">
                                            <p class="mt-2">
                                            {policyList && policyList.policy.policyCode}
                                            </p>
                                        </div> */}
                </div>
              </div>
            </div>
            <div>
              {status && (
                <div
                  class="row"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {" "}
                  <div class="col-12 col-md-2">
                    <a
                      href=""
                      class="btn-close"
                    >
                      Close Policy
                    </a>
                  </div>
               
                  <div class="col-12 col-md-2">
                    <a
                      href="#"
                      class="btn-close premium-btn"
                      onClick={() => handlePayment()}
                    >
                      Pay Premium
                    </a>
                  </div>
                  <div class="col-12 col-md-2">
                    <a
                      href="#"
                      class="btn-close claim-btn"
                      onClick={() => handleClaimRequest()}
                    >
                      Claim Request
                    </a>
                  </div>
                </div>
              )}
              {!status && (
                <div class="col-12 col-md-2">
                  <a
                    href="#"
                    class="btn-close renew-btn"
                  >
                    Renew Policy
                  </a>
                </div>
              )}
            </div>
          </div>

          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright © Nossa 2020</div>
                <div>
                  <a href="#">
                    Privacy Policy
                  </a>
                  ·
                  <a href="#">
                    Terms &amp; Conditions
                  </a>
                </div>
              </div>
            </div>
          </footer>

  
        </div>
      )}
      {paymentPage && (
        <CreditCard
          selectedRecord={selectedRecord}
          handleBackToUserPolicy={handleBackToUserPolicy}
        />
      )}
    </>
  );
};
export default UserPolicy;
