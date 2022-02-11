import React, { useState, useEffect } from "react";
import AdClinicData from "../../Admin/Reimbursment/AdClinicDetails";
import fileDownload1 from "../../assets/img/fileDownload1.png"
import {
  getReimbursmentList,
  getReimbursmentListSearch,
} from "../.././services/authentication"
import { CSVLink } from "react-csv";

const HrReimbursment = () => {
  const [ReimbursmentPage, setReimbursmentPage] = useState(true);
  const [ClinicDataPage, setClinicDataPage] = useState("");
  const [step, setStep] = useState(0);
  const [searchValue, setSearchValue] = useState("");
 const[selectedrecord,setSelectedrecord]=useState('')
  const [ClinicalData, setClinicalData] = useState("");
  const [PharmacyData, setPharmacyData] = useState("");
  const [ClinicTableData, setClinicTableData] = useState("");
  const [PharmacyTableData, setPharmacyTableData] = useState("");

  //Get Api Start

  const handleClinicTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "clinical",
      };
      const resp = await getReimbursmentList(data);
      setClinicalData(resp && resp.data);
      console.log("clinical", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            ClinicName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            HospitalType: data.hospitalType,
          };
          tableDataArr.push(value);
        });
      setClinicTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClinicTab();
  }, []);

  const handlePharmacyTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "pharmacy",
      };
      const resp = await getReimbursmentList(data);
      console.log("pharm", resp);
      setPharmacyData(resp && resp.data);
      console.log("pc", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            pharmacyName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            servicesOffered: data.serviceOffered,
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
    handlePharmacyTab();
  }, []);

  const handleChange = (item) => {
    setReimbursmentPage(false);
    setClinicDataPage(true);
    setSelectedrecord(item)
  };
  const handleBack = () => {
    setReimbursmentPage(true);
    setClinicDataPage(false);
  };

  //search
  const handleOnSearch = async () => {
    // console.log("ClinicalDta",ClinicalData)

    if (step === 0) {
      try {
        let tableDataArr = [];
        const data = {
          type: "clinical",
          hospitaltype: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        console.log("clinical", resp);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: data.i,
              RefNo: data.referenceNumber,
              ClinicName: data.name,
              Adress: data.address,
              Area: data.area,
              Contact: data.contact,
              HospitalType: data.hospitalType,
            };
            tableDataArr.push(value);
          });
        setClinicTableData(tableDataArr);
        setClinicalData(tableDataArr)
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    } else {
      try {
        let tableDataArr = [];
        const data = {
          type: "pharmacy",
          hospitaltype: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        console.log("pharm", resp);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: i,
              RefNo: data.referenceNumber,
              pharmacyName: data.name,
              Adress: data.address,
              Area: data.area,
              Contact: data.contact,
              servicesOffered: data.serviceOffered,
            };
            tableDataArr.push(value);
          });
        setPharmacyTableData(tableDataArr);
        setPharmacyData(tableDataArr)
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    }
  };


  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("tr", tableDataArr);
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      if (step === 0) {
        
        filterData.map((data, i) => {
          const value = {
            SrNo: i,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            hospitalType: data.hospitalType,
          };
          tableDataArr.push(value);
          console.log("tableDataArr", tableDataArr);
        });
      } else {
        filterData.map((data, i) => {
          const value = {
            SrNo: data,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            serviceOffered: data.serviceOffered,
          };
          tableDataArr.push(value);
          console.log("tableDataArr", tableDataArr);
        });
      }
    }

    return tableDataArr;
  };

  const handleclick = (type) => {

    if (step === 0) {
      const ClinicalfilterData =
        ClinicalData &&
        ClinicalData.filter((data) => data.hospitalType === type);
      const Clinic = handleFilterData(ClinicalfilterData);
      console.log("ClinicalfilterData",ClinicalfilterData, Clinic);
      setClinicTableData(Clinic);
      setClinicalData(Clinic)
    } else {
      const PharmacyfilterData =
        PharmacyData &&
        PharmacyData.filter((data) => data.hospitalType === type);
      const Pharmacy = handleFilterData(PharmacyfilterData);
      console.log("PharmacyfilterData", Pharmacy);
      setPharmacyTableData(Pharmacy);
      setPharmacyData(Pharmacy)
    }
  };

  const ReimbursmentCSVData = () => {
    let ClinicalData = [];
    const ClinicaltableDataArray = ClinicTableData && ClinicTableData;
    const PharmacyTableDataArray = PharmacyTableData && PharmacyTableData;
    if (step === 0) {
      if (ClinicaltableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref No,Clinic,Adress,Area,Contact,Hospital Type\n"
        );
        ClinicaltableDataArray.map((excelData, i) => {
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.ClinicName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.hospitalType}\n`
          );
        });
      }
    } else {
      if (PharmacyTableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref_N0,Pharmacy,Adress,Area,Contact,Service_offered\n"
        );
        PharmacyTableDataArray.map((excelData, i) => {
          console.log("xl", excelData);
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.pharmacyName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.servicesOffered}\n`
          );
        });
      }
    }
    return ClinicalData.join("");
  };
  const ReimbursmentCSV = ReimbursmentCSVData();
  // // CSV END


  return (
    <>
      {ReimbursmentPage && (
        <div className="container-fluid">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-lg-12 text-left">
              <h3 className="mt-0 mb-4 my-3">Reimbursement</h3>
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
              <div className="search-btn">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control my-3"
                    placeholder="Search Hospital"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary my-3"
                      type="button"
                      onClick={() => handleOnSearch()}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div class="btn-group hover_drop_down">
                  <button
                    type="button"
                    class="btn btn-success btn-md my-3 mx-2"
                    data-toggle="dropdown"
                    style={{ width: "160px", borderRadius:"5px", backgroundColor: "#8EC131", border: "1px solid #8EC131" }}
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
                </div>
                <div className="btn-group">
                <button type="button" class="btn btn-primary btn-md my-3 mx-2">
                    <CSVLink data={ReimbursmentCSV} target="_blank" style={{color:"white"}}>
                      Download PDF/CSV
                    </CSVLink>
                  </button>
                </div>
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
                  {ClinicalData &&
                    ClinicalData.map((item) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",item)} */}
                          <td>{item.SrNo}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a onClick={() => handleChange(item)}>
                              {item.name}
                            </a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.hospitalType}</td>
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

                  {PharmacyData &&
                    PharmacyData.map((item) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",item)} */}
                          <td>{item.SrNo}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a>{item.name}</a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.serviceOffered}</td>
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
      {ClinicDataPage && <AdClinicData  selectedrecord={selectedrecord}
          data={ClinicalData}
          handleBack={handleBack} />}
    </>
  );
};
export default HrReimbursment;
