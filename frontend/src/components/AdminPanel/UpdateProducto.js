import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { Link } from 'react-router-dom'
import ListOfProductToUpdate from './ListOfProductToUpdate'
import AdminOptions from '../AdminOptions'

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
            <div className="card" id='cardDeleteProveedor'>
              <div className="card-image">
                <img src={company.companyImage} />
                <span className="card-title">{company.companyName}</span>
                <a onClick={() => setClicked(<ListOfProductToUpdate company={company} />)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
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
                  <a onClick={() => setClicked(<ListOfProductToUpdate company={company} />)} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">edit</i></a>
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
  console.log(clicked)
  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {clicked ?
          clicked
          :
          <div className="row">
            <div className="col s11" id="formimputSearch">
              <form className="form-inline">
                <input onChange={(e) => setsearch(e.target.value)} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Buscar" aria-label="Search" />
              </form>
            </div>
            <div class='col s1'>
              <Link>
                <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
              </Link>
            </div>
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