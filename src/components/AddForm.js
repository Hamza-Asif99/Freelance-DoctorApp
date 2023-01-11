import React, { useState, useEffect, useRef } from 'react'
// import URL from "../../URL";
import URL from '../URL';
import { QrReader } from 'react-qr-reader';

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

import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AdminNavbar from './navbars/AdminNavbar';
import CustomerNavbar from './navbars/CustomerNavbar';

const AddForm = () => {

    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [comments, setComments] = useState("");
    const [displayBTN, setDisplayBTN] = useState(true)
    const [data, setData] = useState('No result');
    const [showReader, setShowReader] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertColor, setAlertColor] = useState("");
    const [userType, setUserType] = useState("");

    const ref = useRef(null);

    const history = useNavigate();

    // window.location.reload()
    useEffect(() => {
        let adminToken = JSON.parse(localStorage.getItem('adminToken'))
        let customerToken = JSON.parse(localStorage.getItem('customerToken'))
        let val = JSON.parse(localStorage.getItem("camera"))
        if (val != undefined) {
            setCustomerName(val)
            localStorage.removeItem('camera')
        }
        if (adminToken == null && customerToken == null) {
            history("/")
        }
        else if (adminToken != null) {
            setUserType("admin")
        } else if (customerToken != null) {
            setUserType("customer")
        }

    }, [])

    const addData = () => {
        var data = {
            name: `${customerName}`,
            phone: `${phone}`,
            address: `${address}`,
            comments: `${comments}`
        };

        axios
            .post(`${URL}/data/add`, data)
            .then((res) => {
                if (res.data.hasOwnProperty("success")) {
                    setShowAlert(true);
                    setAlertColor("primary");
                    setAlertMessage("Added Successfully");

                    setTimeout(() => {
                        if (userType != "customer") {

                            history("/admin/index");
                        }
                    }, 1500)

                } else {

                    setShowAlert(true);
                    setAlertColor("danger");
                    setAlertMessage("Something Went Wrong");
                }
                console.log(res);
            })
            .catch((err) => {
                setShowAlert(true);
                setAlertColor("danger");
                setAlertMessage("Something Went Wrong");
            }
            );
    }

    const closeCam = async (result) => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        stream.getTracks().forEach(function (track) {
            track.stop();
            track.enabled = false;
        });
        setShowReader(false)
        // ref.current.stopCamera()
        localStorage.setItem("camera", JSON.stringify(result))
        setShowAlert(true)
        setAlertColor('success')
        setAlertMessage("Code Scanned")
        setTimeout(()=>{

            window.location.reload()
        },2000)
    };

    return (
        <div className='bg-dark'>

            {
                userType == "admin" ?
                    <AdminNavbar />
                    :
                    <CustomerNavbar />
            }

            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'

            }} className="bg-dark flex flex-column">
                {showReader &&
                    <div style={{ width: '15%', }} className="bg-dark mt-3">
                        <QrReader
                            onResult={(result, error) => {
                                if (result) {
                                    console.log("result")
                                    setData(result.text);
                                    closeCam(result.text)
                                }

                                if (error) {
                                    console.log("error")
                                }
                            }}
                            style={{ width: '200', height: '200' }}
                        />
                    </div>

                }
                {displayBTN ?
                    <Button
                        onClick={() => {setShowReader(true); setDisplayBTN(false)}}
                        color='primary m-2'
                    >Scan Code</Button>
                    :
                    <Button
                        onClick={() => {window.location.reload()}}
                        color='danger m-2'
                    >Close Video</Button>
                }
                <Col lg="5" md="7">
                    {showAlert ? <Alert color={alertColor}>{alertMessage}</Alert> : ""}
                    {/* <Button>Scan Code</Button> */}
                    <Card className=" shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <p className="text-center font-weight-bold h2 m-2">
                                Add Data
                            </p>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            {/* <div className="text-center text-muted mb-4">
                            <small>Sign in with your credentials</small>
                        </div> */}
                            <Form role="form" className="text-center">
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            required
                                            value={customerName}
                                            placeholder="Customer Name"
                                            type="text"
                                            onChange={(e) => setCustomerName(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="text-end">
                                    <InputGroup className="input-group-alternative mb-2">

                                        <Input
                                            required
                                            value={phone}
                                            placeholder="Customer Phone"
                                            type="text"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="text-end">
                                    <InputGroup className="input-group-alternative mb-2">

                                        <Input
                                            required
                                            value={address}
                                            placeholder="Customer Address"
                                            type="text"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="text-end">
                                    <InputGroup className="input-group-alternative mb-2">
                                        <Input
                                            required
                                            value={comments}
                                            placeholder="Comments"
                                            type="text"
                                            onChange={(e) => setComments(e.target.value)}
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
                                        onClick={() => addData()}
                                    >
                                        Submit Data
                                    </Button>

                                </div>

                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                    </Row>
                </Col>
            </div>
        </div>

    )
}

export default AddForm