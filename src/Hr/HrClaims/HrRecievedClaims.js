import React, { useState, useEffect } from "react";
import { Tabs, Button, Input, Breadcrumb, Dropdown, Menu, Table } from "antd";
import { CSVLink } from "react-csv";
import { FilterOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { getClaimsList } from "../../services/authentication";
import HrClaimDetails from "./HrClaimDetails";

const { Search } = Input;

const HrRecievedClaims = () => {
  const [allHrRecievedListArray, setAllHrRecievedListArray] = useState("");
  const [ClaimsData, setClaimsData] = useState("");
  const [claimAPIupdateStatus, setClaimAPIupdateStatus] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [HrClaimDetailsPage, setHrClaimDetailsPage] = useState("");
  const [HrClaimsTablePage, setHrClaimsTablePage] = useState(true);

  const handleClaimIdClick = (text, record) => {
    setHrClaimDetailsPage(true);
    setHrClaimsTablePage(false);
    setSelectedRecord(record);
  };
  const handleBack = () => {
    setHrClaimDetailsPage(false);
    setHrClaimsTablePage(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Re-assign</Menu.Item>
      <Menu.Item key="2">Accept</Menu.Item>
      <Menu.Item key="3">Reject</Menu.Item>
    </Menu>
  );

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Recieved for Approval")}
        >
          Recieved for Approval
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Accepted")}
        >
          Accepted
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Rejected")}
        >
          Rejected
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Not Submited")}
        >
          not Submited
        </a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
   
    {
      title: "Claim ID",
      dataIndex: "id",
      key: "id",
     
      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleClaimIdClick(text, record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Policy Holder",
      dataIndex: "name",
      key: "name",
    
    },

    {
      title: "Policy Name",
      dataIndex: "policyname",
      key: "name",
    
    },
    {
      title: "Policy code",
      dataIndex: "code",
      key: "code",
    
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
     
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
     
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
     
    },
    {
      title: "Actions",
      key: "action",
     
      render: (text, record) => {
        return (
          <>
            <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                <EllipsisOutlined style={{ paddingLeft: "30px" }} />
              </a>
            </Dropdown>
          </>
        );
      },
      responsive: ["sm", "xs", "md"],
    },
  ];
  //csv download Link
  const HrRecievedCSVData = () => {
    let HrRecievedClaimsData = [];
    const allHrRecievedListArrayData =
      allHrRecievedListArray && allHrRecievedListArray;
    if (allHrRecievedListArrayData) {
      HrRecievedClaimsData.push(
        "ID,Policy Holder,Policy Name,Policy Code, Request Date,Status,Description\n"
      );
      allHrRecievedListArrayData.map((excelData) => {
        //console.log("ugugvcgvc",excelData)
        HrRecievedClaimsData.push(
          `${excelData.id},${excelData.userPolicy.user.firstName}, ${excelData.userPolicy.policy.policyName}, ${excelData.userPolicy.policy.policyCode},${excelData.date},${excelData.verifyStatus},${excelData.userPolicy.policy.description}\n`
        );
      });
    }
    return HrRecievedClaimsData.join("");
  };
  const HrRecievedCSV = HrRecievedCSVData();

  //Claims table service call started here

  const handleGetClaimsListServiceCall = async () => {
    try {
      let claimsDataArr = [];
      const resp = await getClaimsList();
      //console.log("gvgjv",resp)
      setAllHrRecievedListArray(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            id: data.claim_details.claim_id,
            name: data.userPolicy.user.firstName,
            policyname: data.userPolicy.policy.policyName,
            code: data.userPolicy.policy.policyCode,
            date: data.claim_details.createdAt,
            status: data.verifyStatus,
            description: data.userPolicy.policy.description,
          };
          console.log(value);
          claimsDataArr.push(value);
        });

      setClaimsData(claimsDataArr);
      console.log("Arr", claimsDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleGetClaimsListServiceCall();
  }, [claimAPIupdateStatus]);

  //Filter & serach
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          id: data.claim_details.claim_id,
          name: data.userPolicy.user.firstName,
          policyname: data.userPolicy.policy.policyName,
          code: data.userPolicy.policy.policyCode,
          date: data.claim_details.createdAt,
          status: data.verifyStatus,
          description: data.userPolicy.policy.description,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (status) => {
    const claimsfilterData = allHrRecievedListArray.filter(
      (data) => data.verifyStatus === status
    );
    console.log("Array", allHrRecievedListArray);
    console.log("data", claimsfilterData);
    const filterData = handleFilterData(claimsfilterData);
    setClaimsData(filterData);
  };

  const onSearch = (value) => {
    const claimsfilterData = allHrRecievedListArray.filter((data) => {
      const itemData = data.verifyStatus.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(claimsfilterData);
    setClaimsData(searchFilter);
  };
  return (
    <>
      <div className="container-fluid">
        {HrClaimsTablePage && (
          <div>
            <div
              className="row"
              style={{
                marginTop: "20px",
                marginBottom: "25px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
               <div className="col-12 col-sm-3 col-md-3">
                <h3>Recieved Claims</h3>
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
                    width: 300,
                    borderRadius: "25px",
                    marginRight: "10px",
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
                      marginRight: "10px",
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
                    }}
                  >
                    {/* Download PDF/CSV */}
                    <CSVLink data={HrRecievedCSV} target="_blank">
                      Download PDF/CSV
                    </CSVLink>
                  </Button>
                </div>
              </div>
            </div>
            <div className="DataTable">
            <Table
              columns={columns}
              dataSource={ClaimsData}
              //onChange={this.handleChange}
              pagination={true}
              total={10}
            />
            </div>
            Shown Results{allHrRecievedListArray.length}
          </div>
        )}
      </div>
      {HrClaimDetailsPage && (
        <HrClaimDetails
          selectedRecord={selectedRecord}
          data={allHrRecievedListArray}
          handleBack={handleBack}
        />
      )}
    </>
  );
};
export default HrRecievedClaims;
