import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Route, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
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
import AdminNavbar from '../navbars/AdminNavbar';

import URL from '../../URL'

const EditData = () => {
  let { id } = useParams()
  const history = useNavigate()
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("in handling");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("");

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('adminToken'))
    if(token != undefined){

      axios.get(`${URL}/data/get-data/${id}`)
      .then(res => {
        let data = res.data.item
        setCustomerName(data.customer_name)
        setPhone(data.customer_phone)
        setAddress(data.customer_address)
        setComments(data.customer_comments)
        // setStatus(data.customer_states)
      })
      .catch(err => console.log(err))
    }
    else{
      history('/')
    }
  }, [])

  function changeStatus(e) {  
    console.log(e.target.value)
    setStatus(e.target.value)
  }
  const editData = () => {
    var data = {
      name: `${customerName}`,
      phone: `${phone}`,
      address: `${address}`,
      comments: `${comments}`,
      status: `${status}`,
    };
    console.log(data)
    axios
      .post(`${URL}/data/edit/${id}`, data)
      .then((res) => {
        if (res.data.hasOwnProperty("success")) {
          setShowAlert(true);
          setAlertColor("primary");
          setAlertMessage("Edited Successfully");

          setTimeout(() => {

            history("/admin/index");
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

  return (
    <div>

      <AdminNavbar />
      <div
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'

        }} className="bg-dark flex flex-column"
      >
        <Col lg="5" md="7">
          {showAlert ? <Alert color={alertColor}>{alertMessage}</Alert> : ""}

          <Card className=" shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <p className="text-center font-weight-bold h2 m-2">
                Edit Data
              </p>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">

              <Form role="form" className="text-center">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative d-flex justify-content-between">
                    <label style={{ fontWeight: 'bold' }}>Edit Status</label>
                    <select onChange={(e) => changeStatus(e)} className='w-50 p-2' style={{ borderRadius: 5 }}>
                      <option value="in handling">For Handling</option>
                      <option value="in trouble">In Trouble</option>
                      <option value="completed">Completed</option>
                    </select>
                  </InputGroup>
                </FormGroup>
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
                    onClick={() => editData()}

                  >
                    Submit Edit
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

export default EditData