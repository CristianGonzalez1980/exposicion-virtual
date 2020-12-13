import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import AdminOptions from "../AdminOptions";
import CardProviderwFx from './CardProviderwFx';

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

  const deleteCompany = (id) => {
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
    return (<CardProviderwFx cp={mycompanies} fx={deleteCompany} />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={deleteCompany} />)
    }
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div className="row">
          <div className="col s11" id="formimputSearch">
            <form className="form-inline">
              <input onChange={(e) => setsearch(e.target.value)} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Buscar" aria-label="Search" />
            </form>
          </div>
          <div className='col s1'>
            <Link>
              <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
            </Link>
          </div>
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