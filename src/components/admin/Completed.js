import React, { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import AdminNavbar from '../navbars/AdminNavbar'
import URL from '../../URL'
import { Card, CardBody, CardHeader, CardTitle, CardText } from 'reactstrap'
import { useNavigate, Link } from "react-router-dom";
import Lottie from 'lottie-react'
import emptyAnimation from '../../assets/68796-empty-search.json'

const Completed = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("customer_name")

    const history = useNavigate();
    useLayoutEffect(()=>{
        document.body.style.backgroundColor = '#212529'
    })
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('adminToken'))
        if (token == null) {
            history("/")
        }
        else {
            axios.get(`${URL}/data/completed`)
                .then((res) => {
                    console.log(res.data)
                    setData(res.data.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <div >

            <div >

                <AdminNavbar />
                <div className='d-flex justify-content-between align-items-center me-5'>

                    <h2 className='text-light m-4'>Completed</h2>
                    <input
                        type="text"
                        placeholder='Search'
                        style={{
                            width: '30%', padding: '5px'
                            , borderRadius: '10px'
                        }}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <div>

                        <label style={{ color: 'white', padding: '10px' }}>Search By</label>
                        <select
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value='customer_name'>Customer Name</option>
                            <option value='customer_address'>Customer Address</option>
                            <option value='customer_comments'>Comments</option>
                        </select>
                    </div>
                </div>


                <div className='d-flex justify-content-center align-items-center flex-wrap'>

                    {
                        !loading ?
                            data.length > 0 ?

                                data.map((item) => {
                                    let date = new Date(item.createdAt)
                                    if (item[filter].toLowerCase().includes(search)) {
                                        return (
                                            <Link to={'/specific-data/' + item._id} style={{
                                                width: '90%',
                                                textDecoration: 'none'
                                            }}>
                                                <Card
                                                    className="m-4"
                                                    // color="primary"
                                                    inverse
                                                    style={{
                                                        // width: '18rem'
                                                        width: '100%'
                                                    }}
                                                    key={item._id}
                                                >
                                                    <CardHeader
                                                        style={{ color: 'black' }}
                                                    >
                                                        {date.toDateString()}
                                                    </CardHeader>
                                                    <CardBody
                                                        style={{ color: 'black' }}
                                                    >
                                                        <CardTitle tag="h5">

                                                            {item.customer_name}
                                                        </CardTitle>
                                                        <CardText>
                                                            {item.customer_comments}
                                                        </CardText>
                                                    </CardBody>
                                                </Card>
                                            </Link>
                                        )
                                    }
                                })
                                :
                                <>
                                    <h2 style={{ color: 'white' }}>No "Completed" Data Found</h2>
                                    <Lottie animationData={emptyAnimation} />
                                </>
                            :
                            <h2>Loading</h2>
                    }
                </div>

            </div>
        </div>

    )
}

export default Completed