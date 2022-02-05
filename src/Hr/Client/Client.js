import React, { useState, useEffect } from "react";
import { getAllClientList } from "../../services/authentication";
import NewClient from "./NewClient";
import ClientDetails from "./ClientDetails";
import { CSVLink } from "react-csv";

const Client = () => {
  const [ClientListArray, setClientListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const [ClientPage, setClientPage] = useState(true);
  const [NewClientPage, setNewClientPage] = useState(false);
  const [ClientDetalsPage, setClientDetalsPage] = useState(false);
  const [SelectedRecord, setSelectedRecord] = useState("");
  const[policyTypeSearch,setpolicyTypeSearch]=useState('')
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lgu", loginDetailsUserId);

  const handleClientList = async () => {
    try {
      let tableDataArr = [];
      const data = {
        agent_id: loginDetailsUserId,
      };
      const resp = await getAllClientList(data);
      setClientListArray(resp && resp.data);
      console.log("cld", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            policyNo: data.policy.policyCode,
            policyHolder: data.user.firstName,
            Category: data.policy.policyType,
            policyType: data.policy.policyName,
            startDate: data.policyStartDate,
            endDate: data.policyMaturityDate,
            id:data.id,

          };
          tableDataArr.push(value);
          console.log("tdr", tableDataArr);
        });
        setTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClientList();
  }, []);

  const handleNewClientBack = () => {
    setNewClientPage(false);
    setClientPage(true);
   
  };
  const handleNewClient = () => {
    setNewClientPage(true);
    setClientPage(false);

  };

  const handleChange = (item) => {
    setClientDetalsPage(true);
    setClientPage(false);
    setSelectedRecord(item);
  };

  const handleBackPage = () =>{
    setClientDetalsPage(false);
    setClientPage(true);
  }
  //Filter
  //Filter
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          policyNo: data.policy.policyCode,
          policyHolder: data.user.firstName,
          Category: data.policy.policyType,
          policyType: data.policy.policyName,
          startDate: data.policyStartDate,
          endDate: data.policyMaturityDate,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (policyType) => {
    console.log("CLA",ClientListArray)
    const ClientfilterData = ClientListArray.filter(
      (data) => data.policy.policyType === policyType
    );
    const filterData = handleFilterData(ClientfilterData);
    setTableData(filterData);
  };
  const onSearch = () => { 
    const ClientfilterData = ClientListArray.filter((data) => {
      console.log("filter",ClientListArray)
      const itemData = data.policy.policyType.toUpperCase();
      const textData = policyTypeSearch && policyTypeSearch.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(ClientfilterData);
    setTableData(searchFilter);
  };

  const handlesearch = (e) =>{
    setpolicyTypeSearch(e.target.value)
  }

  //csv Link
  //CSV Download

  const ClientCSVdata = () => {
    let ClientData = [];
    console.log("hla", ClientListArray);
    const ClientListArrayData = ClientListArray && ClientListArray;
    if (ClientListArrayData) {
      ClientData.push(
        "Policy No,Policy Holder,Policy Type,Start Date,End Date\n"
      );
      ClientListArrayData.map((excelData) => {
        console.log("excel", excelData);
        ClientData.push(
          `${excelData.policy.policyCode},${excelData.user.firstName}, ${excelData.policy.policyName}, ${excelData.policyStartDate},${excelData.policyMaturityDate}\n`
        );
      });
    }

    return ClientData.join("");
  };
  const ClientCSV = ClientCSVdata();

  return (
    <>
      {ClientPage && (
        <div>
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 col-lg-3 col-md-3 text-left">
              <h3 className="mt-0 mb-4">Clients</h3>
            </div>
            <div className="col-12 col-lg-9 col-md-9 text-right">
              <div className="search-btn">
                <div className="input-group">
                  <input
                    value={policyTypeSearch}
                    onChange={handlesearch}
                    type="text"
                    className="form-control"
                    placeholder="Search Category"
                   
                  />
                  <div className="input-group-append">
                    <button className="btn btn-secondary" type="button" onClick={()=>onSearch()}>
                      
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="btn-two">
                  <div className="dropdown d-md-inline-block">
                    <a
                      onClick={() => handleNewClient()}
                      className="print-card-btn green-btn float-left"
                    >
                      <button className="fas fa-plus-circle"></button> Add New
                      Client
                    </a>
                    <div class="btn-group hover_drop_down">
                      <button
                        type="button"
                        class="btn btn-success btn-sm my-3"
                        data-toggle="dropdown"
                        style={{ width: "130px" }}
                      >
                        <i class="fas fa-filter"></i> Add Filters
                      </button>
                      <ul
                        class="dropdown-menu"
                        role="menu"
                        // onClick={HandleClick}
                      >
                        <li>
                          <a
                            onClick={() => {
                              handleClick("General");
                            }}
                          >
                            General{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              handleClick("Health");
                            }}
                          >
                           Health
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              handleClick("General && Health");
                            }}
                          >
                             General&&Health
                          </a>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              handleClick("vehicle");
                            }}
                          >
                            vehicle
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button type="button" class="btn btn-primary btn-sm my-3">
                      <CSVLink data={ClientCSV} target="_blank">
                        Download PDF/CSV
                      </CSVLink>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 table-custome mt-3">
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Policy No.</th>
                      <th>Policy Holder</th>
                      <th>Policy Type</th>
                      <th>Category</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                  {TableData &&
                    TableData.map((item) => (
                        <tr>
                          <td>
                            {" "}
                            {console.log('item in table data in client', item)}
                            <a onClick={() => handleChange(item)}>
                              {item.policyNo}
                            </a>
                          </td>
                          <td>{item.policyHolder}</td>
                          <td>{item.policyType}</td>
                          <td>{item.Category}</td>
                         {/* <td>{item.id}</td> */}
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                        </tr>
                     
                    ))}
                     </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 col-12">
                  <small>Showing Results{ClientListArray.length}</small>
                </div>
                {/* <div className="col-md-6 col-sm-6 col-12">
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
            </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {ClientDetalsPage && (
        <ClientDetails selectedRecord={SelectedRecord} data={ClientListArray} handleBackPage={handleBackPage}/>
      )}
      {NewClientPage && <NewClient handleNewClientBack={handleNewClientBack} />}
    </>
  );
};
export default Client;
