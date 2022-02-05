import React from "react";
// import "./UserPolicy.style.css";
import invoice from "../../images/invoice.png"

const SerSucessModal = (props) => {
  return (

          <div class="invoice-start-box">
      <div
        
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-body">
              <div class="invoice-star">
                <img src={invoice} alt="" width="20px" />
              </div>
              <h2>Invoice Request Placed successfully</h2>
            </div>
            <div class="modal-footer">
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button> */}
              <button type="button" class="btn btn-primary" onClick={props.handleBack}>
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SerSucessModal;
