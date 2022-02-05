import React,{useState} from "react";
import { Form, Input, Button, Radio,Space, Checkbox, Row } from "antd";
import VerticalMenu from "../components/atoms/VerticalMenu";
import Logo from "../images/Userdashboard/logo.png";
import { loginUser } from "../services/authentication";
import { useNavigate, useLocation } from "react-router-dom";
// import { showAlert } from "../utils/showAlert";

const Login = () => {
  const [role, setRole] = React.useState("User");
  // const [userId,setUserId] =useState('')
  // const [password,setPassword] =useState('')

  let navigate = useNavigate();
  const {policy} = useLocation();

  const profile = () =>{
    // var selectvalue = ("input[name=choice]:checked", "Form").val();
    if (role == "User") {
      navigate("/user")
    } else if (role == "Hr") {
      navigate("/hr")
    } else if (role == "Admin") {
      navigate("/admin")
    } 
  }

  const handleLoginButton = async (values) =>{
    let roleVlaue = ''
    if(role === "User"){
      roleVlaue = 4
    }else if(role === "Hr"){
      roleVlaue = 3
    }else{
      roleVlaue = ''
    }
    // const roleValue = 
    try {
      const resp = await loginUser(values.user_id, values.confirm, roleVlaue);
      const value = resp && resp.data.data.jwtToken
      window.localStorage.setItem('token',value)
      window.localStorage.setItem('loginDetailsUserId',resp.data.data.userId)
      profile()
    } catch (error) {
        console.log('error',error)
      // showAlert('In valide data', "error");
    } finally {
      console.log('data')
    }
  }

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRole(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    handleLoginButton(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <body style={{ width: "100%" }}>
      {console.log('location',policy )}
      <div
        className="container"
        style={{
          display: "flex",
          borderRadius: "10px",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "150px",
          height: "600px",
          width: "530px",
          backgroundColor: "#4cbb17",
        }}
      >
        <div>
          <img
            src={Logo}
            style={{
              width: "175px",
              height: "45px",
              marginTop: "50px",
              marginBottom: "50px",
            }}
          />
        </div>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item style={{justifyContent:'center',display:'flex'}}>
              <Radio.Group onChange={onChange} value={role} style={{justifyContent:'center',display:'flex',paddingRight:'30px',alignSelf:'center'}}>
                <Row>
                  <Radio name="value" value="User" style={{marginRight:'20px'}}>
                    User
                  </Radio>
                  <Radio name="value"  value="Hr" style={{marginRight:'20px'}}>
                    Hr/Agent
                  </Radio>
                  <Radio name="value"  value="Admin">
                    Admin
                  </Radio>
                </Row>
              </Radio.Group>
            </Form.Item>
          <Form.Item
            name="user_id"
            rules={[
              { required: true, message: "please Enter yourInput," },
            ]}
          >
            <Input
              size="large"
              placeholder="User Id"
              style={{ height: "60px", width: "350px", borderRadius: "5px" }}
              // value={userId}
              // onChange={(e)=>setUserId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required:true,
                message:'Please input your Password'
              }
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter Password"
              style={{ height: "60px", width: "350px", borderRadius: "5px" }}
              // value={password}
              // onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox  style={{color:'white'}}>Remember me</Checkbox>
            </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{background:'#000080', height: "60px", width: "350px", borderRadius: "5px",borderColor:'#000080' }}
              // onClick={()=>handleLoginButton()}
            >
              <div style={{color:'white',fontSize:'25px',marginTop:'5px'}}>LOGIN</div>
            </Button>
          </Form.Item>
          <Form.Item >
              <a href="#" style={{color:'white',justifyContent:'center',display:'flex'}} onClick={()=> navigate("/forgetPassword")}> Forget password?</a>
          </Form.Item>
        </Form>
      </div>
    </body>
  );
};

export default Login;
