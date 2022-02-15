import React, { useEffect, useState } from "react";
import { getDashboardAPI } from ".././services/authentication";
import LineGraph from "../components/atoms/LineGraph";

const AdDashboard = () => {
  const [dashBoardListArray, setDashBoardListArray] = useState("");

  const handleDashboardApI = async () => {
    const resp = await getDashboardAPI();
    setDashBoardListArray(resp);
    console.log("resp", resp);
  };
  useEffect(() => {
    console.log("cdb", dashBoardListArray);
    handleDashboardApI();
  }, []);

  return (
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <h3 className="mt-4 mb-4">Dashboard</h3>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    Policies
                    <br/>
                    Sales{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.totalPolicy}
                  </h3>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    {dashBoardListArray && dashBoardListArray.data.totalPolicy}
                  </small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="#" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    Claims
                    <br/>
                    Received{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.totalClaims}
                  </h3>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    {dashBoardListArray && dashBoardListArray.data.createdAt}
                  </small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="#" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    Claim
                    <br/>
                    Settled{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray &&
                      dashBoardListArray.data.totalClaimSettled}
                  </h3>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    {dashBoardListArray && dashBoardListArray.data.createdAt}
                  </small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="#" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    Service
                    <br/>
                    Requests{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray &&
                      dashBoardListArray.data.totalServiceRequest}
                  </h3>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    {dashBoardListArray && dashBoardListArray.data.totalPolicy}
                  </small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="#" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-faq-custom">
          <div className="accordion" id="faq">
            <div className="row">
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#FFACAC" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4">
                        Complaints
                        <br/>
                        Received{" "}
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h3 className="pr-4 pt-4" style={{ color: "#3D3D3D" }}>
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalComplaints}
                      </h3>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead1"
                      style={{ background: "#FFACAC" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link"
                        data-toggle="collapse"
                        data-target="#faq1"
                        aria-expanded="true"
                        aria-controls="faq1"
                      >
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalPolicy}
                      </a>
                    </div>

                    <div
                      id="faq1"
                      className="collapse show"
                      aria-labelledby="faqhead1"
                      data-parent="#faq"
                    >
                      <div className="card-body form-custom pt-2 pb-0">
                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <small className="w-100 d-block mb-2">
                              Resolved Complaints{" "}
                              <span className="green-text float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data
                                    .totalResolvedComplaints}
                              </span>
                            </small>
                            <small className="w-100 d-block">
                              Open Complaints{" "}
                              <span className="text-black float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data.totalOpenComplaints}
                              </span>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#8EC131" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4 text-white">
                        Complaints
                        <br/>
                        Received{" "}
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h3 className="pr-4 pt-4 text-white">
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalComplaints}
                      </h3>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead2"
                      style={{ background: "#8EC131" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link collapsed"
                        data-toggle="collapse"
                        data-target="#faq2"
                        aria-expanded="true"
                        aria-controls="faq2"
                      >
                        Month :{" "}
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalPolicy}
                      </a>
                    </div>

                    <div
                      id="faq2"
                      className="collapse"
                      aria-labelledby="faqhead2"
                      data-parent="#faq"
                    >
                      <div className="card-body form-custom pb-0">
                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <small className="w-100 d-block mb-2">
                              Resolved Complaints{" "}
                              <span className="green-text float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data
                                    .totalResolvedComplaints}
                              </span>
                            </small>
                            <small className="w-100 d-block">
                              Open Complaints{" "}
                              <span className="text-black float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data.totalOpenComplaints}
                              </span>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#3D3D3D" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4 text-white">
                        Premium
                        <br/>
                        Received{" "}
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h3 className="pr-4 pt-4 text-white">
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalComplaints}
                      </h3>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead3"
                      style={{ background: "#3D3D3D" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link collapsed"
                        data-toggle="collapse"
                        data-target="#faq3"
                        aria-expanded="true"
                        aria-controls="faq3"
                      >
                        Month :{" "}
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalPolicy}
                      </a>
                    </div>

                    <div
                      id="faq3"
                      className="collapse"
                      aria-labelledby="faqhead3"
                      data-parent="#faq"
                    >
                      <div className="card-body form-custom pb-0">
                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <small className="w-100 d-block mb-2">
                              Invoices{" "}
                              <span className="green-text float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data
                                    .totalResolvedComplaints}
                              </span>
                            </small>
                            <small className="w-100 d-block">
                              Generated{" "}
                              <span className="text-black float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data.invoices}
                              </span>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-6 mb-4">
            <h3 className="mt-4 mb-4">Total Policy Sales 2021</h3>
            <LineGraph />
          </div>
          <div className="col-12 col-lg-6 mb-4">
            <h3 className="mt-4 mb-4">Total Claim Settled</h3>
            <LineGraph />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <h3 className="mt-4 mb-4">Best Selling policy - Month Jan 2021</h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="white-bg">
                  <tr>
                    <th key={1}>Policy Name</th>
                    <th key={2}>Policy code</th>
                    <th key={3}>Policy Type</th>
                    <th key={4}>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {dashBoardListArray &&
                    dashBoardListArray.bestPolicy.map((item) => (
                      <tr className="grey-box">
                        <td className="green-text">{item.policyName}</td>
                        <td>{item.policyCode}</td>
                        <td>{item.policyType}</td>
                        <td className="green-text">{item.totalSales}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Nossa 2020</div>
            <div>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default AdDashboard;
