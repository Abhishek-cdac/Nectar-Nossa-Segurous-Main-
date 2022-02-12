import React from "react";
import "./UserPolicy.style.css";
import invoice from "../../images/invoice.png"
import { useNavigate } from "react-router-dom";


const SucessModal = () => {

  let navigate = useNavigate();
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
          role="document" style={{paddingTop:"50px"}}
        >
          <div class="modal-content">
            <div class="modal-body">
              <div class="invoice-star">
                <img src={invoice} alt="" width="20px"/>
              </div>
              <h2>Premium Paid successfully</h2>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={()=>navigate("user/paypremium")}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SucessModal;
