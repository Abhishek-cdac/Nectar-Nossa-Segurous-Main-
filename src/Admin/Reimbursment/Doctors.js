// import React from "react";
import React, { useEffect, useState } from "react";
import { FormOutlined} from "@ant-design/icons";
import { Menu, Dropdown } from 'antd';
import {Button,Modal, Form, Table} from "react-bootstrap";
import { getDoctorsList } from "../../services/authentication";
import moment from 'moment';
import { getEditDoctorsList,getDeleteDoctorsList,getAddDoctorsList } from "../../services/authentication";
import {CSVLink} from "react-csv";
import AdReimbusrment from "./AdReimbursment"


  

const Doctors = () =>{
    const[DoctorsListArray,setDoctorsListArray]=useState('');
    const[DoctorsData,setDoctorsData]=useState('')
    const[TableData,setTableData]=useState('')
    const[ShowModal,setShowModal]=useState(false)
    const[show,setShow]=useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCancel = () =>setShowModal(false)
    const[errorMsg,seterrorMsg]=useState('')
    const[ReimbursmentPage,setReimbusrmentPage]=useState('')

    const [Data,setData] = useState({
        id:"",
        Name:"",
        specialization:"",
        description:"",
        date:"",
      })
    
      const{id,Name,specialization,description,date}=Data;
    
      const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
      };
    






    const handleDoctorsList = async () => {
        try {
          let tableDataArr = [];
          const resp = await getDoctorsList();
        
          setDoctorsListArray(resp&&resp.data)
          resp &&
            resp.data.map((data, i) => {
              const value = {
  
                id:data.id,
                Name:data.doctorName,
                specialization:data.specialization,
                description:data.description,
                createdAt:data.createdAt
 
              };
              tableDataArr.push(value);
              setDoctorsData(value)
              setTableData(tableDataArr);
              console.log("tdr", tableDataArr);
            });
        } catch (error) {
          console.log("error", error);
          // showAlert('In valide data', "error");
        }
      };
    
      useEffect(() => {
        handleDoctorsList();
      }, []);
      

       //Edit API

  const handleShowModal = (item) =>{
     console.log('item',item)
     console.log("table",DoctorsData)
    const Date = moment(item.date).format('YYYY-MM-DD');
    setData({ 
    id:item.id,
    Name:item.doctorName,
    specialization:item.specialization,
    date:Date,
    description:item.description})
    setShowModal(true)
  }
  
  
  const handleEditDoctorsList = async() =>{
   const payload ={
     "id":id,
    "doctorName":Name,
    "date": date,
    "specialization":specialization,
    "description":description
  }
  try {
    const resp = await getEditDoctorsList(payload);
    console.log('success',resp)
    resp && handleDoctorsList()
    // handelEditCancel()
    setShowModal(false)
  } catch (error) {
      console.log('error',error)
  }
  
  }

  //Delete Record

  //Delete API

  const handleDeleteInfo = async(item) =>{
    // console.log("dd",DoctorsData)
    const payload ={
         "id": item.id,
         
      }
      try {
        const resp = await getDeleteDoctorsList(payload);
        console.log('success',resp)
        resp && handleDoctorsList()
        // handelEditCancel()
      } catch (error) {
          console.log('error',error)
      }
 

  }

      const menu =(item)=> {
        return(
        <Menu>
          {/* <Menu.Item key="1">Assign to</Menu.Item> */}
          <Menu.Item key="2" onClick={() =>{handleShowModal(item)}}>Edit Info</Menu.Item>
          <Menu.Item key="3" onClick={() =>{handleDeleteInfo(item)}}>Delete</Menu.Item>
        </Menu>
        )
      }  
      //ADD API started
    const handleSubmit = async () => {
        const Payload = {
            doctorName: Name,
            specialization:specialization,
            description: description
          };
 
        if (
            specialization === "" ||
            description === "" ||
            Name === "" 
           ) 
            {
          seterrorMsg("Please Fill all fileds.");
           } 
         else {
          try {
            const resp = await getAddDoctorsList(Payload);
            console.log("record added successfuly");
            seterrorMsg("");
            setShow(false);
            handleDoctorsList()
          } catch (error) {
            console.log("error", error);
            // showAlert('In valide data', "error");
          }
        
      };
    }

    const DoctorsCSVdata = () =>{
        let DoctorsData =[]
        // console.log("hla",HolidayListArray)
        const DoctorsListArrayData = DoctorsListArray && DoctorsListArray
        if(DoctorsListArrayData){
            DoctorsData.push('Id,Name,specialization,Description,CreatedAt\n')
          DoctorsListArrayData.map((excelData)=>{
            console.log("excel",excelData)
            DoctorsData.push(
              `${excelData.id},${excelData.doctorName}, ${excelData.specialization}, ${excelData.description},${excelData.createdAt}\n`
     
              )
    
          })
        }
        
        return DoctorsData.join('')
      }
      const DoctorsCSV = DoctorsCSVdata()





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
                     <Form.Label>Doctors Name</Form.Label>
                    <Form.Control type="text" value={Name} name="Name" onChange={handleChange}></Form.Control>
                    <Form.Label>specialization</Form.Label>
                    <Form.Control type="text" value={specialization} name="specialization" onChange={handleChange}></Form.Control>
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
              <CSVLink data={DoctorsCSV} target="_blank">
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
                  <th>specialization</th>
                  <th>Description</th>
                  <th>createdAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DoctorsListArray &&
                  DoctorsListArray.map((item) => (
                    <tr>
                      {console.log("DLA",DoctorsListArray)}
                      <td>{item.id}</td>
                      <td>{item.doctorName}</td>
                      <td>{item.specialization}</td>
                      <td>{item.description}</td>
                      <td>createdAt</td>
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
            Shown Results{DoctorsListArray.length}
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
                     <Form.Label>Doctors Name</Form.Label>
                    <Form.Control type="text" value={Name} name="Name" onChange={handleChange}></Form.Control>
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
                    onClick={handleEditDoctorsList}
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
export default Doctors