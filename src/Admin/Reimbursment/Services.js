
import React, { useEffect, useState } from "react";
import { FormOutlined} from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import {Button,Modal, Form, Table} from "react-bootstrap";
import moment from 'moment';
import { getEditServicesList,getDeleteServicesList,getAddServicesList,getReimServicesList } from "../../services/authentication";
import {CSVLink} from "react-csv";




const Services = () =>{

    const[TableData,setTableData]=useState('')
    const[ShowModal,setShowModal]=useState(false)
    const[ServicesListArray,setServicesListArray]=useState('')
    const[ServicesData,setServicesData]=useState('')
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

       const handleShowModal = (selectedRec) =>{
        console.log('selectedRec',selectedRec)
        console.log("table",ServicesData)
       const Date = moment(selectedRec.date).format('YYYY-MM-DD');
       setData({ 
       id:selectedRec.id,
       serviceName:selectedRec.serviceName,
       specialization:selectedRec.specialization,
       date:Date,
       description:selectedRec.description})
       setShowModal(true)
     }
     
     
     const handleEditServicesList = async() =>{
      const payload ={
        "id":id,
        "service": serviceName
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
   
     const handleDeleteInfo = async() =>{
       console.log("dd",ServicesData)
       const payload ={
            "id":id,
            
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

   
   


  const menu =(selectedRec)=> {
    return(
    <Menu>
      {/* <Menu.Item key="1">Assign to</Menu.Item> */}
      <Menu.Item key="2" onClick={() =>{handleShowModal(selectedRec)}}>Edit Info</Menu.Item>
      <Menu.Item key="3" onClick={() =>{handleDeleteInfo(selectedRec)}}>Delete</Menu.Item>
    </Menu>
    )
  }  
  


    return(
        <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-7  col-lg-4 col-md-4 col-sm-3">
              <h4 id="head" className="my-3 mx-5">
                Doctors List
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
                  <i class="fas fa-plus-circle"></i> Add Doctors List
                </button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title
                      style={{ color: "#61B33B", marginLeft: "130px" }}
                    >
                      Add Holiday List
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div class="container">
                      <Form.Group>
                      <Form.Label>Id</Form.Label>
                      <Form.Control type="id" value={id} name="id" onChange={handleChange}></Form.Control> 
                       <Form.Label>Services Name</Form.Label>
                      <Form.Control type="text" value={serviceName} name="serviceName" onChange={handleChange}></Form.Control>

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
                  {TableData &&
                    TableData.map((item) => (
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
                      Edit Doctors List
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

