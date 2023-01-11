import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';

const CustomerNavbar = () => {
  const history = useNavigate()
  return (
    <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
        backgroundColor: 'black', padding:10
      }}>
        
        <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to={'/add-data'}>Add Data</Link>
        {/* <Button color='primary'>Check</Button> */}
        <div>
          <Button
            color="primary"
            onClick={()=>
              {
                localStorage.removeItem('customerToken')
                setTimeout(()=>{

                  history('/')
              },1500)
              }}

          >
            Log Out
          </Button>
        </div>
      </div>
  )
}

export default CustomerNavbar