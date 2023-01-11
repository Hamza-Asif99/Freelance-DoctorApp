import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Forgotpassword from './components/auth/Forgotpassword';
import Admin from './components/admin/Admin';
import Customer from './components/Customer';
import AddForm from './components/AddForm';
import ForHandling from './components/admin/ForHandling';
import InTrouble from './components/admin/InTrouble';
import Completed from './components/admin/Completed';
import SpecificData from './components/admin/EditData';
// import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route>
//           <Route index element={<Login />} />
//           <Route path="signup" element={<Signup />} />
//           <Route path="forgotpassword" element={<Forgotpassword />} />
//           <Route path="admin/index" element={<Admin />} />
//           <Route path="customer/index" element={<Customer />} />
//           <Route path="add-data" element={<AddForm/>} />
//           <Route path="for-handling" element={<ForHandling/>} />
//           <Route path="completed" element={<Completed/>} />
//           <Route path="in-trouble" element={<InTrouble/>} />
//           <Route path="specific-data/:id" element={<SpecificData/>} />

//         </Route>
//       </Routes>


//     </BrowserRouter>
//   </React.StrictMode>
// );
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="admin/index" element={<Admin />} />
          <Route path="customer/index" element={<Customer />} />
          <Route path="add-data" element={<AddForm />} />
          <Route path="for-handling" element={<ForHandling />} />
          <Route path="completed" element={<Completed />} />
          <Route path="in-trouble" element={<InTrouble />} />
          <Route path="specific-data/:id" element={<SpecificData />} />

        </Route>
      </Routes>


    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
