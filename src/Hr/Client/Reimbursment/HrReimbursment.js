import React, { useState } from "react";
import ClinicData from "../../../user/Reimbursment/ClinicData";
import fileDownload1 from "../../../assets/img/fileDownload1.png"

const HrReimbursment = () => {
  const [ReimbursmentPage, setReimbursmentPage] = useState(true);
  const [ClinicDataPage, setClinicDataPage] = useState("");
  const [step, setStep] = useState(0);

  const data = [
    {
      SrNo: "1",
      RefNo: "23",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "2",
      RefNo: "23",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "3",
      RefNo: "23",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "4",
      RefNo: "23",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "5",
      RefNo: "23",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
  ];

  const Pharmadata = [
    {
      SrNo: "1",
      RefNo: "2",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "2",
      RefNo: "2",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "3",
      RefNo: "2",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "4",
      RefNo: "2",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
    {
      SrNo: "5",
      RefNo: "2",
      ClinicName: "Apple",
      Adress: "tanuku",
      Area: "railwatstation",
      Contact: "9912399213",
      HospitalType: "organs",
    },
  ];

  const handleChange = () => {
    setReimbursmentPage(false);
    setClinicDataPage(true);
  };

  return (
    <>
      {ReimbursmentPage && (
        <div>
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-lg-12 text-left">
              <h3 className="mt-0 mb-4">Reimbursement</h3>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-between border-bottom pb-2">
            <div className="col-12 col-lg-6 col-md-6 text-left">
              <ul className="nav nav-tabs table-nav" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${!step ? "active" : ""}`}
                    id="clinic-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(0);
                    }}
                    role="tab"
                    aria-controls="clinic-list"
                    aria-selected="true"
                  >
                    Clinic List
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${step ? "active" : ""}`}
                    // className="nav-link"
                    id="pharmacies-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(1);
                    }}
                    role="tab"
                    aria-controls="pharmacies-list"
                    aria-selected="false"
                  >
                    Pharmacies List
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6 col-md-6 text-right">
              <div className="search-btn">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Hospital"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="btn-two">
                  <a href="#" className="print-card-btn">
                    Add Filters <i className="fas fa-filter"></i>
                  </a>
                  <a href="#" className="download-card-btn">
                    Download PDF/CSV{" "}
                    <img
                      src={fileDownload1}
                      className="img-fluid"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content table-custome mt-3" id="myTabContent">
            <div
              //   className="tab-pane fade show active"
              className={`tab-pane fade show ${!step ? "active" : ""}`}
              id="clinic-list"
              role="tabpanel"
              aria-labelledby="clinic-list-tab"
            >
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Clinic Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Hospital Type</th>
                    </tr>
                  </thead>
                  {data.map((item) => (
                    <tbody>
                      <tr>
                        <td>{item.SrNo}</td>
                        <td>{item.RefNo}</td>
                        <td>
                          <a onClick={handleChange}>{item.ClinicName}</a>
                        </td>
                        <td>{item.Adress}</td>
                        <td>{item.Area}</td>
                        <td>{item.Contact}</td>
                        <td>{item.HospitalType}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 col-12">
                  <small>Showing 20 results</small>
                </div>
                <div className="col-md-6 col-sm-6 col-12">
                  <div className="pagination-custom">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                          <a className="page-link w-100">Previous</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link active" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link w-100" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div
              //   className="tab-pane fade"
              className={`tab-pane fade show ${step ? "active" : ""}`}
              id="pharmacies-list"
              role="tabpanel"
              aria-labelledby="pharmacies-list-tab"
            >
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Pharmacy Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Service's Offered</th>
                    </tr>
                  </thead>

                  {Pharmadata.map((item) => (
                    <tbody>
                      <tr>
                        <td>{item.SrNo}</td>
                        <td>{item.RefNo}</td>
                        <td>
                          <a onClick={handleChange}>{item.ClinicName}</a>
                        </td>
                        <td>{item.Adress}</td>
                        <td>{item.Area}</td>
                        <td>{item.Contact}</td>
                        <td>{item.HospitalType}</td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 col-12">
                  <small>Showing 20 results</small>
                </div>
                <div className="col-md-6 col-sm-6 col-12">
                  <div className="pagination-custom">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-end">
                        <li className="page-item disabled">
                          <a className="page-link w-100">Previous</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link active" href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link w-100" href="#">
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {ClinicDataPage && <ClinicData />}
    </>
  );
};
export default HrReimbursment;
