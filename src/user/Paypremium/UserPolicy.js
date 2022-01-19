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
  //const [policyNo, setPolicyNo] = useState(props.data.policyNo);
  //   const [PolicyHolderName, setPolicyHolderName] = useState(props.data);
  //   const [policy, setPolicy] = useState(props.data);
  //   const [policyType, setPolicyType] = useState(props.data.phone);
  //   const [policyStartDate,setPolicyStartDate] = useState(props.data);
  //   const [maturityDate,setMaturityDate] = useState(props.data);
  //   const [premiumPlan,setpremiumPlan] = useState(props.data);
  //   const [premium,setpremium] = useState(props.data);
  //   const [premiumDueDte,setpremiumDueDte] = useState(props.data);
  //   const [details,setDetails] = useState(props.data);

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
        <div>
          {/* <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Nossa-User | User Policy details</title>
        <link href="./userpolicy_files/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous">
        <script src="./userpolicy_files/all.min.js.download" crossorigin="anonymous"></script>
    </head> */}

          <div>
            {/* <nav class="sb-topnav navbar navbar-expand ">
            <a class="navbar-brand" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/index.html">
            <img class="img-fluid" src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/img/logo.png" alt="" width="80%"/>
            </a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#">
           <svg class="svg-inline--fa fa-bars fa-w-14" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
         <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
         </svg>
           <i class="fas fa-bars"></i> Font Awesome fontawesome.com</button>
            

            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group custome-search">
                    <input class="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-primary" type="button"><svg class="svg-inline--fa fa-search fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg><i class="fas fa-search"></i> Font Awesome fontawesome.com </button>
                    </div>
                </div>
            </form>

            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle " id="userDropdown" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg class="svg-inline--fa fa-bell fa-w-14" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path> 
                    </svg>
                    <i class="fa fa-bell"></i> Font Awesome fontawesome.com</a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">Jhon Submited the claims</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">MacMohn on leave today</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">Jerry submitted the application form</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">Jhon Submited the claims</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">MacMohn on leave today</a>
                    </div>
                </li>
            </ul>
            
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/img/thumb.png" class="circle" width="35px" height="35px " alt=""/>
                        </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">Edit Profile</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">My Inbox</a>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item small" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/login.html">Logout</a>
                    </div>
                </li>
            </ul>
        </nav> */}
            <div id="layoutSidenav">
              {/* <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav mt-4">
                            <a class="nav-link " href="file:///D:/ReactNasso/nasso/src/user/Paypremium/index.html">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </a>
                            <a class="nav-link" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/payment-history.html">
                                 <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                                My Policies
                                 <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                             <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                    <a class="nav-link" href="#">Submenu-1</a>
                                    <a class="nav-link" href="#">Submenu-2</a>
                                </nav>
                            </div>
                            
                             <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                                        Add Employees
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <div class="collapse" id="pagesCollapseAuth" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav">
                                            <a class="nav-link" href="login.html">Login</a>
                                            <a class="nav-link" href="register.html">Register</a>
                                            <a class="nav-link" href="password.html">Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#pagesCollapseError" aria-expanded="false" aria-controls="pagesCollapseError">
                                        Check Attendance
                                        <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                    </a>
                                    <div class="collapse" id="pagesCollapseError" aria-labelledby="headingOne" data-parent="#sidenavAccordionPages">
                                        <nav class="sb-sidenav-menu-nested nav">
                                            <a class="nav-link" href="401.html">401 Page</a>
                                            <a class="nav-link" href="404.html">404 Page</a>
                                            <a class="nav-link" href="500.html">500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                            <a class="nav-link" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/service-request.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div> 
                                Service Request
                            </a>
                            <a class="nav-link" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/claims.html">
                                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                Claims
                            </a>
                            <a class="nav-link" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/complaints.html">
                                 <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div>
                                Complaints
                            </a>
                            <a class="nav-link" href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                                <div class="sb-nav-link-icon"><i class="fas fa-table"></i></div> 
                                Settings
                            </a>
                        </div>
                    </div>
                       <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div> */}
              <div id="layoutSidenav_content">
                <main>
                   <div>
                    {/* <div class="row d-flex align-items-center justify-content-between">
                      <div class="col-lg-12 text-left">
                        <div class="breadcrumb-custom mt-4 mb-4">
                          <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                              <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                                Home
                              </a>
                            </li>
                            <li class="breadcrumb-item">
                              <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                                Pay Premium /
                              </a>
                            </li>
                            <li class="breadcrumb-item">
                              <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                                My Active Policies /{" "}
                              </a>
                            </li>
                            <li
                              class="breadcrumb-item active"
                              aria-current="page"
                            >
                              {policyList && policyList.policy.policyCode}
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>  */}
                     <div>
                              <a
                                style={{
                                  marginTop: "30px",
                                  marginBottom: "30px",
                                  fontSize: "20px",
                                }}
                                onClick={() => handleBack()}
                              >
                                <ArrowLeftOutlined
                                  style={{ paddingTop: "10px" }}
                                />{" "}
                                BACK
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
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html"
                                class="danger-color"
                                data-toggle="modal"
                                data-target="#addPolicyList"
                              >
                                Status: Premium Due
                                {/* <img src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/img/warning.svg"/> */}
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
                              href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#collapseExample"
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
                          <div class="row" style={{ display: "flex", flexDirection: "row" }}>
                            {" "}
                            <div class="col-12 col-md-2">
                              <a
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                                class="btn-close"
                              >
                                Close Policy
                              </a>
                            </div>
                            {/* <div class="col-12 col-md-2">
                                //     <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#" class="btn-close renew-btn">Renew Policy</a>
                                // </div> */}
                            <div class="col-12 col-md-2">
                              <a
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                                class="btn-close premium-btn"
                                onClick={() => handlePayment()}
                              >
                                Pay Premium
                              </a>
                            </div>
                            <div class="col-12 col-md-2">
                              <a
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
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
                              href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                              class="btn-close renew-btn"
                            >
                              Renew Policy
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </main>
                <footer class="py-4 bg-light mt-auto">
                  <div class="container-fluid">
                    <div class="d-flex align-items-center justify-content-between small">
                      <div class="text-muted">Copyright © Nossa 2020</div>
                      <div>
                        <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                          Privacy Policy
                        </a>
                        ·
                        <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                          Terms &amp; Conditions
                        </a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
            {/* <script src="./userpolicy_files/jquery-3.5.1.slim.min.js.download" crossorigin="anonymous"></script>
        <script src="./userpolicy_files/bootstrap.bundle.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/js/scripts.js"></script>
        <script src="./userpolicy_files/Chart.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/chart-area-demo.js"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/chart-bar-demo.js"></script>
        <script src="./userpolicy_files/jquery.dataTables.min.js.download" crossorigin="anonymous"></script>
        <script src="./userpolicy_files/dataTables.bootstrap4.min.js.download" crossorigin="anonymous"></script>
        <script src="file:///D:/ReactNasso/nasso/src/user/Paypremium/assets/demo/datatables-demo.js"></script> */}
          </div>
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
