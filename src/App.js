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
import PageNotFound from './PageNotFound';
import Claims from './user/Claims/claims';
import Paypremium from './user/Paypremium/Paypremium';

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
        <Route path="/user/newClaim" element={ <Claims/>}/>
        <Route path="/user/paypremium" element={<Paypremium/>}/>
        <Route path="/user/noosacard" />
        <Route path="/user/complaint" />
        <Route path="/user/servicerequest" />
        <Route path="/user/holidays" />
        <Route path="/user/reimbursement" />
        <Route path="/user/setting" />
        <Route path="/user/helpandsupport" />
        <Route path="/hr" element={<Hrnoosa/>}/>
        <Route path="/admin" element={<Adminnoosa/>}/>
        <Route path='/forgetPassword' element={<ForgetPass/>}/>
        <Route path='/resetpassword/:token' element={<ResetAccountCode/>}/>
        <Route path='/listedpolocies' element={<ListedPolocies/>}/>
        <Route path=':/pagename' element={<PageNotFound/>}/>

        



       


      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
