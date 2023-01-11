import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Alert } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const history = useNavigate();

  function logout(){
    localStorage.removeItem('adminToken')
    setTimeout(()=>{

        history('/')
        window.location.reload()
    },1500)
  }
  return (

    <div style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly',
      backgroundColor: 'black', flexWrap:'wrap',padding:10
    }}>
      <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to="/admin/index">Excel Report</Link>
      <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to="/in-trouble">In Trouble</Link>
      <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to="/completed">Completed</Link>
      <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to="/for-handling">For Handling</Link>
      <Link style={{textDecoration:'none', fontSize:22, color: 'white'}} to="/add-data">Add Data</Link>
      {/* <h2>Add Data</h2> */}
      {/* <Button color='primary'>Check</Button> */}
      <div>
        <Button
          color="primary"
          onClick={()=>logout()}
        >
          Log Out
        </Button>
      </div>
    </div>
  )
}

export default AdminNavbar