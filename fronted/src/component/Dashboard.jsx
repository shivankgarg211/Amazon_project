import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='container-fluid'>
    <div className='row flex-nowrop'>
      <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary' >
          <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100'>
              {/* <Link 
                  to="/dashboard"
                  className='d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none'>
              </Link> */}
              

                <ul style={{marginTop:'100px'}}>

                  

                  <li className='w-100'>
                      <Link 
                      to="/category"
                      className='nav-link px-0 align-middle text-white'
                      >
                          <i className='fs-4 bi-columns ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>
                              Catagory
                          </span>
                      </Link>
                  </li>

                  <li className='w-100' style={{marginTop:'50px'}}>
                      <Link 
                      to="/product"
                      className='nav-link px-0 align-middle text-white'
                      >
                          <i className='fs-4 bi-person ms-2'></i>
                          <span className='ms-2 d-none d-sm-inline'>
                              Product
                          </span>
                      </Link>
                  </li>

                  

              </ul>  
          </div>
      </div>

       <div className='col p-0 m-0'>
          <div className='p-2 d-flex justify-content-center text-white bg-secondary'>
              <h4>Amazon</h4>
          </div>
          <Outlet />
      </div> 

    </div>
</div>

  )
}

export default Dashboard;
