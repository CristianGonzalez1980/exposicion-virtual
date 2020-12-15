import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import ListOfProductToUpdate from './ListOfProductToUpdate'
import AdminOptions from '../AdminOptions'
import CardProviderwFx from './CardProviderwFx';
import AdminProveedorSearchBar from '../AdminProveedorSearchBar';

const UpdateProducto = () => {
  const [companies, setCompanies] = useState(null)
  const [clicked, setClicked] = useState(null)
  const [search, setsearch] = useState(null)

  useEffect(() => {
    if (!companies) {
      fetch(`http://localhost:7000/companies`, {
        headers: {
        }
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          }
        })
        .then((result) => {
          setCompanies(result)
        })
        .catch((err => {
          console.log(err)
        }))
    }
  }, [search])

  const updateProduct = (company) => {
    setClicked(<ListOfProductToUpdate company={company} />)
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={updateProduct} icon='mode_edit' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={updateProduct} icon='mode_edit' />)
    }
  }
  console.log(clicked)
  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {clicked ?
          clicked
          :
          <div className="row">
            <AdminProveedorSearchBar fx={setsearch} val={search} />
            <div>
              {
                !companies ?
                  <p>Cargando...</p>
                  :
                  search ?
                    filterCompanies()
                    :
                    listOfCompanies()
              }
            </div>
          </div>}
      </div>
    </div>
  )
}

export default UpdateProducto;