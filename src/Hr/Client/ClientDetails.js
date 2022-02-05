import React from "react";

const ClientDetails = (props) => {
  const selectedRecord = props && props.selectedRecord;
  console.log("sr", selectedRecord);
  const alldata = props && props.data;
  console.log("alldata", alldata);
  const policyList =
    alldata && alldata.filter((data) => data.id === selectedRecord.id)[0];
  console.log("pl", policyList);

  return (
    <div class="container-fluid">
      <div class="row d-flex align-items-center justify-content-between">
        <div class="col-12 text-left">
          <h3 class="mt-0 mb-4">
            <a class="text-black" onClick={props.handleBackPage}>
              <i class="fas fa-long-arrow-alt-left"></i>
            </a>
          </h3>
        </div>
      </div>

      <div class="row d-flex align-items-center justify-content-between">
        <div class="col-12">
          <div class="heading-with-box m-0">
            <div class="row">
              <div class="col-lg-12 text-left">
                <h3>
                  Policy No :{" "}
                  <span class="color-green">
                    {policyList && policyList.policy.policyCode}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="faq-custom">
        <div class="detail-box">
          <div class="card-body form-custom">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="table-data">
                  <span class="text-blue">Policy Holder</span>
                  <b>
                    {" "}
                    {policyList && policyList.user.firstName}{" "}
                    {policyList && policyList.user.lastName}
                  </b>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="table-data">
                  <span class="text-blue">Policy</span>
                  <b>{policyList && policyList.policy.policyName}</b>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                <div class="table-data">
                  <span class="text-blue">Location</span>
                  <b>{policyList && policyList.policy.location}</b>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="table-data">
                  <span class="text-blue">Policy type</span>
                  <b>{policyList && policyList.policy.policyType}</b>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-3">
                <div class="table-data">
                  <span class="text-blue">Start Date & Time</span>
                  <b>{policyList && policyList.createdAt}</b>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-6 col-lg-4">
                <div class="table-data">
                  <span class="text-blue">End Date & Time</span>
                  <b>{policyList && policyList.updatedAt}</b>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-data">
                  <span class="text-blue">Policy Description</span>
                  <p>{policyList && policyList.policy.description}</p>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="table-data mt-4">
                  <span class="text-blue">Terms & Conditions</span>
                  <p>{policyList && policyList.terms}</p>
                  {/* <ul class="ml-4 p-0">
                                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero natus vero, maxime dolores numquam.</li>
                                                    <li>Dolor fuga autem nemo beatae earum delectus, cum neque tenetur fugit, at quibusdam quae pariatur.</li>
                                                    <li>Quod libero natus vero, maxime dolores numquam dolor fuga autem nemo beatae earum delectus.</li>
                                                </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDetails;
