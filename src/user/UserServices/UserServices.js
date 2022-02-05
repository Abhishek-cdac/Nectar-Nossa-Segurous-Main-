import React ,{useState,useEffect} from "react";
import { Card, Row, Col,Table, Button, Tabs, Divider } from "antd";
import { ArrowRightOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { getServiceList } from "../../services/authentication";
import { CSVLink } from "react-csv";
import NewServices from "./Newservices"
import SerSucessModal from "./SerSucessModal";


const UserServices = () => {
  const [show,setShow] = useState(false)
  const mouseHover = () => setShow(prev => !prev)
  const[serviceListArray,setServiceListArray]=useState('')
  const[TableData,setTableData]=useState('')
  const[SucessModalPage,setSucessModalPage] = useState('')
  const[UserServicesPage,setUserServicesPage]=useState(true)
  const[NewservicePage,setNewservicePage]=useState(false)




  const handleGetServiceRequestCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getServiceList(data);
      console.log("resp",resp)
      setServiceListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            serviceid: data.serviceCode,
            servicename: data.serviceName,
            requestedby: data.userPolicy.user.firstName,
            reqesteddate: data.date,
            priority: data.priorityStatus,
            status: data.verifyStatus,
            owner: data.userPolicy.agent.firstName,

          };
          console.log(value);
          tableDataArr.push(value);
        });
      console.log("tableDataArr in premium", tableDataArr);
      setTableData(tableDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleGetServiceRequestCall();
  }, []);


  //CSV data file starts from here
  const serviceRequestCSVData = () => {
    let serviceData = [];
    const serviceRequestData = serviceListArray && serviceListArray;
    if (serviceRequestData) {
      serviceData.push(
        "Service ID, Service Name, Requested By,Requested Date, Priority, Status, Owned by\n"
      );
      serviceRequestData.map((excelData) => {
        console.log("exceldata", excelData);
        serviceData.push(
          `${excelData.serviceCode}, ${excelData.serviceName},${excelData.userPolicy.user.firstName}${excelData.userPolicy.user.lastName},${excelData.date}, ${excelData.priorityStatus},${excelData.verifyStatus},${excelData.userPolicy.agent.firstName}\n`
        );
      });
    }
    return serviceData.join("");
  };
  const serviceCSV = serviceRequestCSVData();

  const handleback  =() =>{
    setSucessModalPage(false)
    setUserServicesPage(true)
  }




  const columns = [
    {
      title: "Service ID.",
      dataIndex: "serviceid",
      key: "serviceid",
      
      
    },
    {
      title: "Service Name",
      dataIndex: "servicename",
      key: "servicename",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested By",
      dataIndex: "requestedby",
      key: "requestedby",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested Date",
      dataIndex: "reqesteddate",
      key: "requesteddate",
      render: (text) => <p>{text}</p>,
    },
    {
        title: "Priority",
        key: "priority",
        dataIndex: "priority",
        // render: (tags) => (
        //   <>
        //     {tags.map((tag) => {
        //       let color = tag.length > 5 ? "#39A405" : "#39A405";
        //       if (tag === "urgent") {
        //         color = "#FF0000";
        //       }
        //       if (tag === "Low") {
        //         color = "#E5C110";
        //       }
        //       return (
        //         <Tag color={color} key={tag}>
        //           {tag.toUpperCase()}
        //         </Tag>
        //       );
        //     })}
        //   </>
        // ),
      },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Owned By",
      dataIndex: "owner",
      key: "owner",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      // render: (text, record) => (
      //   // <Dropdown placement="bottomCenter" overlay={operation} arrow>
      //   //   <a>
      //   //     <FormOutlined />
      //   //   </a>
      //   // </Dropdown>
      //   <a>{text}</a>
      //  )
    }
  ]   
  const handleNewServices = () =>{
    setUserServicesPage(false)
    setNewservicePage(true)
  }
 
  return (
    <>
    {UserServicesPage && <div>
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Requested Services</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card style={{backgroundColor:"#000000",color:"white"}} 
              actions={ show ? [
               <div>
                 <Button style={{marginBottom:'10px'}} type="link" onClick={()=>handleNewServices()}> Yearly Statement <br/>policy Statement</Button>
                </div> 
              ] : null}
              //  extra={show ? <Button type="link"> Download </Button> : null}
              onMouseEnter={mouseHover}
              onMouseLeave={mouseHover}>
                <div >
                  <Row>
                    <Col span={20}>
                      <div  className="heading" style={{fontSize:"20px"}}>Policy Documents</div>
                      <br></br>
                      <div className="sub-heading" style={{fontSize:"10px"}}>Required Documents</div>
                    </Col>                  
                  </Row>
                </div>
                <Divider />
                {/* <div style={{ float: "right" }}onClick={handleNewComplaint} >
                  {show ? <ArrowDownOutlined style={{ color: "#61b33b" }}/> : <ArrowRightOutlined style={{ color: "#61b33b" }} /> }
                </div> */}
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{backgroundColor:"#000000",color:"white"}}>
                <div>
                  <Row>
                    <Col span={20}>
                      <div className="heading" style={{fontSize:"22px"}}>Statements</div>                    
                   <br/><br></br>
                    <div className="sub-heading" style={{fontSize:"12px"}}>Payment Statements </div>                     
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  <ArrowRightOutlined style={{ color: "#61b33b" }} />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card style={{backgroundColor:"#000000",color:"white"}}>
                <div>
                  <Row>
                    <Col span={20}>
                      <div  className="heading" style={{fontSize:"22px"}}>Invoives</div>
                      <br></br><br/>
                      <div className="sub-heading" style={{fontSize:"12px"}}>view all Invoices</div>
                    </Col>
                
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  <ArrowRightOutlined style={{ color: "#61b33b" }} />
                </div>
              </Card>
            </Col>
            <Col span={6}>
                          </Col>
          </Row>
        </div>
      </div>
      </div>
<div>
      <div>
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#000089",
                  borderRadius: "5px",
                  margin:"10px",
                  display:"flex",
                  displayContent:"flex-End"
                }}
              >
                {/* Download PDF/CSV */}
                <CSVLink data={serviceCSV} target="_blank">
                  Download PDF/CSV
                </CSVLink>
              </Button>
            </div>

      <div>
      <Table
            rowClassName={() => "rowClassName1"}
            columns={columns}
            dataSource={TableData}
          />
      </div>
      </div>
      </div>}
      {NewservicePage && <NewServices/>}
      {SucessModalPage  && <SerSucessModal handleBack={handleback}/>}
      </>
  )
}
export default UserServices;
