import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import invoicestar from "../.././assets/img/invoicestar.png"

const setSucess = (props) => {
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
                <img src={invoicestar} alt="" width="20px" />
              </div>
              <h2>Password Updated Sucessfully</h2>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={props.handleback}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default setSucess;
