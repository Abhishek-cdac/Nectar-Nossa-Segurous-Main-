import React, { useState, useEffect } from "react";
import { Select, Menu, Dropdown,Breadcrumb } from "antd";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Form, Button, Modal, Table} from "react-bootstrap";
import { FormOutlined } from "@ant-design/icons";
import {
  getChangePassword,
  getNotificationService,
  getAddNotificationService,
  getEditNotificationList,
  getDeleteNotificationList,
} from "../../services/authentication";
import setSucess from "../../user/settings/setSucess";
import moment from "moment";

export default function AdSetting() {
  const [NotificationListArray, setNotificationListArray] = useState("");
  const[ShowEditModal,setShowEditModal]=useState('')
  const[ShowAddModal,setShowAddModal]=useState('');
  const[errorMsg,seterrorMsg]=useState('');
  const [data, setData] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
    id: "",
    Name: "",
    emailBody: "",
    textBody: "",
    status: "",
    Type: "",
    email: "",
  });
  const [sucessPage, setsucessPage] = useState("");
  const [settingsPage, setSettingsPage] = useState(true);
  const Token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  const { Option } = Select;
  console.log("Token in list", Token);

  const {
    
    confirmPassword,
    oldPassword,
    newPassword,
    id,
    Name,
    status,
    emailBody,
    Type,
    textBody,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const reset = async () => {
    console.warn();
    const payload = {
      email: email,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      newPassword: newPassword,
      token: Token,
    };
    if (confirmPassword !== newPassword) {
      seterrorMsg("Password doesn't match");
    } else {
      try {
        const response = await getChangePassword(payload);
        console.log(response);
        seterrorMsg("");
      } catch (error) {
        /**
         * Error logic here
         * we need to do based on the error
         */
        alert(JSON.stringify(error.message));
      }
    }
  };

  //    useEffect(() => {
  //     reset()
  //    }, []);

  const handleback = () => {
    setsucessPage(false);
    setSettingsPage(true);
  };

  const handleDropdownChange = (value) => {
    setData({ status: value });
  };

  //NOtification API
  const handleNotificationList = async () => {
    try {
      const resp = await getNotificationService();
      setNotificationListArray(resp && resp.data);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleNotificationList();
  }, []);

  //Edit API
  const handleShowModal = (item) => {
    console.log("item", item);
    const Date = moment(item.date).format("YYYY-MM-DD");
    const update = moment(item.updatedAt).format("YYYY-MM-DD");
    setData({
      id: item.id,
      Name: item.name,
      status: item.status,
      createdAt: Date,
      updatedAt: update,
    });
    setShowEditModal(true);
  };

  const handleCancel = () => {
    setShowAddModal(false);
  };

  const handleClose = () =>{
    setShowEditModal(false)
  }

  const handleEditNotification = async (item) => {
    const payload = {
      //chcek
      id: id,
      name: Name,
      emailBody: emailBody,
      textBody: textBody,
      isActive: status,
    };
    try {
      const resp = await getEditNotificationList(payload);
      console.log("success", resp);
      // resp && handleHolidaysList()
      // handelEditCancel()
      setShowEditModal(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  //Delete Iinfo

  const handleDeleteNoti = async (item) => {
    const payload = {
      id: item.id,
    };
    try {
      const resp = await getDeleteNotificationList(payload);
      console.log("success", resp);
      // resp && handleHolidaysList()
      // handelEditCancel()
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddNotification = async () => {
    const Payload = {
      // user_id:loginDetailsUserId,
      name: Name,
      emailBody: emailBody,
      textBody: textBody,
    };

    if (emailBody === "" || textBody === "" || Name === "") {
      seterrorMsg("Please Fill all fileds.");
    } else {
      try {
        const resp = await getAddNotificationService(Payload);
        console.log("record added successfuly");
        seterrorMsg("");
        setShowAddModal(false);
        // handleDoctorsList()
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    }
  };

  const menu = (item) => {
    return (
      <Menu>
        {/* <Menu.Item key="1">Assign to</Menu.Item> */}
        <Menu.Item
          key="2"
          onClick={() => {
            handleShowModal(item);
          }}
        >
          Edit Info
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            handleDeleteNoti(item);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
     <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Settings</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
          </Breadcrumb>
      {settingsPage && (
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12 col-lg-8 col-md-4 col-sm-2 col-xs-1">
                <div classpolicy="comppage">
                  <Breadcrumb style={{ marginTop: "20px" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Setting</Breadcrumb.Item>
                  </Breadcrumb>
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
                      <h3>Profile Setting</h3>
                    </div>
                  </div>

                  <Tabs>
                    <TabList style={{ justifyContent: "space-between" }}>
                      <Tab>Change Password</Tab>
                      <Tab>Manage Notification</Tab>
                    </TabList>

                    <TabPanel style={{marginLeft:"-30px"}} >
                      <div
                        style={{
                         
                          width: "330px",
                          marginTop: "40px",
                          marginLeft: "20px",
                        }}
                      >
                        <Form.Group className="mb-2 p-2" controlId="formBasicEmail">
                          <Form.Label>Old Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="oldPassword"
                            value={oldPassword}
                            placeholder="Enter old Password"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 p-2"
                          controlId="formBasicPassword"
                        >
                          <Form.Label> New Password</Form.Label>
                          <Form.Control
                            type="password"
                            value={newPassword}
                            name="newPassword"
                            placeholder=" Enter new Password"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group
                          className="mb-3 p-2"
                          controlId="formBasicPassword"
                        >
                          <Form.Label> Confirm New Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder=" Confirm new Password"
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <div
                          className="bttn"
                          style={{ marginTop: "50px", borderRadius: "10px" }}
                        >
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                              reset();
                            }}
                          >
                            Update Password
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-lg mx-4"
                          >
                            Cancel
                          </button>
                          <label
                            style={{ color: "red", justifyContent: "center" }}
                          >
                            {errorMsg}
                          </label>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="row">
                      <div style={{ display: "flex", flexDirection: "row",justifyContent:"end"}}>
                      <button
                        type="button"
                        className="btn btn-success btn-sm my-1"
                        style={{
                          width: "130px",
                        }}
                        onClick={() =>{setShowAddModal(true)}}
                      >
                        <i className="fas fa-plus-circle"></i> Add Notification List
                      </button>
                    </div>
                        <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4">
                          <Table responsive>
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>update</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {NotificationListArray &&
                                NotificationListArray.map((item) => (
                                  <tr>
                                    {console.log("NtA", NotificationListArray)}
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>

                                    <td>
                                      <Dropdown overlay={menu(item)}>
                                        <a className="ant-dropdown-link">
                                          <FormOutlined
                                            style={{ paddingLeft: "30px" }}
                                          />
                                        </a>
                                      </Dropdown>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Modal show={ShowEditModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#61B33B", marginLeft: "130px" }}>
                  Edit Notification List
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="id"
                      value={id}
                      name="id"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={Name}
                      name="Name"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>EmailBody</Form.Label>
                    <Form.Control
                      type="textarea"
                      value={emailBody}
                      name="emailBody"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>textBody</Form.Label>
                    <Form.Control
                      type="textarea"
                      value={textBody}
                      name="textBody"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>isActive</Form.Label>
                    {/* <Dropdown overlay={menu} placement="bottomLeft">
                      <Button>bottomLeft</Button>
                    </Dropdown> */}
                    <Select
                      defaultValue="true"
                      onChange={handleDropdownChange}
                      style={{ marginTop: "10px", width: 200 }}
                    >
                      <Option value="true">true</Option>
                      <Option value="false">false</Option>
                    </Select>
                    {/* <DropdownButton
                        id="dropdown-item-button"
                      title="Dropdown button"
                      value={status}
                      name="status"
                      onChange={handleChange}
                    >
                      <Dropdown.Item as="button">true</Dropdown.Item>
                      <Dropdown.Item as="button">false</Dropdown.Item>
                    </DropdownButton> */}
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleEditNotification}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div>
            <Modal show={ShowAddModal} onHide={handleCancel}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#61B33B", marginLeft: "130px" }}>
                  Add Notification List
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <Form.Group>
                    <Form.Label>Notification Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={Name}
                      name="Name"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>EmailBody</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={emailBody}
                      name="emailBody"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>textBody</Form.Label>
                    <Form.Control
                      as="textarea"
                      value={textBody}
                      name="textBody"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddNotification}
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
                <label style={{ color: "red", justifyContent: "center" }}>
                  {errorMsg}
                </label>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
      {sucessPage && ( <setSucess handleback={handleback} />)}
    </>
  );
}
