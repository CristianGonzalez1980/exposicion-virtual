import React, { useState, useEffect/*, useRef*/ } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'
import AdminProductSearchBar from '../AdminProductSearchBar'
import CardProductwFx from './CardProductwFx';

const ListOfProductToDelete = (props) => {
  const company = props.company
  const history = useHistory()
  const [products, setproducts] = useState([])
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

  const deleteProduct = (id) => {
    fetch(`http://localhost:7000/products/${id}`, {
      method: 'DELETE',
      headers: {
      }
    }).then((res) => {
      M.toast({
        html: "Producto eliminado exitosamente",
        classes: "#388e3c green darken-2",
      });
      history.push("/admin");
    }
    )
      .then(() => {
        setproducts([])
      })
  }

  const doDeleteProduct = (products, product) => {
    setprevProducts(products)
    deleteProduct(product.id)
  }

  const listOfProducts = () => {
    if (products) {
      return (<CardProductwFx prs={products} fx={doDeleteProduct} icon='delete' />)
    }
  }

  return (
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

export default ListOfProductToDelete;