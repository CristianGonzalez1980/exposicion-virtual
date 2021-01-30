import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { useHistory } from "react-router-dom"
import M from 'materialize-css'
import AdminOptions from "../AdminOptions";
import CardProviderwFx from './CardProviderwFx';
import AdminProveedorSearchBar from '../AdminProveedorSearchBar';

const DeleteProveedor = () => {
  const history = useHistory()
  const [companies, setCompanies] = useState([])
  const [search, setsearch] = useState(null)

  useEffect(() => {
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
  }, [search])

  const deleteCompany = (provider) => {
    var id = provider.id
    fetch(`http://localhost:7000/companies/${id}`, {
      method: 'DELETE',
      headers: {
      }
    }).then((res) => {
      M.toast({
        html: "Proveedor eliminado exitosamente",
        classes: "#388e3c green darken-2",
      });
      history.push("/admin");
    }
    )
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={deleteCompany} icon='delete' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={deleteCompany} icon='delete' />)
    }
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div className="row">
          <AdminProveedorSearchBar fx={setsearch} val={search} />
          <div>
            {
              !companies ?
                <p>Loading...</p>
                :
                search ?
                  filterCompanies()
                  :
                  listOfCompanies()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteProveedor;