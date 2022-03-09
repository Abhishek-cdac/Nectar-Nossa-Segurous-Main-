import React, { useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import { getHolidaysList } from "../services/authentication"
import { CSVLink } from "react-csv";
import {Breadcrumb} from "antd"
import ReactPaginate from "react-paginate";

function UserHolidays() {
  const [HolidaysData, setHolidaysData] = useState("");
  const [HolidayListArray, setHolidayListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const [Data, setData] = useState({
    id: "",
    Name: "",
    Day: "",
    date: "",
    Type: "",
  });

  const { Name, Day, date, Type, id } = Data;

  const HandleClick = () => {};

  //List API

  const handleHolidaysList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getHolidaysList();
      setHolidayListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id: data.id,
            Name: data.name,
            Date: data.date,
            Day: data.day,
            Type: data.type,
          };
          tableDataArr.push(value);
          setHolidaysData(value);
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleHolidaysList();
  }, []);

  //Ended

  //CSV Download

  const HolidayCSVdata = () => {
    let HolidayData = [];
    console.log("hla", HolidayListArray);
    const HolidayListArrayData = HolidayListArray && HolidayListArray;
    if (HolidayListArrayData) {
      HolidayData.push("Id,Name,Date,Day,Type\n");
      HolidayListArrayData.map((excelData) => {
        console.log("excel", excelData);
        HolidayData.push(
          `${excelData.id},${excelData.name}, ${excelData.date}, ${excelData.day},${excelData.type}\n`
        );
      });
    }

    return HolidayData.join("");
  };
  const HolidayCSV = HolidayCSVdata();

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(TableData.length / usersPerPage);
  // const pageCount2 = Math.ceil(ClinicalData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //Filter
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          id: data.id,
          Name: data.name,
          Day: data.day,
          Date: data.date,
          Type: data.type,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleclick = (Type) => {
    const HolidayfilterData =
      HolidayListArray && HolidayListArray.filter((data) => data.type === Type);
    const filterData = handleFilterData(HolidayfilterData);
    setTableData(filterData);
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Holidays</Breadcrumb.Item>
          </Breadcrumb>
      <div className="container-fluid" style={{paddingTop:"10px"}}>
        <div className="row">
          <div className="col-xl-7  col-lg-4 col-md-4 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              Holiday List 2022
            </h4>
          </div>
          <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
            <div className="header">
              <div className="btn-group hover_drop_down">
                <button
                  type="button"
                  className="btn btn-success btn-sm my-3"
                  data-toggle="dropdown"
                  style={{ width: "130px" }}
                >
                  <i className="fas fa-filter"></i> Add Filters
                </button>
                <ul className="dropdown-menu" role="menu">
                  <li>
                    <a
                      onClick={() => {
                        handleclick("Public Holiday");
                      }}
                    >
                      Public Holiday{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleclick("National Holiday");
                      }}
                    >
                      National Holiday
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleclick("seasonal Holiday");
                      }}
                    >
                      seasonal Holiday
                    </a>
                  </li>
                </ul>
                <button type="button" className="btn btn-primary btn-sm my-3">
                  <CSVLink data={HolidayCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4">
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {TableData &&
                  TableData.slice(pagesVisited, pagesVisited + usersPerPage).map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Date}</td>
                      <td>{item.Day}</td>
                      <td>{item.Type}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
            Shown Total Results {TableData.length}
          </div>
          <div className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding:"20px"}}>
            <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHolidays;
