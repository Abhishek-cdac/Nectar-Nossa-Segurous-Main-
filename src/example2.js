<div id="layoutSidenav_content">
<main>
    <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-between">
            <div className="col-lg-12 text-left">
                <div className="breadcrumb-custom mt-4 mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Settings</li>
                    </ol>
                </div>
            </div>
        </div>


        <div className="row d-flex align-items-center justify-content-between">
            <div className="col-lg-12 text-left">
                <h3 className="mt-0 mb-4">Profile Settings</h3>
            </div>
        </div>

        <div className="row d-flex align-items-center justify-content-between border-bottom">
            <div className="col-12 text-left">
                <ul className="nav nav-tabs table-nav" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="change-password-tab" data-toggle="tab" href="#change-password" role="tab" aria-controls="change-password" aria-selected="true">Change Password</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="manage-notification-tab" data-toggle="tab" href="#manage-notification" role="tab" aria-controls="manage-notification" aria-selected="false">Manage Notification</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="tab-content table-custome mt-3" id="myTabContent">
            <div className="tab-pane fade show active" id="change-password" role="tabpanel" aria-labelledby="change-password-tab">
                <form className="col-12 col-xl-4 col-12">
                    <div className="form-group">
                        <label for="Old-Password" className="col-form-label">Old Password <em className="text-red">*</em></label>
                        <input type="text" className="form-control" id="" placeholder="Enter Old Password"/>
                    </div>
                    <div className="form-group">
                        <label for="Old-Password" className="col-form-label">New Password <em className="text-red">*</em></label>
                        <input type="text" className="form-control" id="" placeholder="Enter New Password"/>
                    </div>
                    <div className="form-group mb-4">
                        <label for="Old-Password" className="col-form-label">Confirm New Password <em className="text-red">*</em></label>
                        <input type="text" className="form-control" id="" placeholder="Confirm New Password"/>
                    </div>
                    <button type="button" className="btn btn-primary-claim small-btn mb-2">Update Password</button>
                    <button type="button" className="btn btn-back small-btn mb-2">Cancel</button>
                </form>
            </div>
            <div className="tab-pane fade" id="manage-notification" role="tabpanel" aria-labelledby="manage-notification-tab">
                <div className="faq-custom">
                    <div className="accordion" id="faq">
                        <div className="card">
                            <div className="card-header" id="faqhead1">
                                <a href="#" className="btn btn-header-link" data-toggle="collapse" data-target="#faq1"
                                aria-expanded="true" aria-controls="faq1">Premium Received Notifications</a>
                            </div>
    
                            <div id="faq1" className="collapse show" aria-labelledby="faqhead1" data-parent="#faq">
                                <div className="card-body form-custom">
                                    <div className="row mb-3">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications on your e-mail</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications text message on mobile</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="faqhead2">
                                <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq2"
                                aria-expanded="true" aria-controls="faq2">Email Notifications</a>
                            </div>
    
                            <div id="faq2" className="collapse" aria-labelledby="faqhead2" data-parent="#faq">
                                <div className="card-body form-custom">
                                    <div className="row mb-3">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications on your e-mail</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications text message on mobile</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="faqhead3">
                                <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq3"
                                aria-expanded="true" aria-controls="faq3">About New listed policies</a>
                            </div>
    
                            <div id="faq3" className="collapse" aria-labelledby="faqhead3" data-parent="#faq">
                                <div className="card-body form-custom">
                                    <div className="row mb-3">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications on your e-mail</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications text message on mobile</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="faqhead4">
                                <a href="#" className="btn btn-header-link collapsed" data-toggle="collapse" data-target="#faq4"
                                aria-expanded="true" aria-controls="faq4">Offers</a>
                            </div>
    
                            <div id="faq4" className="collapse" aria-labelledby="faqhead4" data-parent="#faq">
                                <div className="card-body form-custom">
                                    <div className="row mb-3">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications on your e-mail</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                            <span>Premium received notifications text message on mobile</span>
                                        </div>
                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                            <div className="vc-toggle-container">
                                                <label className="vc-switch">
                                                  <input type="checkbox" className="vc-switch-input" />
                                                  <span className="vc-switch-label" data-on="Yes" data-off="No"></span>
                                                  <span className="vc-handle"></span>
                                                </label>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
</div>
