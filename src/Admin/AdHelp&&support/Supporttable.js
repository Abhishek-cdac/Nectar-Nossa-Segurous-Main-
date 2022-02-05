import React,{useState,useEffect} from "react";
import { getSupportAPI } from "../../services/authentication";
import {Button,Modal, Form, Table} from "react-bootstrap";
import { Menu, Dropdown } from 'antd';


const Supporttable = (props)=>{

    const[SupportListArray,setSupportListArray]=useState('')
    const[TableData,setTableData]=useState('')

    const handleSupportList = async () => {
        const payload = {
            type:props.Type,
        }
        try {
          let tableDataArr = [];
          const resp = await getSupportAPI(payload);
        
          setSupportListArray(resp&&resp.data)
          console.log("resp",resp)
          resp &&
            resp.data.map((data, i) => {
              const value = {
                Id:data.id,
                Name:data.name,
                type:data.type,
                phone:data.description,
                Description:data.description,
                email:data.email,
                subject:data.subject,
              };
              tableDataArr.push(value);
              setTableData(tableDataArr);
              console.log("tdr", tableDataArr);
            });
        } catch (error) {
          console.log("error", error);
          // showAlert('In valide data', "error");
        }
      };
    
      useEffect(() => {
        handleSupportList();
      }, []);


      

    return(

        <div className="row">
          <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4">
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>type</th>
                  <th>Name</th>
                  <th>phone</th>
                  <th>Description</th>
                  <th>Email</th>
                  <th>subject</th>
                </tr>
              </thead>
              <tbody>
                {SupportListArray &&
                  SupportListArray.map((item) => (
                    <tr>
                      {console.log("DLA",SupportListArray)}
                      <td>{item.id}</td>
                      <td>{item.type}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.description}</td>
                      <td>{item.email}</td>
                      <td>{item.subject}</td>
                      {/* <td>createdAt</td> */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
    )
}
export default Supporttable