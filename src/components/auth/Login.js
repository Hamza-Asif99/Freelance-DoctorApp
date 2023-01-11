// reactstrap components
import React from "react";
import URL from "../../URL";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Row,
    Col,
    Alert,
} from "reactstrap";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");

    const history = useNavigate();

    const signIn = () => {
        var data = {
            email: `${email}`,
            password: `${pass}`,
        };

        axios
            .post(`${URL}/user/login`, data)
            .then((res) => {
                if (res.data.hasOwnProperty("success")) {
                    setShowAlert(true);
                    setAlertColor("primary");
                    setAlertMessage("Login Successful");

                    if(res.data.is_admin){
                        setTimeout(() => {
                            localStorage.setItem("adminToken", JSON.stringify(res.data));
                            localStorage.removeItem("customerToken");
                            history("/admin/index");
                        }, 1500);
                    }else{
                        setTimeout(()=>{
                            localStorage.setItem("customerToken", JSON.stringify(res.data));
                            localStorage.removeItem("adminToken");
                            history("/customer/index")
                        },1500)
                    }
                } else {

                    setShowAlert(true);
                    setAlertColor("danger");
                    setAlertMessage("Enter Valid Credentials");
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

            <Col lg="5" md="7">
                {showAlert ? <Alert color={alertColor}>{alertMessage}</Alert> : ""}

                <Card className=" shadow border-0">
                    <CardHeader className="bg-transparent pb-5">
                        <p className="text-center font-weight-bold h4 m-2">
                            Welcome!
                        </p>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center text-muted mb-4">
                            <small>Sign in with your credentials</small>
                        </div>
                        <Form role="form" className="text-center">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                 
                                    <Input
                                        required
                                        value={email}
                                        placeholder="Email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
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
                                <Link
                                    to="forgotpassword"
                                    className="text-dark"
                                >
                                    <small>Forgot password?</small>
                                </Link>
                            </FormGroup>
                            <div className="custom-control custom-control-alternative custom-checkbox">
              
                            </div>
                            <div className="text-center">
                                <Button
                                    className="mb-3"
                                    color="primary"
                                    type="button"
                                    style={{ width: "100%" }}
                                    onClick={() => signIn()}
                                    
                                >
                                    Sign in
                                </Button>
                                <small>Don't Have An Account?</small>
                                <Link
                                    to="/signup"
                                    className="text-dark"
                                >
                                    
                                    <small className="p-2">Create Account</small>
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

export default Login;
