import React, { useState, useEffect, useRef } from 'react'
import M from 'materialize-css'
import UpdateProductoForm from './UpdateProductoForm'
import '../../styles/ListOfProductToUpdate.css'
import AdminProductSearchBar from '../AdminProductSearchBar'

const ListOfProductToUpdate = (props) => {
  const company = props.company
  const [products, setproducts] = useState([])
  const [cliked, setCliked] = useState(null)
  const [prevProducts, setprevProducts] = useState([])

  useEffect(() => {
    if (products.length === 0) {
      fetch(`http://localhost:7000/products/supplier/${company.id}`, {
        headers: {
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((result) => {
          setproducts(result)
        })
        .catch((err => {
          console.log(err)
        }))
    }
  }, [products])

  const listOfProducts = () => {
    if (products) {
      const list = products.map((product) => {
        return (
          <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDeleteProducto'>
                <div className="card-image">
                  <img src={product.images[0]} />
                  <a onClick={() => {
                    setCliked(<UpdateProductoForm product={product} />)
                  }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
                </div>
                <div className="card-content">
                  <strong><p> {product.itemName}</p></strong>
                  <hr />
                  <p > stock : {product.stock} </p>
                  <p > precio : {product.itemPrice} </p>
                  <p > precio Promocional : {product.promotionalPrice} </p>
                </div>
              </div>
            </div>
          </li>
        )
      })
      return (
        <ul>
          <div className='row'>
            {list}
          </div>
        </ul>
      )
    }
  }
  return (
    cliked ?
      cliked
      :
      <div className="row">
        <AdminProductSearchBar />
        <div>
          {
            !products ?
              <p>Loading...</p>
              :
              listOfProducts()
          }
        </div>
      </div>
  )
}

export default ListOfProductToUpdate;