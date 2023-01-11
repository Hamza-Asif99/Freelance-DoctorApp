import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import AdminNavbar from '../navbars/AdminNavbar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import URL from '../../URL';
import { Card, CardBody, CardHeader, CardTitle, CardText, Button } from 'reactstrap'
import { CSVLink } from "react-csv";
import { FaDownload } from "react-icons/fa"
import Lottie from 'lottie-react'
import emptyAnimation from '../../assets/68796-empty-search.json'

const Admin = () => {
    const [months, setMonths] = useState([])
    const [monthData, setMonthData] = useState([])
    const [loading, setLoading] = useState(true)
    const clickCSVLink = useRef([])


    const history = useNavigate();

    const headers = [
        { label: "Customer Name", key: "customer_name" },
        { label: "Customer Phone", key: "customer_phone" },
        { label: "Customer Address", key: "customer_address" },
        { label: "Customer Comments", key: "customer_comments" },
        { label: "Customer Status", key: "customer_status" },
    ];
    useLayoutEffect(() => {
        document.body.style.backgroundColor = '#212529'
    })
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('adminToken'))
        if (token == null) {
            history("/")
        }
        else {
            setLoading(false)
        }
        getDates()
    }, [])

    function getDates() {
        axios.get(`${URL}/data/get-dates`)
            .then((res) => {
                console.log(res.data)
                setMonths(res.data.dates)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function getMonthData(date, index) {
        axios.get(`${URL}/data/get-month-data/${date}`)
            .then((res) => {
                console.log(res.data)
                console.log(res.data.monthData)
                setMonthData(res.data.monthData)
                if (res.data.monthData.length == 0) {
                    alert("This Month Has No 'Completed' Data")
                }
                else {
                    setTimeout(() => {
                        clickCSVLink.current[index].link.click();
                    }, 2000)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    let monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]

    return (
        <div className='bg-dark'>
            {!loading &&
                <div className='bg-dark'>
                    <AdminNavbar />
                    <h2 className='text-light m-4'>Excel Report Download</h2>

                    <div className='d-flex justify-content-center align-items-center flex-wrap'>

                        {
                            months.length > 0 ?
                                months.map((item, index) => {
                                    console.log(item)
                                    let date = new Date(item)
                                    console.log(date)
                                    return (
                                        <Card
                                            className="m-4"
                                            color="success"
                                            inverse
                                            style={{
                                                // width: '18rem'
                                                width: '85%'
                                            }}
                                            key={index}
                                        >
                                            <CardHeader>
                                                {monthsOfTheYear[date.getMonth()]}
                                            </CardHeader>
                                            <div className='d-flex justify-content-between'>

                                                <CardBody>
                                                    <CardTitle tag="h5">
                                                        Data for {monthsOfTheYear[date.getMonth()]} {date.getFullYear()}
                                                    </CardTitle>
                                                    <CardText>
                                                        Click On The Download Button To Get Excel File
                                                    </CardText>
                                                </CardBody>

                                                <FaDownload
                                                    onClick={() => getMonthData(item, index)}
                                                    size={35}
                                                    className="m-4"
                                                    onMouseOver={(e) => e.target.style.color = "lightgrey"}
                                                    onMouseOut={(e) => e.target.style.color = "white"}
                                                />
                                            </div>
                                            {/* <Button
                                                onClick={() => getMonthData(item, index)}
                                                className="bg-primary"
                                            >
                                                Download
                                            </Button> */}

                                            <CSVLink
                                                style={{ display: "none" }}
                                                data={monthData}
                                                headers={headers}
                                                key={index}
                                                filename={`${monthsOfTheYear[date.getMonth()]} ${date.getFullYear()}.csv`}
                                                ref={(ele) => clickCSVLink.current[index] = ele}
                                            >

                                                Download
                                            </CSVLink>
                                        </Card>
                                    )
                                })
                                :
                                <>
                                    <h2 style={{ color: 'white' }}>No Data Found</h2>
                                    <Lottie animationData={emptyAnimation} />
                                </>
                        }
                    </div>
                    {/* <div>Admin</div> */}
                </div>
            }
        </div>

    )
}

export default Admin