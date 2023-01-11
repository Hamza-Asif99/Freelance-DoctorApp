// reactstrap components
import React from "react";
import URL from "../../URL";
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
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//   import { URL } from "../../URL";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");

    const history = useNavigate();

    const validateData = () => {
        var re = /\S+@\S+\.\S+/;
        if (name == "" || pass == "" || email == "" || confirmPass == "") {
            setShowAlert(true);
            setAlertColor("danger");
            setAlertMessage("Please Enter All Data");
        }
        else if(!re.test(email)){
            setShowAlert(true);
            setAlertColor("danger");
            setAlertMessage("Please Enter Valid Email");
        }
        else if (pass != confirmPass) {
            setShowAlert(true);
            setAlertColor("danger");
            setAlertMessage("Password and Confirm Password fields must be the same");
        }
        else {
            signUp()
        }
    }

    const signUp = () => {
        console.log("check")
        var data = {
            email: `${email}`,
            name: `${name}`,
            password: `${pass}`,
            confirmPassword: `${confirmPass}`,
        };

        axios
            .post(`${URL}/user/signup`, data)
            .then((res) => {
                if (res.data.hasOwnProperty("success")) {
                    setShowAlert(true);
                    setAlertColor("primary");
                    setAlertMessage("Signup Successful");

                    // localStorage.setItem("token", JSON.stringify(res.data));

                    setTimeout(() => {
                        history("/");
                    }, 2500);
                } else {

                    setShowAlert(true);
                    setAlertColor("danger");
                    setAlertMessage(res.data);
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
                            Register Your Account
                        </p>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Please Enter Your Details</small>
                        </div>
                        <Form role="form" className="text-center">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative mb-3">

                                    <Input
                                        required
                                        value={name}
                                        placeholder="Name"
                                        type="text"
                                        onChange={(e) => setName(e.target.value)}
                                    // autoComplete="new-email"
                                    />
                                </InputGroup>
                                <InputGroup className="input-group-alternative">

                                    <Input
                                        required
                                        value={email}
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    // autoComplete="new-email"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="text-end">
                                <InputGroup className="input-group-alternative mb-2">

                                    <Input
                                        required
                                        value={pass}
                                        placeholder="Password"
                                        type="password"
                                        autoComplete="new-password"
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </InputGroup>
                                <InputGroup className="input-group-alternative mt-3">

                                    <Input
                                        required
                                        value={confirmPass}
                                        placeholder="Confirm Password"
                                        type="password"
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                    />
                                </InputGroup>

                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">

                            </div>
                            <div className="text-center">
                                <Button
                                    className="mb-3"
                                    color="primary"
                                    type="button"
                                    style={{ width: "100%" }}
                                    onClick={() => validateData()}
                                >
                                    Sign Up
                                </Button>

                                <small>Already Have An Account?</small>
                                <Link
                                    to="/"
                                    className="text-dark"
                                >
                                    <small className="p-2">Login Instead.</small>
                                </Link>
                            </div>

                        </Form>
                    </CardBody>
                </Card>
                <Row className="mt-3">

                </Row>
            </Col>
        </div>
    );
};

export default Signup;
