import React, { useEffect, useState } from "react";
import {Table} from "react-bootstrap";
import { getHolidaysList } from "../services/authentication"
import { CSVLink } from "react-csv";

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
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-7  col-lg-4 col-md-4 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              Holiday List 2022
            </h4>
          </div>
          <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
            <div className="header">
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
                <button type="button" class="btn btn-primary btn-sm my-3">
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
                  TableData.map((item) => (
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
          <div className="col-xl-9  col-lg-6 col-md-4 col-sm-2">
          Shown Results{HolidayListArray.length}
          </div>
          <div className="col-xl-3  col-lg-3 col-md-2 col-sm-1">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#">
                    Prev
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    1
                  </a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHolidays;
