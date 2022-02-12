import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Form, Button } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {
  getChangePassword,
  getUserNotificationService,
  getNotificationService,
  getAddUserNotificationService,
} from "../../services/authentication";
import setSucess from "./setSucess";

export default function Setting() {
  const [data, setData] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
  });
  const [userNotification, setUserNotification] = useState("");
  const [notification, setnotification] = useState([]);
  const[errorMsg,seterrorMsg]=useState('')
  const [sucessPage, setsucessPage] = useState([]);
  const [settingsPage, setSettingsPage] = useState(true);
  const Token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  console.log("Token in list", Token);

  const { confirmPassword, oldPassword, newPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  //Chnage password

  const reset = async () => {
    console.warn();
    const payload = {
     email:email,
      oldPassword: oldPassword,
      confirmPassword:confirmPassword,
      password:newPassword,
      token: Token,
    };
    if (
        confirmPassword !== newPassword
       ) 
        {
      seterrorMsg("Password doesn't match");
       } 
     else {
    try {
      const response = await getChangePassword(payload);
      // console.log(response);
      seterrorMsg('')
      setsucessPage(true);
    } catch (error) {
      
      alert(JSON.stringify(error.message));
    }
  }
};


  //Notification API
  const handleNotification = async () => {
    try {
      const userNotificationResp = await getUserNotificationService(data);
      const notificationResp = await getNotificationService(data);
      // console.log('userNotificationResp',notificationResp , userNotificationResp);
      setUserNotification(userNotificationResp.data);
      setnotification(notificationResp.data);
    } catch (error) {
      alert("naga sai", JSON.stringify(error.message));
    }
  };
  useEffect(() => {
    handleNotification();
  }, []);

  const handleGetAddNotification = async (i, updatedData,type) => {
    let payload = {};
    userNotification &&
      userNotification.map((item, index) => {
        if (index === i) {
          console.log('handleGetAddNotification service', item)
          payload = {
            notification_id: item.notification_id,
            textStatus: item.textStatus,
            emailStatus: item.emailStatus,
            user_id: item.user_id,
          };
          
        }
        // else if(index === i && type == "text"){
        //   payload = {
        //     notification_id: item.notification_id,
        //     textStatus: item.textStatus,
        //     // emailStatus: item.emailStatus,
        //     user_id: item.user_id,
        //   };
        // }
      });
    console.log("payload", payload);
    try {
      const userAddNotiResp = await getAddUserNotificationService(payload);
      // console.log('userAddNotiResp',userAddNotiResp);
    } catch (error) {
      /**
       * Error logic here
       * we need to do based on the error
       */
      alert("naga sai", JSON.stringify(error.message));
    }
  };

  const handleback = () => {
    setsucessPage(false);
    setSettingsPage(true);
  };

  const handleUserNotification = (i, updateObj, email) => {
    const updatedData = userNotification.map((item, index) => {
      if (index == i) {
        console.log( 'handleUserNotification',item,updateObj)
        return { ...item, ...updateObj };
      } else {
        return item;
      }
    });
    console.log( 'handleUserNotification updatedData',updatedData)
    setUserNotification(updatedData);
    handleGetAddNotification(i, updatedData,email);
  };

  const handleTextNotification = (i, updateObj, mobile) => {
    const updatedData = userNotification.map((item, index) => {
      if (index == i) {
        return { ...item, ...updateObj };
      } else {
        return item;
      }
    });
    setUserNotification(updatedData);
    handleGetAddNotification(i,updatedData,mobile);
  };

  return (
    <>
      {settingsPage && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-8 col-md-4 col-sm-2 col-xs-1">
              <div classpolicy="comppage">
                <Breadcrumb style={{ marginTop: "20px" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>claims</Breadcrumb.Item>
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
                  <div style={{ display: "flex", flexDirection: "row" }}></div>
                </div>
                <Tabs>
                  <TabList style={{ justifyContent: "space-between" }}>
                    <Tab>Change Password</Tab>
                    <Tab>Manage Notification</Tab>
                  </TabList>

                  <TabPanel>
                    <div
                      style={{
                        width: "350px",
                        marginTop: "40px",
                        marginLeft: "20px",
                      }}
                    >
                      <Form.Group className="mb-3" controlId="formBasicEmail">
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
                        className="mb-3"
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
                        className="mb-3"
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
                        {/* <Button variant="primary" type="submit">
                    Update Password
                  </Button>
                  <Button variant="primary" type="submit">
                    Cancel
                  </Button> */}
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          onClick={() => {
                            reset();
                          }}
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary btn-lg mx-4"
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
                    <div className="accord mx-3">
                      {notification &&
                        notification.map((data, i) => {
                          return (
                            <Accordion
                              style={{ width: 800, marginTop: "30px" }}
                            >
                              <div
                                className=" accordhead"
                                style={{
                                  backgroundColor: "#8EC131",
                                  color: "white",
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                >
                                  <Typography
                                    style={{
                                      fontWeight: 15,
                                      color: "white",
                                      fontSize: "large",
                                    }}
                                  >
                                    {data.name}
                                  </Typography>
                                </AccordionSummary>
                              </div>

                              <AccordionDetails>
                                {userNotification &&
                                  userNotification.map((userNoti, i) => {
                                    if (userNoti.id === data.id) {
                                      console.log("userNoti", userNoti);
                                      return (
                                        <Typography>
                                          <p>
                                            Premium received notification on
                                            your email
                                            <input
                                              className="react-switch-checkbox"
                                              id={`react-switch-new-1`}
                                              type="checkbox"
                                              checked={userNoti.emailStatus}
                                              onChange={() =>
                                                handleUserNotification(
                                                  i,
                                                  {
                                                    emailStatus:
                                                      !userNoti.emailStatus,
                                                  },
                                                  "email"
                                                )
                                              }
                                            />
                                            <label
                                              className="react-switch-label"
                                              htmlFor={`react-switch-new-1`}
                                            >
                                              <span
                                                className={`react-switch-button`}
                                              />
                                              {/* <span className="inner" /> */}
                                              {/* <span className="switch" /> */}
                                            </label>
                                          </p>
                                          <p>
                                            Premium received notification text
                                            message on mobile
                                            <input
                                              className="react-switch-checkbox"
                                              id={`react-switch-new-2`}
                                              type="checkbox"
                                              checked={userNoti.textStatus}
                                              onChange={() =>
                                                handleTextNotification(
                                                  i,
                                                  {
                                                    textStatus:
                                                      !userNoti.textStatus,
                                                  },
                                                  "text"
                                                )
                                              }
                                            />
                                            <label
                                              className="react-switch-label"
                                              htmlFor={`react-switch-new-2`}
                                            >
                                              <span
                                                className={`react-switch-button`}
                                              />
                                            </label>
                                          </p>
                                        </Typography>
                                      );
                                    }else{
                                      return null
                                    }
                                  })}
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      )}
      {setsucessPage && <setSucess handleback={handleback} />}
    </>
  );
}
