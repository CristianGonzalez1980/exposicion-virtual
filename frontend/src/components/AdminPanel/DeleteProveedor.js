import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import AdminOptions from "../AdminOptions";

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

    const list = mycompanies.map((company) => {
      return (
        <li>
          <div className="col s1" id='colCard'>
            <div className="card" id='cardDeleteProducto'>
              <div className="card-image">
                <img src={company.companyImage} />
                <span className="card-title">{company.companyName}</span>
                <a onClick={() => {
                  deleteCompany(company.id)
                }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></a>
              </div>
              <div className="card-content">
                <a href={"http://" + company.facebook} target="_blank"><p>Facebook</p></a>
                <a href={"http://" + company.instagram} target="_blank"><p>Instagram</p></a>
                <a href={"http://" + company.web} target="_blank"><p>Web</p></a>
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

  const listOfCompanies = () => {
    if (companies) {
      const list = companies.map((company) => {
        return (
          <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDeleteProveedor'>
                <div className="card-image">
                  <img src={company.companyImage} />
                  <a onClick={() => {
                    deleteCompany(company.id)
                  }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></a>
                </div>
                <div className="card-content">
                  <a href={"http://" + company.facebook} target="_blank"><p>Facebook</p></a>
                  <a href={"http://" + company.instagram} target="_blank"><p>Instagram</p></a>
                  <a href={"http://" + company.web} target="_blank"><p>Web</p></a>
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
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div className="row">
          <div className="col s10" id="formimputSearch">
            <form className="form-inline">
              <input onChange={(e) => setsearch(e.target.value)} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Buscar" aria-label="Search" />
            </form>
          </div>
          <div className='col s2'>
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