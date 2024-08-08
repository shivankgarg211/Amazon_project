import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
let apiURL = 'http://localhost:6767/api/category';

function Category() {
  const [data, setData] = useState([])
  const [c_id, setC_id] = useState("");
  const [c_name, setC_name] = useState("");
  const [newname, setNewname] = useState("");
  const [newid, setNewid] = useState("");
  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //  get api

  async function getData() {
    let result = await fetch(apiURL)
    let finaldata = await result.json()
    console.log(finaldata)
    setData(finaldata)
  }
  console.log(data)
  useEffect(() => {
    getData()
  }, [])

  //  post api

  async function saveData() {
    console.log(c_id, c_name)
    let userdata = {
      "c_id": c_id,
      "c_name": c_name
    }
    let option = {
      method: "POST",
      body: JSON.stringify(userdata),
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    let response = await fetch(apiURL, option)
    let res = await response.json();
    if (res.affectedRows > 0)
      alert("Record Inserted Successfully")
    else
      alert("server busy/nTry again!!!")
    console.log(res)
    console.log(saveData)
  }

  // delete api

  async function deleteData(c_id) {
    console.log(c_id)
    let response = await fetch(`http://localhost:6767/api/category/${c_id}`, {
      method: "DELETE",
      
    })
    let res = await response.json()
    console.log(res)
    if (res.affectedRows === 1) {
      getData()
    }
    else {
      alert('Data not deleted!!!')
    }
  }

  //put api 
  async function updateCategory(a, b) {
    console.log(a, b)
    setNewid(a)
    setNewname(b)
    handleShow()
  }
  let userData = {
    c_id: newid,
    c_name: newname
  }
  let option = {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
     
    }
  }
  async function updateData() {
    let apiURL = `http://localhost:6767/api/category/${newid}`
    let response = await fetch(apiURL, option)
    let result = await response.json()
    console.log(result)
    getData()
    handleClose()
    
  }

  return (
    <div className='container justify-space-between justify-content-between' style={{ display: 'flex', flexDirection: 'row', marginTop: '20vh' }}>
      <div>
        <div className='p-3 rounded border' style={{ backgroundColor: '#F6ECA9', marginLeft: '40vh' }}>
          <h2>Category</h2>
          <form >
            <div className=' col-12 mb-3'>
              <label htmlFor='categoryid'>Category Id:</label>
              <input value={c_id} onChange={(e) => setC_id(e.target.value)} type='text' name='category id' placeholder='Enter Category id'
              />
            </div>
            <div className=' col-12 mb-3'>
              <label htmlFor='categoryid'>Category name:</label>
              <input value={c_name} onChange={(e) => setC_name(e.target.value)} type='text' name='category name' placeholder='Enter Category name'
              />
            </div>
            <Button className=' col-12 btn btn-success w-100 rounded-15 mb-2' onClick={() => saveData()}>Add Category</Button>
          </form>
        </div>
      </div>

      <div style={{ width: '50vh' }}>
        <header>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>c_id</th>
                <th>c_name</th>
                <th>Action</th>
              </tr>
            </thead>
            {
              data.map((d, ind) => {
                return (
                  <tbody>
                    <tr>
                      <td>{d.c_id}</td>
                      <td>{d.c_name}</td>
                      <td> <Button variant='success'> <i onClick={() => updateCategory(d.c_id, d.c_name)} class="bi bi-pencil"></i></Button>
                        <Button variant='danger'> <i onClick={(e) => deleteData(d.c_id)} className="bi bi-trash" style={{ marginLeft: '20px' }}></i>
                        </Button></td>
                    </tr>
                  </tbody>
                )
              })
            }
          </Table>
        </header>
      </div>

    </div>
  )
}

export default Category





