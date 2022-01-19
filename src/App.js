import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import Mainpage from "./landingPage/Mainpage"
// import Help from './landingPage/Help&support';
// import Paypremium from "./landingPage/Paypremium"
import Login from "./Authentication/Login"
import CreateAccount from "./Authentication/CreateAccount"
import Dashboard from "../src/user/Dashboard"
import LineGraph from "../src/components/atoms/LineGraph"
import Noosa from "./user/noosa"
import Hrnoosa from "../src/Hr/Hrnoosa"
import Adminnoosa from "../src/Admin/Adminnoosa"
import ForgetPass from './Authentication/ForgotPassword';
import ResetAccountCode from "./Authentication/ResetAccountCode"
import ListedPolocies from "./Admin/Listed polices/listedpolocies";



function App() {
  return (
    <div>
      {/* <h1>data</h1> */}
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<div><h1>data</h1></div>}/>
         {/* <Route path="/mainpage" element={<Mainpage/>}/> */}
        {/* <Route path="/help" element={<Help/>}/>
        <Route path="/paypremium" element={<Paypremium/>}/>  */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<CreateAccount/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/linegraph" element={<LineGraph/>}/>
        <Route path="/user" element={<Noosa/>}/>
        <Route path="/hr" element={<Hrnoosa/>}/>
        <Route path="/admin" element={<Adminnoosa/>}/>
        <Route path='/forgetPassword' element={<ForgetPass/>}/>
        <Route path='/resetpassword/:token' element={<ResetAccountCode/>}/>
        <Route path='/listedpolocies' element={<ListedPolocies/>}/>


        



       


      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
