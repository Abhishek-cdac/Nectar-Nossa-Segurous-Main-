import React ,{useState} from "react";
import { Card, Row, Col, Button, Tabs, Divider } from "antd";
import { ArrowRightOutlined, ArrowDownOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const { TabPane } = Tabs;

export default function Dashboard() {
  const [show,setShow] = useState(false)
  const mouseHover = () => setShow(prev => !prev)
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <h2>Dashboard</h2>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Card  
              actions={ show ? [
               <div>
                 <p> nagasai nassso </p>
                </div> 
              ] : null}
              //  extra={show ? <Button type="link"> Download </Button> : null}
              onMouseEnter={mouseHover}
              onMouseLeave={mouseHover}>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Active</div>
                      <div>Policies</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#61b33b",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  {show ? <ArrowDownOutlined style={{ color: "#61b33b" }}/> : <ArrowRightOutlined style={{ color: "#61b33b" }} /> }
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Payment</div>
                      <div>History</div>
                    </Col>
                    <Col span={4}></Col>
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  <ArrowRightOutlined style={{ color: "#61b33b" }} />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Your</div>
                      <div>Claims</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#61b33b",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  <ArrowRightOutlined style={{ color: "#61b33b" }} />
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div>
                  <Row>
                    <Col span={20}>
                      <div>Service</div>
                      <div>Requests</div>
                    </Col>
                    <Col
                      span={4}
                      style={{
                        color: "#61b33b",
                        fontSize: "24px",
                        fontWeight: 600,
                      }}
                    >
                      05
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div style={{ float: "right" }}>
                  <ArrowRightOutlined style={{ color: "#61b33b" }} />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ margin: "20px" }}>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={14}>
              <Card>
                <Row gutter={16}>
                  <Col span={20}>
                    <h4>My Policies</h4>
                  </Col>
                  <Col span={4}>
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#61b33b",
                      }}
                    >
                      View All
                    </span>
                  </Col>
                </Row>
              </Card>
              <Card
                style={{
                  backgroundColor: "#F5F5F5",
                  fontSize: "12px",
                }}
              >
                <Row gutter={16}>
                  <Col span={10}>
                    <div>Accidents at Work</div>
                    <div style={{ color: "#61B33B" }}>
                      {" "}
                      Policy Number : NS00011122
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>Due Date:</div>
                    <div style={{ color: "#61B33B" }}>20th April 2021</div>
                  </Col>
                  <Col span={6}>
                    <div>Premium</div>
                    <div style={{ color: "#61B33B" }}>$ 2500 / Month</div>
                  </Col>
                  <Col span={2}>...</Col>
                </Row>
              </Card>
              <Card
                style={{
                  backgroundColor: "#F5F5F5",
                  fontSize: "12px",
                }}
              >
                <Row gutter={16}>
                  <Col span={10}>
                    <div>Accidents at Work</div>
                    <div style={{ color: "#61B33B" }}>
                      {" "}
                      Policy Number : NS00011122
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>Due Date:</div>
                    <div style={{ color: "#61B33B" }}>20th April 2021</div>
                  </Col>
                  <Col span={6}>
                    <div>Premium</div>
                    <div style={{ color: "#61B33B" }}>$ 2500 / Month</div>
                  </Col>
                  <Col span={2}>...</Col>
                </Row>
              </Card>
              <Card
                style={{
                  backgroundColor: "#F5F5F5",
                  fontSize: "12px",
                }}
              >
                <Row gutter={16}>
                  <Col span={10}>
                    <div>Accidents at Work</div>
                    <div style={{ color: "#61B33B" }}>
                      {" "}
                      Policy Number : NS00011122
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>Due Date:</div>
                    <div style={{ color: "#61B33B" }}>20th April 2021</div>
                  </Col>
                  <Col span={6}>
                    <div>Premium</div>
                    <div style={{ color: "#61B33B" }}>$ 2500 / Month</div>
                  </Col>
                  <Col span={2}>...</Col>
                </Row>
              </Card>
              <Card
                style={{
                  backgroundColor: "#F5F5F5",
                  fontSize: "12px",
                }}
              >
                <Row gutter={16}>
                  <Col span={10}>
                    <div>Accidents at Work</div>
                    <div style={{ color: "#61B33B" }}>
                      {" "}
                      Policy Number : NS00011122
                    </div>
                  </Col>
                  <Col span={6}>
                    <div>Due Date:</div>
                    <div style={{ color: "#61B33B" }}>20th April 2021</div>
                  </Col>
                  <Col span={6}>
                    <div>Premium</div>
                    <div style={{ color: "#61B33B" }}>$ 2500 / Month</div>
                  </Col>
                  <Col span={2}>...</Col>
                </Row>
              </Card>
            </Col>
            <Col span={10}>
              <Card
                style={{
                  backgroundColor: "#61b33b",
                  fontSize: "10px",
                  color: "#ffffff",
                  borderRadius: "5px",
                }}
              >
                <Row gutter={16}>
                  <Col span={3}>
                    <span>NI</span>
                  </Col>
                  <Col span={16}>
                    <span>
                      Your premium payment of $ 2500 is pending for policy
                      number of NS00011122
                    </span>
                  </Col>
                  <Col span={3}>
                    <span>
                      <Button
                        style={{
                          backgroundColor: "#00008B",
                          color: "#ffffff",
                          borderRadius: "25px",
                          border: "1px solid",
                          height: "24px",
                          width: "76px",
                          fontSize: "10px",
                        }}
                      >
                        Pay Now
                      </Button>
                    </span>
                  </Col>
                </Row>
              </Card>
              <h3>Recomended for you</h3>
              <Card>
                <Tabs tabPosition="top">
                  <TabPane tab="Recommended Policies" key="recommendedpolicies">
                    <Row>
                      <Col span={16}>
                        <div
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          Type : Vehical
                        </div>
                        <div>Noosa Seguros Auto-insurance</div>
                      </Col>
                      <Col span={4}>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#00008B",
                            color: "#ffffff",
                            borderRadius: "25px",
                            border: "1px solid",
                            height: "24px",
                            width: "50px",
                            fontSize: "10px",
                          }}
                        >
                          View
                        </Button>
                      </Col>
                      <Col span={4}>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#00008B",
                            color: "#ffffff",
                            borderRadius: "25px",
                            border: "1px solid",
                            height: "24px",
                            width: "50px",
                            fontSize: "10px",
                          }}
                        >
                          <ArrowDownOutlined />
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={16}>
                        <div
                          style={{
                            fontSize: "10px",
                          }}
                        >
                          Type : Vehical
                        </div>
                        <div>Noosa Seguros Auto-insurance</div>
                      </Col>
                      <Col span={4}>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#00008B",
                            color: "#ffffff",
                            borderRadius: "25px",
                            border: "1px solid",
                            height: "24px",
                            width: "50px",
                            fontSize: "10px",
                          }}
                        >
                          View
                        </Button>
                      </Col>
                      <Col span={4}>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#00008B",
                            color: "#ffffff",
                            borderRadius: "25px",
                            border: "1px solid",
                            height: "24px",
                            width: "50px",
                            fontSize: "10px",
                          }}
                        >
                          <ArrowDownOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tab="All Policies" key="allpolicies">
                    <Card>
                      {" "}
                      <Row>
                        <Col span={16}>
                          <div
                            style={{
                              fontSize: "10px",
                            }}
                          >
                            Type : Vehical
                          </div>
                        </Col>
                        <Col span={4}>
                          {" "}
                          <Button
                            style={{
                              backgroundColor: "#00008B",
                              color: "#ffffff",
                              borderRadius: "25px",
                              border: "1px solid",
                              height: "24px",
                              width: "76px",
                              fontSize: "10px",
                            }}
                          >
                            View
                          </Button>
                        </Col>
                        <Col span={4}></Col>
                      </Row>
                    </Card>
                    <Card style={{ margin: "5px" }}> </Card>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
