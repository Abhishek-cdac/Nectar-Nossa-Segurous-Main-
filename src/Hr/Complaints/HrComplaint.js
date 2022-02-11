import React, { useState, useEffect } from "react";
import { Table, Button, Input, Menu, Dropdown } from "antd";
import {
  FilterOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { getComplaintList } from "../../services/authentication";
import HrComplaintDetails from "./HrComplaintDetails";

const { Search } = Input;

const data = [];
const AdminComplaint = () => {
  const [complaintListArray, setComplaintListArray] = useState("");
  const [tableData, setTableData] = useState("");
  const [hrComplaintsTablepage, setHrComplaintsTablepage] = useState(true);
  const [hrcomplaintsDetailspage, setHrcomplaintsDetailspage] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");

  const handleComplaintIdClick = (text, record) => {
    setSelectedRecord(record);
    setHrComplaintsTablepage(false);
    setHrcomplaintsDetailspage(true);
  };

  const handleBack = () => {
    setHrComplaintsTablepage(true);
    setHrcomplaintsDetailspage(false);
  };

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Approved")}
        >
          Approved
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Resolved")}
        >
          Resolved
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Reject")}
        >
          Reject
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Received for approval")}
        >
          Received for Approval
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Pending")}
        >
          Pending
        </a>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer">
          Approve
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer">
          Resolve
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener norefer">
          Reject
        </a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: "Complaint ID",
      dataIndex: "Id",
      key: "Id",
      ellipsis: true,

      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleComplaintIdClick(text, record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Policy Holder",
      dataIndex: "policyHolder",
      key: "policyHolder",
      ellipsis: true,
    },

    {
      title: "Policy ",
      dataIndex: "policyName",
      key: "policyName",
      ellipsis: true,
    },
    {
      title: "Complaint Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "action",
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
            <EllipsisOutlined style={{ paddingLeft: "30px" }} overlay={menu} />
          </>
        );
      },
    },
  ];

  const handleGetComplaintsListServiceCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getComplaintList(data);
      setComplaintListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            Id: data.complaintCode,
            policyHolder: data.userPolicy.user.firstName,
            policyName: data.userPolicy.policy.policyName,
            date: data.complaintDate,
            status: data.verifyStatus,
            description: data.description,
          };
          console.log(value);
          tableDataArr.push(value);
        });
      console.log("tableDataArr in comaplaints", tableDataArr);
      setTableData(tableDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleGetComplaintsListServiceCall(data);
  }, []);

  //Filter
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          Id: data.complaintCode,
          policyHolder: data.userPolicy.user.firstName,
          PolicyName: data.userPolicy.policy.PolicyName,
          date: data.complaintDate,
          status: data.verifyStatus,
          agent: data.userPolicy.agent.firstName,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (type) => {
    const ComplaintfilterData = complaintListArray.filter(
      (data) => data.verifyStatus === type
    );
    const filterData = handleFilterData(ComplaintfilterData);
    setTableData(filterData);
  };
  const onSearch = (value) => {
    const ComplaintfilterData = complaintListArray.filter((data) => {
      const itemData = data.verifyStatus.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(ComplaintfilterData);
    setTableData(searchFilter);
  };

  const complaintCSVData = () => {
    let ComplaintListData = [];
    const complainttableDataArray = complaintListArray && complaintListArray;
    if (complainttableDataArray) {
      ComplaintListData.push(
        "Complaint Id,Policy Holder,Policy,Complaint Date,Status,description\n"
      );
      complainttableDataArray.map((excelData) => {
        ComplaintListData.push(
          `${excelData.complaintCode}, ${excelData.userPolicy.user.firstName}, ${excelData.userPolicy.policy.policyName},${excelData.complaintDate},${excelData.verifyStatus},${excelData.description}\n`
        );
      });
    }
    return ComplaintListData.join("");
  };
  const complaintCSV = complaintCSVData();

  return (
    <>
      {hrComplaintsTablepage && (
        <div className="container-fluid">
          <div
            className="row"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div className="col-12 col-sm-4 col-md-4">
              <h3>Complaint Management</h3>
            </div>
            <div className="nav justify-content-center">
              <div
                className="col-12 col-sm-5 col-md-5"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Search
                  placeholder="search Policy"
                  onSearch={onSearch}
                  style={{
                    borderRadius: "25px",
                  }}
                />
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Dropdown placement="bottomCenter" overlay={content} arrow>
                  <Button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#61b33b",
                      color: "white",
                    }}
                  >
                    <FilterOutlined /> Add Filters
                  </Button>
                </Dropdown>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#000089",
                    borderRadius: "5px",
                  }}
                >
                  <CSVLink data={complaintCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
            </div>
            <Table style={{marginTop:"10px"}}
            columns={columns}
            dataSource={tableData}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
          />
          </div>
          
        </div>
      )}

      {hrcomplaintsDetailspage && (
        <HrComplaintDetails
          selectedRecord={selectedRecord}
          data={complaintListArray}
          handleBack={handleBack}
        />
      )}
    </>
  );
};
export default AdminComplaint;
