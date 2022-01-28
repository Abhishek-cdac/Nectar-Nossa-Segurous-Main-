import React from "react";
import './CardStyle.css'


const NossaCard = () =>{
    return(
        <>
        <div class="row d-flex align-items-center justify-content-between">
        <div class="col-lg-6 col-md-6 text-left">
            <h3 class="mt-3 mb-4">Nossa Card</h3>
        </div>
        <div class="col-lg-6 col-md-6 text-right">
            <div class="btn-two">
                <a href="#" class="print-card-btn">Print Card <img src="assets/img/print.png" class="img-fluid" alt=""/></a>
                <a href="#" class="download-card-btn">Download card <img src="assets/img/ic_file_download1.png" class="img-fluid" alt=""/></a>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-lg-6 col-md- col-12">
            <div class="nossa-card-front">
                <div class="row">
                    <div class="col-md-2 col-sm-2 col-12">
                        <img src="assets/img/front-card-logo.png" alt="front-card-logo" class="img-fluid pl-3 pt-4" />
                    </div>
                    <div class="col-md-10 col-sm-10 col-12">
                        <h1 class="mt-4 mb-3">Nossa Seguros</h1>
                    </div>
                </div>
                <div class="card-back-inner">
                    <div class="row">
                        <div class="col-md-4 col-sm-4 col-12">
                            <div class="person-box mt-4 mb-4">
                                <img src="assets/img/person.png" alt="person" class="img-fluid" />
                            </div>
                        </div>
                        <div class="col-md-8 col-sm-8 col-12">
                            <div class="front-card-text mt-4">
                                <p><span>NS Account No.:</span> 529698664235</p>
                                <p><span>Name:</span> 529698664235</p>
                                <p class="w-50 float-left"><span>Age:</span> 25</p>
                                <p class="w-50 float-left"><span>Gender:</span> Male</p>
                                <p><span>Address:</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
            <div class="nossa-card-back">
                <div class="row">
                    <div class="col-12">
                        <h1 class="mt-4 mb-3">Nossa Seguros Account No.: 529698664235</h1>
                    </div>
                </div>
                <div class="card-back-inner">
                    <div class="row">
                        <div class="col-md-8 col-sm-8 col-12">
                            <div class="front-card-text mt-4">
                                <h2>Disclaimer</h2>
                                <p>The standard Lorem Ipsum passage, used since the 1500s"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod<br/>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BCveritatis et quasi architecto beatae vitae dicta sunt explica</p>
                                <h2 class="mt-4">Signature</h2>
                            </div>
                        </div>
                        <div class="col-md-4 col-sm-4 col-12">
                            <div class="person-box mt-4 mb-2">
                                <img src="assets/img/qr_code_2.png" alt="person" class="img-fluid" />
                            </div>
                            <small class="text-center w-100 d-block">Printed from Nossa Member</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}
export default NossaCard