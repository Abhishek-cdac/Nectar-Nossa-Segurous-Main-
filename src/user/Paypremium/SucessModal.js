import React from "react";
import "./UserPolicy.style.css";
import invoice from "../../images/invoice.png"
import { useNavigate } from "react-router-dom";


const SucessModal = () => {

  let navigate = useNavigate();
  return (

          <div className="invoice-start-box">
      <div
        
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document" style={{paddingTop:"50px"}}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="invoice-star">
                <img src={invoice} alt="" width="20px"/>
              </div>
              <h2>Premium Paid successfully</h2>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={()=>navigate("user/paypremium")}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
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
