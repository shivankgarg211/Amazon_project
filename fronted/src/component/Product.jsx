import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, ModalBody } from 'react-bootstrap';


// let apiURL = 'http://localhost:6767/api/product';
function Product() {
  let apiURL = 'http://localhost:6767/api/product';
  const [data, setData] = useState([])
  const [p_id, setP_id] = useState("")
  const [p_name, setP_name] = useState("")
  const [p_price, setP_price] = useState("")
  const [p_image, setP_image] = useState("")
  const [c_id, setC_id_] = useState("")

  const [newid, setNewid] = useState('')
  const [newname, setNewname] = useState('')
  const [newprice, setNewprice] = useState('');
  const [newimage, setNewimage] = useState("");
  const [newcid, setNewcid] = useState("")
  
  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  async function getData() {
    const result = await fetch(apiURL)
    const response = await result.json()
    console.log(response)
    setData(response)
  }
  console.log(data)


  async function postData() {
    let apiurl = 'http://localhost:6767/api/product';
    let userData = {
      "p_id": p_id,
      "p_name": p_name,
      "p_price": p_price,
      "p_image": p_image,
      "c_id": c_id
    }
    let option = {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      }
    }
    let result = await fetch(apiurl, option)
    let res = await result.json()
    console.log(res)
    console.log(postData)

  }
  // delete api

  async function deleteData(p_id) {
    console.log(p_id)

    let apiURL = await fetch(`http://localhost:6767/api/product/${p_id}`, {
      method: "DELETE",
    })
    let result = await apiURL.json()
    console.log(result)
    if (result.affectedrows === 1) {
      getData()
    } else {
      alert("data deleted")
    }
  }

  async function updateProduct(a, b, c, d, aa) {
    setNewid(a)
    setNewname(b)
    setNewprice(c)
    setNewimage(d)
    setNewcid(aa)
    handleShow()
  }
  let userdata = {
    p_id: newid,
    p_name: newname,
    p_price: newprice,
    p_image: newimage,
    c_id: newcid
  }
  let option = {
    method: 'put',
    body: JSON.stringify(userdata),
    header: {
      "accept ": "application/json",
      'content-type': "application/json"
    }
  }
  async function updatedata() {
    let apiURL = `http://localhost:6767/api/product/${newid}`
    let result = await fetch(apiURL, option)
    let finaldata = await result.json()
    console.log(finaldata)
    getData()
    handleClose()
  }



  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='container justify-space-between justify-content-between' style={{ display: 'flex', flexDirection: 'row', marginTop: '20vh' }}>
      <div>
        <div className='p-3 rounded border' style={{ backgroundColor: '#F6ECA9', marginLeft: '30vh' }}>
          <h2>Product</h2>
          <form >
            <div className=' col-12 mb-3'>
              <label htmlFor='product id'>Product id :</label>
              <input value={p_id} onChange={(e) => setP_id(e.target.value)} type='text' name='product id' placeholder='Enter product id'
              />
            </div>
            <div className=' col-12 mb-3'>
              <label htmlFor='product name'> Product name:</label>
              <input value={p_name} onChange={(e) => setP_name(e.target.value)} type='text' name='product name' placeholder='Enter product name' />
            </div>
            <div className=' col-12 mb-3'>
              <label htmlFor='product price'> Product price :</label>
              <input value={p_price} onChange={(e) => setP_price(e.target.value)} type='number' name='product price' placeholder='Enter product price' />
            </div>
            <div className=' col-12 mb-3'>
              <label htmlFor='category id'>category id :</label>
              <input value={c_id} onChange={(e) => setC_id_(e.target.value)} type='text' name='category id' placeholder='Enter category id' />
            </div>

            <div className=' col-12 mb-3'>
              <label htmlFor='product price'> Product image :</label>
              <input value={p_image} onChange={(e) => setP_image(e.target.value)} type='file' />
            </div>
            <Button className=' col-12 btn btn-success w-100 rounded-15 mb-2' onClick={() => postData()}>Add product</Button>
          </form>
        </div>
      </div>

      <div>
        <header>
          <Table striped bordered hover variant="light" >
            <thead>
              <tr>

                <td>p_id</td>
                <td>p_name</td>
                <td>p_price</td>
                <td>p_image</td>
                <td>c_id</td>
                <td>Action</td>
              </tr>
            </thead>
            {
              data.map((d, ind) => {
                return (
                  <tbody>
                    <tr>
                      <td>{d.p_id}</td>
                      <td>{d.p_name}</td>
                      <td>{d.p_price}</td>
                      <td>{d.p_image}</td>
                      <td>{d.c_id}</td>
                      <td> <Button variant='success'> <i class="bi bi-pencil" onclick={() => updateProduct(d.p_id, d.p_name, d.p_price, d.p_image, d.c_id)}></i></Button>
                        <Button variant='danger'> <i onClick={(e) => deleteData(d.p_id)} className="bi bi-trash" style={{ marginLeft: '20px' }}></i>
                        </Button></td>
                    </tr>
                  </tbody>
                )
              })
            }
            <div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>updateProduct</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className=' col-12 mb-3'>
                    <label htmlFor='categoryid'>product Id:</label>
                    <input value={newid} onChange={(e) => setNewid(e.target.value)} type='text' name='product id' placeholder='Enter product id'
                    />
                  </div>
                  <div className=' col-12 mb-3'>
                    <label htmlFor='productname'>:</label>
                    <input value={newname} onChange={(e) => setNewname(e.target.value)} type='text' name='product name' placeholder='Enter product name'
                    />
                  </div>
                  <div className=' col-12 mb-3'>
                    <label htmlFor='categoryprice'>product price :</label>
                    <input value={newprice} onChange={(e) => setNewprice(e.target.value)} type='number' name='product price' placeholder='Enter product price'
                    />
                  </div>
                  <div className=' col-12 mb-3'>
                    <label htmlFor='categoryid'>Category Id:</label>
                    <input value={newcid} onChange={(e) => setNewcid(e.target.value)} type='text' name='category id' placeholder='Enter category id'
                    />
                  </div>
                  <div className=' col-12 mb-3'>
                    <label htmlFor='productimage'>product image:</label>
                    <input value={newimage} onChange={(e) => setNewimage(e.target.value)} type='file' name='product image' placeholder='Enter product image'
                    />
                  </div>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={(e) => updatedata(newid)}>update</Button>
                  </Modal.Footer>

                </Modal.Body>
              </Modal>
            </div>
          </Table>
        </header>
      </div>
    </div>
  )
}


export default Product;
