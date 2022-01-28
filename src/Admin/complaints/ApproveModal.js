import React from "react";
import './Style.css';


const ApproveModal = (props) =>{
    return(
        <div class="invoice-start-box">
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="invoice-star">
                            <img src="images/invoice-star.png" alt="" width="20px" />
                        </div>
                        <h2>sent to </h2>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" handleBack={props.handleBack}>Done</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ApproveModal;