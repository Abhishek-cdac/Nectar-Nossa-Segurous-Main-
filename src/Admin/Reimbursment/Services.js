
import React, { useEffect, useState } from "react";
import { FormOutlined} from "@ant-design/icons";
import { Menu, Dropdown,Upload,message } from 'antd';
import {Button,Modal, Form, Table} from "react-bootstrap";
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';
import { getEditServicesList,getDeleteServicesList,getAddServicesList,getReimServicesList } from "../../services/authentication";
import {CSVLink} from "react-csv";




const Services = () =>{

    const[TableData,setTableData]=useState('')
    const[ShowModal,setShowModal]=useState(false)
    const[ServicesListArray,setServicesListArray]=useState('')
    const[ServicesData,setServicesData]=useState('')
    const [TestFile, setTestfile] = useState('')
    const [bloodTest, setBloodTestfile] = useState('')
    const[show,setShow]=useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCancel = () =>setShowModal(false)
    const[errorMsg,seterrorMsg]=useState('')

    const [Data,setData] = useState({
        id:"",
        serviceName:"",
        specialization:"",
        description:"",
        date:"",
      })
    
      const{id,serviceName,specialization,description,date}=Data;
    
      const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
      };
    

      const values = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        maxCount: 1,
        headers: {
          authorization: 'authorization-text',
        },
        beforeUpload: file => {
          var fileTypes=['.png','.jpg','.jpeg','.pdf'];
          const isPNG = file.type === fileTypes;
          if (!isPNG) {
            message.error(`${file.name} is not a png file`);
          }
          return isPNG || Upload.LIST_IGNORE;
        },
        // onChange(info) {
        //   if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        //   }
        //   if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);
        //   } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        //   }
        // },
        progress: {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
      };
//List Service API call

const handleServicesList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getReimServicesList();
      setServicesListArray(resp&&resp.data)
      resp &&
        resp.data.map((data, i) => {
          const value = {

            id:data.id,
            serviceName:data.serviceName,
            specialization:data.specialization,
            description:data.description,
            createdAt:data.createdAt

          };
          tableDataArr.push(value);
          setServicesData(value)
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleServicesList();
  }, []);

  
       //Edit API

       const handleShowModal = (item) =>{
        console.log('selectedRec',item)
        console.log("table",ServicesData)
       const Date = moment(item.date).format('YYYY-MM-DD');
       setData({ 
       id:item.id,
       serviceName:item.serviceName,
       specialization:item.specialization,
       date:Date,
       description:item.description})
       setShowModal(true)
     }
     
     
     const handleEditServicesList = async() =>{
      const payload ={
       'Blood test': TestFile,
       'Cancer treatment': bloodTest
     }
     try {
       const resp = await getEditServicesList(payload);
       console.log('success',resp)
       resp && handleServicesList()
       // handelEditCancel()
       setShowModal(false)
     } catch (error) {
         console.log('error',error)
     }
     
     }
   
     //Delete Record
   
     //Delete API
   
     const handleDeleteInfo = async(item) =>{
       console.log("dd",ServicesData)
       const payload ={
            "id":item.id,
            
         }
         try {
           const resp = await getDeleteServicesList(payload);
           console.log('success',resp)
           resp && handleServicesList()
           // handelEditCancel()
         } catch (error) {
             console.log('error',error)
         }
     }
    //  const OperationBloodTestRequest = ({ file, onSuccess }) => {
    //   setBloodTestfile(file)
    //   setTimeout(() => {
    //     onSuccess("ok");
    //   }, 0);
    // };
    const OperationCancerTestRequest = ({ file, onSuccess }) => {
      setTestfile(file)
      setTimeout(() => {
        onSuccess("ok");
        console.log("file",file)
      }, 0);
    };

     const handleSubmit = async () => {
        const Payload = {
            service: serviceName,
            description: description
            //need to add
          };
 
        if (
            description === "" ||
            serviceName === "" 
           ) 
            {
          seterrorMsg("Please Fill all fileds.");
           } 
         else {
          try {
            const resp = await getAddServicesList(Payload);
            console.log("record added successfuly");
            seterrorMsg("");
            setShow(false);
            handleServicesList()
          } catch (error) {
            console.log("error", error);
            // showAlert('In valide data', "error");
          }
        
      };
    }


     
  //CSV Download

  const ServicesCSVdata = () =>{
    let ServicesData =[]
    console.log("hla",ServicesListArray)
    const ServicesListArrayData = ServicesListArray && ServicesListArray
    if(ServicesListArrayData){
        ServicesData.push('Id,ServiceName,Date,Description\n')
      ServicesListArrayData.map((excelData)=>{
        console.log("excel",excelData)
        ServicesData.push(
          `${excelData.id},${excelData.serviceName}, ${excelData.createdAt}, ${excelData.description}\n`
 
          )

      })
    }
    
    return ServicesData.join('')
  }
  const ServicesCSV = ServicesCSVdata()

   
   


  const menu =(item)=> {
    return(
    <Menu>
      {/* <Menu.Item key="1">Assign to</Menu.Item> */}
      <Menu.Item key="2" onClick={() =>{handleShowModal(item)}}>Edit Info</Menu.Item>
      <Menu.Item key="3" onClick={() =>{handleDeleteInfo(item)}}>Delete</Menu.Item>
    </Menu>
    )
  }  
  


    return(
        <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7  col-lg-4 col-md-4 col-sm-3">
              <h4 id="head" className="my-3 mx-5">
                services List
              </h4>
            </div>
            <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
              <div className="header">
                <button
                  type="button"
                  class="btn btn-success btn-sm my-3"
                  style={{ width: "130px" }}
                  onClick={handleShow}
                >
                  <i class="fas fa-plus-circle"></i> Add services List
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{ color: "#61B33B", marginLeft: "130px" }}
                    >
                      Add Services List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div class="container">
                      <Form.Group>
                      {/* <Form.Label>Id</Form.Label>
                      <Form.Control type="id" value={id} name="id" onChange={handleChange}></Form.Control>  */}
                       <Form.Label>Services Name</Form.Label>
                      <Form.Control type="text" value={serviceName} name="serviceName" onChange={handleChange}></Form.Control>

                      <Form.Label>Description</Form.Label>
                      <Form.Control type="textarea" value={description} name="description" onChange={handleChange}></Form.Control>
                      </Form.Group>
                      <div style={{marginBottom:'10px',marginTop:'10px'}}>
                      {/* <Upload {...values} customRequest={OperationBloodTestRequest}>
                        <Button icon={<UploadOutlined />}>Choose File</Button>
                      </Upload> */}
                      </div>
                      <Upload {...values} customRequest={OperationCancerTestRequest}>
                        <Button icon={<UploadOutlined/>}>Choose File</Button>
                      </Upload>
                    </div>
                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleSubmit}
                      style={{ width: "200%" }}
                    >
                      submit
                    </Button>
                    <label style={{ color: "red", justifyContent: "center" }}>
                {errorMsg}
              </label>
                  </Modal.Footer>
                </Modal>
                <div class="btn-group hover_drop_down">
                  {/* <button
                    type="button"
                    class="btn btn-success btn-sm my-3"
                    data-toggle="dropdown"
                    style={{ width: "130px" }}
                  >
                    <i class="fas fa-filter"></i> Add Filters
                  </button>
                  <ul class="dropdown-menu" role="menu" onClick={HandleClick}>
                    <li>
                      <a onClick={() =>{handleclick("Public Holiday")}}>Public Holiday </a>
                    </li>
                    <li>
                      <a onClick={() =>{handleclick("National Holiday")}}>National Holiday</a>
                    </li>
                    <li>
                      <a onClick={() =>{handleclick("seasonal Holiday")}}>seasonal Holiday</a>
                    </li>
                  </ul> */}
                <button type="button" class="btn btn-primary btn-sm my-3">
                <CSVLink data={ServicesCSV} target="_blank">
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
                    <th> Service Name</th>
                    <th>Description</th>
                    <th>createdAt</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ServicesListArray &&
                    ServicesListArray.map((item) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.specialization}</td>
                        <td>{item.description}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          <Dropdown overlay={menu(item)}>
                            <a className="ant-dropdown-link">
                              <FormOutlined  style={{ paddingLeft: "30px" }} />
                            </a>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-9  col-lg-6 col-md-4 col-sm-2">
              Shown Results{ServicesListArray.length}
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
          <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
              <div className="header">
                <Modal show={ShowModal} onHide={handleCancel}>
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{ color: "#61B33B", marginLeft: "130px" }}
                    >
                      Edit Services List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div class="container">
                      <Form.Group>
                      <Form.Label>Id</Form.Label>
                      <Form.Control type="id" value={id} name="id" onChange={handleChange}></Form.Control> 
                       <Form.Label>Service Name</Form.Label>
                      <Form.Control type="text" value={serviceName} name="serviceName" onChange={handleChange}></Form.Control>
                      <Form.Label>specialization</Form.Label>
                      <Form.Control type="text" value={specialization} name="specilization" onChange={handleChange}></Form.Control>
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="textarea" value={description} name="description" onChange={handleChange}></Form.Control>
                      <Form.Label>Created At</Form.Label>
                      <Form.Control type="date" value={date} name="date" onChange={handleChange}></Form.Control>
                      </Form.Group>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleEditServicesList}
                      style={{ width: "200%" }}
                    >
                      Submit
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
        </div>
      </>
    )
}
export default Services;

