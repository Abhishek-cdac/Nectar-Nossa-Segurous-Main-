import React, { useState, useEffect } from "react";
import ClinicData from "./ClinicData";
import { getReimbursmentList } from "../../services/authentication";
import { CSVLink } from "react-csv";

const Reimbusrment = () => {
  const [ReimbursmentPage, setReimbursmentPage] = useState(true);
  const [ClinicDataPage, setClinicDataPage] = useState("");
  const [step, setStep] = useState(0);
  const [ClinicalData, setClinicalData] = useState("");
  const [PharmacyData, setPharmacyData] = useState("");
  const [ClinicTableData, setClinicTableData] = useState("");
  const [PharmacyTableData, setPharmacyTableData] = useState("");

  const handleChange = () => {
    setReimbursmentPage(false);
    setClinicDataPage(true);
  };

  //Get Api Start

  const handleClinicTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "",
        search: "",
      };
      const resp = await getReimbursmentList(data);
      setClinicalData(resp && resp);
      resp &&
        resp.data.map((data) => {
          const value = {
            SrNo: data,
            RefNo: data,
            ClinicName: data,
            Adress: data,
            Area: data,
            Contact: data,
            HospitalType: data,
          };
          tableDataArr.push(value);
        });
      setClinicTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  const handlePharmacyTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "pharmacy",
        search: "HospitalType",
      };
      const resp = await getReimbursmentList(data);
      setPharmacyData(resp && resp);
      resp &&
        resp.data.map((data) => {
          const value = {
            SrNo: data,
            RefNo: data,
            ClinicName: data,
            Adress: data,
            Area: data,
            Contact: data,
            HospitalType: data,
          };
          tableDataArr.push(value);
        });
      setPharmacyTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClinicTab();
    handlePharmacyTab();
  }, []);

  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          SrNo: data,
          RefNo: data,
          ClinicName: data,
          Adress: data,
          Area: data,
          Contact: data,
          HospitalType: data,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleclick = (type) => {
    const ClinicalfilterData = ClinicalData.filter(
      (data) => data.HospitalType === type
    );
    const PharmacyfilterData = PharmacyData.filter(
      (data) => data.HospitalType === type
    );
    const Clinic = handleFilterData(ClinicalfilterData);
    const Pharmacy = handleFilterData(PharmacyfilterData);
    if (step === "0") {
      console.log("ClinicalfilterData", ClinicalfilterData);
      setClinicTableData(Clinic);
    } else {
      console.log("PharmacyfilterData", PharmacyfilterData);
      setPharmacyTableData(Pharmacy);
    }
  };

  const ReimbursmentCSVData = () => {
    let ClinicalData = [];
    const ClinicaltableDataArray = ClinicTableData && ClinicTableData;
    const PharmacyTableDataArray = PharmacyTableData && PharmacyTableData;
    if (ClinicaltableDataArray) {
      ClinicalData.push(
        "Sr.No,Ref No,Clinic,Adress,Area,Contact,Hospital Type\n"
      );
      ClinicaltableDataArray.map((excelData,i) => {
        ClinicalData.push(
          `${i},${excelData.Ref_No}, ${excelData.Clinic}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.hospitalType}\n`
        );
      });
    }
    if (PharmacyTableDataArray) {
      // ClinicalData.push(
      //   "Sr.No,Ref_N0,Clinic,Adress,Area,Contact,Service_offered\n"
      // );
      PharmacyTableDataArray.map((excelData) => {
        ClinicalData.push(
          `${excelData.Sr.No},${excelData.Ref_No}, ${excelData.Clinic}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.serviceOffered}\n`
        );
      });
    }
    return ClinicalData.join("");
  };
  const ReimbursmentCSV = ReimbursmentCSVData();
  // CSV END

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
                <div class="btn-group hover_drop_down">
                  <button
                    type="button"
                    class="btn btn-success btn-sm my-3"
                    data-toggle="dropdown"
                    style={{ width: "130px" }}
                  >
                    <i class="fas fa-filter"></i> Add Filters
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li>
                      <a
                        onClick={() => {
                          handleclick("provincial");
                        }}
                      >
                        provincial{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleclick("public");
                        }}
                      >
                        public
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleclick("municipal");
                        }}
                      >
                        Municipal
                      </a>
                    </li>
                  </ul>
                  <button type="button" class="btn btn-primary btn-sm my-3">
                    <CSVLink data={ReimbursmentCSV} target="_blank">
                      Download PDF/CSV
                    </CSVLink>
                  </button>
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
                  {ClinicTableData &&
                    ClinicTableData.map((item) => (
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
                  <small>Showing results{ClinicalData.length}</small>
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

                  {PharmacyTableData &&
                    PharmacyTableData.map((item) => (
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
                  <small>Showing Results{PharmacyData.length}</small>
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
export default Reimbusrment;
