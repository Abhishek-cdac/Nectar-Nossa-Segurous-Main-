import React, { useState, useEffect } from "react";
import { Button, Table, Modal } from "antd";
import { CSVLink } from "react-csv";
import DeleteSucess from "./DeleteSucess";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getComplaintList,
  editComplaintList,
  deleteComplaintList,
  addComplaintList,
} from "../../services/authentication";
import ComplaintDetails from "./ComplaintDetails";
import NewComplaint from "./NewComplaint";
import { ContactsOutlined } from "@material-ui/icons";

const Complaint = () => {
  const [complaintsListArray, setComplaintsListArray] = useState("");
  const [complaintsData, setComplaintsData] = useState("");
  const [IsEditModalVisible, setIsEditModalVisible] = useState("");
  const [complaintApiUpdateStatus, setcomplaintApiUpdateStatus] = useState("");
  const [id, setID] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [complaintDate, setComplaintDate] = useState("");
  const [status, setStatus] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [complaintTablepage, setComplaintTablepage] = useState(true);
  const [complaintsDetailspage, setComplaintsDetailspage] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [subject, setsubject] = useState("");
  const [newComplaintspage, setNewComplaintspage] = useState("");
  const [DelSucessModal, setDelSucessModal] = useState("");

  const handleEditShowModal = (text, record) => {
    console.log("recooo", record, text);
    console.log("array", complaintsListArray);
    const value = complaintsListArray.find(
      (data) => data.complaintCode === record.id
    );
    const date = moment(value.complaintDate).format("YYYY-MM-DD");
    if (value) {
      setID(value.id);
      setComplaintDate(date);
      setComplaintDescription(value.description);
      setsubject(value.subject);
    }
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  //edit Api

  const handleEditComplaintListAPI = async () => {
    const payload = {
      id: id,
      subject: subject,
      description: complaintDescription,
      complaintDate: complaintDate,
    };
    try {
      const resp = await editComplaintList(payload);
      console.log("success", resp);
      resp && handleGetComplaintsListServiceCall();
      setcomplaintApiUpdateStatus(true);
      handelEditCancel();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleGetComplaintsListServiceCall = async () => {
    try {
      let complaintsDataArr = [];
      const resp = await getComplaintList();
      console.log("gvgjv", resp);
      setComplaintsListArray(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            user_id: data.id,
            id: data.complaintCode,
            PolicyName: data.userPolicy.policy.policyName,
            date: data.complaintDate,
            status: data.verifyStatus,
            description: data.description,
            subject: data.subject,
          };
          console.log(value);
          complaintsDataArr.push(value);
        });
      setComplaintsData(complaintsDataArr);
      console.log("Arr", complaintsDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleGetComplaintsListServiceCall();
  }, [complaintApiUpdateStatus]);

  //delete Api
  const handleDeleteComplaint = async (text, record) => {
    const value = complaintsListArray.find(
      (data) => data.complaintCode === record.id
    );
    console.log("valuuuue", value);
    const payload = {
      id: value.id,
    };
    try {
      const resp = await deleteComplaintList(payload);
      console.log("success");
      handleGetComplaintsListServiceCall();
      setcomplaintApiUpdateStatus(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleComplaintIdClick = (text, record) => {
    setSelectedRecord(record);
    setComplaintTablepage(false);
    setComplaintsDetailspage(true);
  };

  const handleNewComplaintClick = () => {
    setComplaintTablepage(false);
    setNewComplaintspage(true);
  };

  const handleBack = () => {
    setComplaintTablepage(true);
    setComplaintsDetailspage(false);
  };

  const handlereturn = () => {
    setComplaintTablepage(true);
    setNewComplaintspage(false);
  };

  const handleModalreturn = () => {
    setComplaintTablepage(true);
    setDelSucessModal(false);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "user_id",
      key: "user_id",
      ellipsis: true,
    },

    {
      title: "Complaint Id",
      dataIndex: "id",
      key: "id",
      ellipsis: true,
      render: (text, record) => (
        <div>
          {record.status === "Approved" ? (
            <a
              style={{ color: "#61b33b" }}
              onClick={() => handleComplaintIdClick(text, record)}
            >
              {text}
            </a>
          ) : (
            <label> {text}</label>
          )}
        </div>
      ),
    },
    {
      title: "Policy Name",
      dataIndex: "PolicyName",
      key: "name",
      ellipsis: true,
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      ellipsis: true,
    },

    {
      title: "Options",
      key: "option",
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            {record.status === "Approved" ? (
              <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
            ) : (
              <div>
                <EyeOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                />
                <EditOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                  onClick={() => handleEditShowModal(text, record)}
                />
                <DeleteOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                  onClick={() => handleDeleteComplaint(text, record)}
                />
              </div>
            )}
          </>
        );
      },
    },
  ];
  //csv download Link
  const ComplaintCsvData = () => {
    let ComplaintsData = [];
    const complaintsListArrayData = complaintsListArray && complaintsListArray;
    if (complaintsListArrayData) {
      ComplaintsData.push(
        "Complaint ID,Policy Name,Description,Complaint Date,Status\n"
      );
      complaintsListArrayData.map((excelData) => {
        //console.log("ugugvcgvc",excelData)
        ComplaintsData.push(
          `${excelData.complaintCode}, ${excelData.userPolicy.policy.policyName}, ${excelData.userPolicy.policy.description},${excelData.complaintDate},${excelData.verifyStatus}\n`
        );
      });
    }
    return ComplaintsData.join("");
  };
  const ComplaintCsv = ComplaintCsvData();

  return (
    <>
      {complaintTablepage && (
        <div>
          <div className="container">
            <div className="ant-row">
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <div>
                  <h3>My Complaints</h3>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Button
                    style={{
                      borderRadius: "5px",
                      marginRight: "10px",
                      backgroundColor: "#61b33b",
                      color: "white",
                    }}
                    onClick={() => handleNewComplaintClick()}
                  >
                    New Complaint
                  </Button>

                  <div>
                    <Button
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#000089",
                      }}
                    >
                      {/* Download PDF/CSV */}
                      <CSVLink data={ComplaintCsv} target="_blank">
                        Download PDF/CSV
                      </CSVLink>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="ant-row">
              <div className="ant-col ant-col-xs-24">
                <Table
                  columns={columns}
                  dataSource={complaintsData}
                  //onChange={this.handleChange}
                  pagination={true}
                  total={10}
                />
              </div>
            </div>

            <div>
              <Modal
                title="Edit Complaint"
                visible={IsEditModalVisible}
                onOk={handleEditComplaintListAPI}
                onCancel={handelEditCancel}
              >
                <input
                  style={{
                    height: "30px",
                    width: "300px",
                    marginTop: "10px",
                    marginLeft: "80px",
                  }}
                  type="Id"
                  placeholder="Id"
                  value={id}
                  onChange={(e) => setID(e.target.value)}
                />
                <br />

                <input
                  style={{
                    height: "30px",
                    width: "300px",
                    marginTop: "10px",
                    marginLeft: "80px",
                  }}
                  type="subject"
                  placeholder="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                />
                <br />
                <input
                  style={{
                    height: "30px",
                    width: "300px",
                    marginTop: "10px",
                    marginLeft: "80px",
                  }}
                  type="Date"
                  placeholder="Complaint Date"
                  value={complaintDate}
                  onChange={(e) => setComplaintDate(e.target.value)}
                />
                <br />

                <textarea
                  style={{
                    width: "300px",
                    marginTop: "10px",
                    marginLeft: "80px",
                  }}
                  type="Textarea"
                  placeholder="complaint Description"
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                />
              </Modal>
            </div>
          </div>
        </div>
      )}

      {complaintsDetailspage && (
        <ComplaintDetails
          selectedRecord={selectedRecord}
          data={complaintsListArray}
          handleBack={handleBack}
        />
      )}

      {newComplaintspage && <NewComplaint handlereturn={handlereturn} />}

      {DelSucessModal && <DeleteSucess handleModalreturn={handleModalreturn} />}
    </>
  );
};
export default Complaint;
