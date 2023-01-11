import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AddForm from './AddForm';
import CustomerNavbar from './navbars/CustomerNavbar';

const Customer = () => {
  const history = useNavigate();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('customerToken'))
    console.log(token)
    if (token == null) {
      history("/")
    }
  }, [])
  return (
    <div>
      <AddForm/>
      {/* <div>Customer</div> */}
    </div>
  )
}

export default Customer