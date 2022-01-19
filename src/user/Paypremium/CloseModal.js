import React from "react";
 import "./UserPolicy.style.css";


const CloseModal = () =>{
    return(
        <div class="invoice-start-box">
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="invoice-star">
                            <img src="images/invoice-star.png" alt="" width="20px" />
                        </div>
                        <h2>Policy Closed</h2>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Download Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default CloseModal;