import React, { useState, useEffect, useRef } from 'react'
import M from 'materialize-css'
import UpdateProductoForm from './UpdateProductoForm'
import '../../styles/ListOfProductToUpdate.css'
import AdminProductSearchBar from '../AdminProductSearchBar'
import CardProductwFx from './CardProductwFx';

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

  const doUpdateProduct = (products, product) => {
    setCliked(<UpdateProductoForm product={product} />)
  }

  const listOfProducts = () => {
    if (products) {
      return (<CardProductwFx prs={products} fx={doUpdateProduct} icon='edit' />)
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