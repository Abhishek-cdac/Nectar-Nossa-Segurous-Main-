import React from "react";
import './Style.css';


const ApproveModal = (props) =>{
    return(
        <div className="invoice-start-box">
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="invoice-star">
                            <img src="images/invoice-star.png" alt="" width="20px" />
                        </div>
                        <h2>sent to </h2>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" handleBack={props.handleBack}>Done</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default ApproveModal;