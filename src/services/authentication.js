import { doGet, doPost, doPut,doDelete } from "../utils/request";
import { FormModel } from "../model/FormModel";
import { baseurl } from "../utils/request";
import axios from "axios"
//import { updateUserAccessInRedux } from "./../utils/index";

export const registerUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/admin/userRegistration`, data, {
        headers:null,
      });
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const resetpassword = async(data) =>{
  return await doPost("admin/ResetPassword",data)
}
// policy api statred
export const getPolicyList = async(data) =>{
  return await doGet(`policy?search=${data.search}&policyType=${data.type}&id=${data.id}`);
}
export const getAllUserPolicyList = async(data) =>{
  return await doGet(`policy/getAllUserPolicy?policy_id=${data.policy_id}&user_id=${data.user_id}&agent_id=${data.agent_id}&premiumPlan=${data.premiumPlan}&activeStatus=${data.activeStatus}`);
}
// doGet('/userPolicy', {params: objParam});
export const addPolicyList = async(data) =>{
  return await doPost("policy/add",data)
}
export const deletePolicyList = async(id) =>{
  return await doDelete(`policy/delete`,id)
}

export const editPolicyList = async(data) =>{
  return await doPut('policy/edit',data)
}

// policy api ended

//Agent api started
export const getAgentList = async(data) =>{
  return await doGet('agent');
}
export const addAgentList = async(data) =>{
  return await doPost("agent/add",data)
}
export const deleteAgentList = async(id) =>{
  return await doDelete(`agent/delete`,id)
}

export const editAgentList = async(data) =>{
  return await doPut('agent/edit',data)
}


//premium api started
export const getPremiumList = async(data) =>{
  return await doGet('premium');
}

export const Creditcardinfo = async(data) =>{
  return await doPost("premium/payPremium",data)
}

//complaint Api

export const getComplaintList = async(data) =>{
  return await doGet('complaint');
}

export const addComplaintList = async(data) =>{
  return await doPost("complaint/add",data)
}

export const deleteComplaintList = async(id) =>{
  return await doDelete(`complaint/delete`,id)
}

export const editComplaintList = async(data) =>{
  return await doPut('complaint/edit',data)
}
export const verifyComplaintList = async(data) =>{
  return await doPost("complaint/verifyRequest",data)
}


//Services Api 
export const getServiceList = async() =>{
  return await doGet('servicerequest');
}

export const AddServiceList = async(data) =>{
  return await doPost("servicerequest/add",data)
}

export const verifyServiceList = async(data) =>{
  return await doPost('servicerequest/verifyRequest',data);
}


//claims
export const getAddClaim = async(data) =>{
  return await doPost('claim/add',data);
}
export const getEditClaim = async(data) =>{
  return await doPut('claim/edit',data);
}
export const getDeleteClaim = async(data) =>{
  return await doDelete('claim/delete',data);
}
//claim api
export const getClaimsList = async() =>{
  return await doGet('claim');
}

export const verifyClaimList = async(data) =>{
  return await doPost('claim/verifyRequest',data);

}








export const loginUser = async (email, password) => {
  const data={
    userName:email,
    password,
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/account/userLogin`, data, {
        headers:null,
      });
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const forgotPassword = async (email) => {
  const response = await doPost("account/forgotPassword", { email });

  return response;
};

//  export const resetPasswordService = async (payload) => {
//    return await doPost("api/v1/auth/resetPassword", payload);
//  };

 export const resetPasswordVerification = async (verficationToken) => {
  return await doGet(`account/resetPasswordVerification/${verficationToken}`);
};

// export const getUserDetailsByToken = async () => {
//   const response = await doGet("api/v1/auth/userDetails");
//   new FormModel("userDetails")._createForm(response?.result);

//   return response;
// };
