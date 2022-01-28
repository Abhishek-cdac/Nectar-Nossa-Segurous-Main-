import React, { useState, useEffect } from "react";
import { Select, Form, Button, } from "antd";
import { AddServiceList, getServiceList } from "../../services/authentication"

import '../UserStyle.css'
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

const Newservice = () => {
  const [PolicyCode, setPolicyCode] = useState('');
  const Token = window.localStorage.getItem('token');
  const [AddService, setAddService] = useState('')
  console.log("token is", Token)





  const handleGetServiceRequestCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getServiceList(data);
      console.log("resp", resp)
      resp && resp.data.map((data, i) => {
        const obj = {
          'policyCode': data.userPolicy.policy.policyCode,
          'policyName': data.userPolicy.policy.policyName
        }
        tableDataArr.push(obj)
        //tableDataArr.push(data.statement)
      })
      console.log('tableDataArr', tableDataArr)
      setPolicyCode(tableDataArr)
    }
    catch (error) {
      console.log("err", error)
    }
  }
  useEffect(() => {
    handleGetServiceRequestCall()
  }, [])



  const handleAddServiceListAPI = async (addServiceList) => {
    const payload = {
      "userPolicy_id": addServiceList.policy_No,
      "description": addServiceList.description,
      'serviceName':'',
      'token': Token
    }
    try {
      const resp = await AddServiceList(payload);
      console.log("sucess", resp)
      handleGetServiceRequestCall()
      //handleCancel()

    }
    catch (error) {
      console.log("error", error)
    }
  }
  const onFinish = (values) => {
    setAddService(values)
    handleAddServiceListAPI(values)

  }
  const OnFinishFailed = (errorInfo) => {
    console.log('failed', errorInfo)
  }


  return (
    <div>
      <div class="row d-flex align-items-center justify-content-between">
        <div class="col-12">
          <div class="heading-with-box mb-2">
            <div class="row">
              <div class="col-lg-6 col-md-6 text-left">
                <h3>Request Statement</h3>
              </div>
              {/* <div class="col-lg-6 col-md-6 text-right">
                <a href="" class="btn" data-toggle="modal" data-target="#addPolicyList">Status : Not Submited</a>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <Form onFinish={onFinish}>
        <div class="faq-custom">
          <div class="detail-box">
            <div class="card-body form-custom">
              <div class="row">
                <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label for="exampleInputtext" class="mb-1">Policy No.<em>*</em></label>
                    <Form.Item
                      name="policy_No"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'Policy is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        {PolicyCode && PolicyCode.map((data) => (
                          <Option value={data.policyCode}>{data.policyCode}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label for="exampleInputtext" class="mb-1">Policy<em>*</em></label>
                    <Form.Item
                      name="policyName"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'PolicyName is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        {PolicyCode && PolicyCode.map((data) => (
                          <Option value={data.policyName}>{data.policyName}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                  </div>
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                  <div class="form-group">
                    <label for="exampleInputtext" class="mb-1">Policy type<em>*</em></label>
                    <Form.Item
                      name="policyType"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'PolicyType is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option  value ='General'>General</Option>
                        <Option value ='Health'>Health</Option>
                        <Option value ='General && Health'>General && Health</Option>
                        <Option value ='vehicle'>vehicle</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="exampleInputHolderName" class="mb-1">Statement Type<em>*</em></label>
                    </div>
                    <Form.Item
                      name="Statement_Type"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'Statement is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option  value ='Yearly statement'>Yearly Statement</Option>
                        <Option  value ='Monthly statement'>Monthly Statement</Option>

                      </Select>
                    </Form.Item>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="exampleInputHolderName" class="mb-1">Invoice year<em>*</em></label>
                    </div>
                    <Form.Item
                      name="Invoice year"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'Invoice  is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value ='yearly'>yearly</Option>
                        <Option value ='quaterly'>quaterly</Option>
                        <Option value ='monthly'>monthly</Option>
                        {/* <Option></Option> */}

                        {/* {statement && statement.map((data)=>(
                        <Option value={data}>{data}</Option>
                      )) } */}
                      </Select>
                    </Form.Item>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="exampleInputHolderName" class="mb-1">Invoice year<em>*</em></label>
                    </div>
                    <Form.Item
                      name="Statement"
                      style={{ width: '300px' }}
                      rules={[
                        {
                          required: true,
                          message: 'Statement is required'
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a option"
                        // onChange={onGenderChange}
                        allowClear
                      >
                        <Option value ='2018-2019'>2018-2019</Option>
                        <Option value ='2019-2020'>2019-2020</Option>
                        <Option value ='2020-2021'>2020-2021</Option>
                        <Option value ='2021-2022'>2021-2022</Option>

                        {/* {statement && statement.map((data)=>(
                        <Option value={data}>{data}</Option>
                      )) } */}
                      </Select>
                    </Form.Item>
                  </div>
                  <div class="col-md-12">
                    <label for="exampleInputHolderName" class="mb-1">Comment<em>*</em></label>
                    <div class="form-group">
                      <TextArea style={{ width: '350px' }} class="form-control" rows="6">
                      </TextArea>
                    </div>
                  </div>
                  <Button style={{ marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }} type="submit" class="btn btn-primary" htmlType="submit">Submit Complaint</Button>
                </div>
              </div>
            </div>
          </div>

          <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid">
              <div class="d-flex align-items-center justify-content-between small">
                <div class="text-muted">Copyright &copy; Nossa 2020</div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Form>
    </div>
  )
}
export default Newservice 
