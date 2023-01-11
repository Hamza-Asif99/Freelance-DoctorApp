// reactstrap components
import React from "react";
import URL from "../../URL";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    // InputGroupAddon,
    // InputGroupText,
    InputGroup,
    Row,
    Col,
    Alert,
} from "reactstrap";

import { useState } from "react";

const Forgotpassword = () => {
    const [email, setEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");

    const resetPassword = () => {
        var data = {
            email: `${email}`,
        };
        
        axios
            .post(`${URL}/user/forgot-password`, data)
            .then((res) => {
                if (res.data.hasOwnProperty("success")) {
                    setShowAlert(true);
                    setAlertColor("primary");
                    setAlertMessage(res.data.success);

                    setTimeout(() => {
                        //   history.push("/");
                    }, 2500);
                } else {

                    setShowAlert(true);
                    setAlertColor("danger");
                    setAlertMessage(res.data.error);
                }
                console.log(res);
            })
            .catch((err) => {
                setShowAlert(true);
                setAlertColor("danger");
                setAlertMessage("Enter Valid Credentials");
            } 
            );
    };

    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'

        }} className="bg-dark flex flex-column">

            {/* <h2 className="text-light p-4 m-4">Welcome!</h2> */}
            <Col lg="5" md="7">
                {showAlert ? <Alert color={alertColor}>{alertMessage}</Alert> : ""}

                <Card className=" shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <p className="text-center font-weight-bold h4 m-2">
                            Please Enter Account Email
                        </p>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Check your email for the link to reset your password.</small>
                        </div>
                        <Form role="form" className="text-center">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                   
                                    <Input
                                        value={email}
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            
                           
                            <div className="text-center">
                                <Button
                                    className="mb-3 mt-3"
                                    color="primary"
                                    type="button"
                                    style={{ width: "100%" }}
                                    onClick={() => resetPassword()}
                                >
                                    Submit
                                </Button>
                              
                            </div>

                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">

                    {/* <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot Password?</small>
              </a>
            </Col> */}
                </Row>
            </Col>
        </div>
    );
};

export default Forgotpassword;
