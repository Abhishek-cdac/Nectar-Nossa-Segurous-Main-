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
  resetpassword,
  getChangePassword,
  getUserNotificationService,
  getNotificationService,
  getAddUserNotificationService
} from "../../services/authentication"
import setSucess from "../../user/settings/setSucess";

export default function HrSetting() {
  const [data, setData] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
    email:"",
  });
  const [userNotification,setUserNotification] = useState('')
  const[errorMsg,seterrorMsg]=useState('')
  const [notification, setnotification] = useState([])
  const [sucessPage, setsucessPage] = useState([]);
  const [settingsPage, setSettingsPage] = useState(true);
  const [emailvalue,setEmailvalue] = useState(false)
  const Token = window.localStorage.getItem("token");
  console.log("Token in list", Token);

  const { confirmPassword, oldPassword, newPassword,email } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const reset = async () => {
    console.warn();
    const payload = {
      email:email,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      newPassword: newPassword,
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
      console.log(response);
    } catch (error) {
     
      alert(JSON.stringify(error.message));
    }
  }
  };

  const handleNotification = async() =>{
    try {
      const userNotificationResp = await getUserNotificationService();
      const notificationResp = await getNotificationService();
      // console.log('userNotificationResp',notificationResp , userNotificationResp);
      setUserNotification(userNotificationResp.data)
      setnotification(notificationResp.data)
    } catch (error) {
      /**
       * Error logic here
       * we need to do based on the error
       */
      alert('naga sai',JSON.stringify(error.message));
    }
    }
  useEffect(() => {
    // async function handleverficationCall() {
    //   const resp = await resetPasswordVerification(Token);
    //   console.log("resfasdfas", resp);
    //   if (resp) {
    //     setsucessPage(true);
    //   } else {
    //     setSettingsPage(false);
    //   }
    // }
    // handleverficationCall();
    handleNotification()
  }, []);

  const handletoggleChange = async(data,type) =>{
    let payload ={ }
    if(type === 'mobile'){
      payload ={ "notification_id": data.notification_id ,
        "textStatus": !data.textStatus
       }
    }else{
       payload ={"notification_id": data.notification_id ,
        "emailStatus": !data.emailStatus,
       }
    }
    console.log('payload',payload , type , data)
    try {
      const userAddNotiResp = await getAddUserNotificationService(payload);
      console.log('userAddNotiResp',userAddNotiResp);
      handleNotification();
    } catch (error) {
      /**
       * Error logic here
       * we need to do based on the error
       */
      alert('naga sai',JSON.stringify(error.message));
    }
  }

  const handleback = () => {
    setsucessPage(false);
    setSettingsPage(true);
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
                        width: "330px",
                        marginTop: "40px",
                             // marginLeft: "20px",
                      }}
                    >
                       <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={email}
                          placeholder="Enter email"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
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
                        {/* <Button variant="primary" type="submit">
                    Update Password
                  </Button>
                  <Button variant="primary" type="submit">
                    Cancel
                  </Button> */}
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
                    <div className="accord mx-3 row">
                      {notification && notification.map((data)=>{
                        return(
                          <Accordion style={{ width: 800, marginTop: "30px" }}>
                        <div
                          className="accordhead col-md-12"
                          style={{ backgroundColor: "#8EC131", color: "white" }}
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
                          <Typography>
                            <p>
                              Premium received notification on your email
                              <input
                                className="react-switch-checkbox"
                                id={`react-switch-new`}
                                type="checkbox"
                                checked={data.emailStatus}
                                onChange={() => handletoggleChange(data,'email')}
                              />
                              <label
                                className="react-switch-label"
                                htmlFor={`react-switch-new`}
                              >
                                <span className={`react-switch-button`} />
                                {/* <span className="inner" /> */}
                               {/* <span className="switch" /> */}
                              </label>
                            </p>
                            {/* <p>
                              Premium received notification text message on
                              mobile
                              <input
                                className="react-switch-checkbox"
                                id={`react-switch-new`}
                                type="checkbox"
                                checked={false}
                                onChange={() => handletoggleChange(data,'mobile')}
                              />
                              <label
                                className="react-switch-label"
                                htmlFor={`react-switch-new`}
                              >
                                <span className={`react-switch-button`} />
                              </label>
                            </p> */}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                        )
                      })}
                      {/* <Accordion style={{ width: 800, marginTop: "30px" }}>
                        <div
                          className=" accordhead"
                          style={{ backgroundColor: "#8EC131", color: "white" }}
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
                              Premium Received Notification
                            </Typography>
                          </AccordionSummary>
                        </div>

                        <AccordionDetails>
                          <Typography>
                            <p>
                              Premium received notification on your email
                              <input
                                className="react-switch-checkbox"
                                id={`react-switch-new`}
                                type="checkbox"
                              />
                              <label
                                className="react-switch-label"
                                htmlFor={`react-switch-new`}
                              >
                                <span className={`react-switch-button`} />
                              </label>
                            </p>
                            <p>
                              Premium received notification text message on
                              mobile
                            </p>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion style={{ width: 800 }}>
                        <div
                          className=" accordhead"
                          style={{ backgroundColor: "#8EC131", color: "white" }}
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
                              Email Notification
                            </Typography>
                          </AccordionSummary>
                        </div>
                        <AccordionDetails>
                          <Typography>Greetings of the day :)</Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion style={{ width: 800 }}>
                        <div
                          className=" accordhead"
                          style={{ backgroundColor: "#8EC131", color: "white" }}
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
                              About New Listed polices
                            </Typography>
                          </AccordionSummary>
                        </div>
                        <AccordionDetails>
                          <Typography>Greetings of the day :)</Typography>
                        </AccordionDetails>
                      </Accordion>
                      <Accordion style={{ width: 800 }}>
                        <div
                          className=" accordhead"
                          style={{ backgroundColor: "#8EC131", color: "white" }}
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
                              Offer
                            </Typography>
                          </AccordionSummary>
                        </div>
                        <AccordionDetails>
                          <Typography>Greetings of the day :)</Typography>
                        </AccordionDetails>
                      </Accordion> */}
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
