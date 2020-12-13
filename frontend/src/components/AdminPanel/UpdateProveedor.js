import React, { useState, useEffect } from 'react'
import '../../styles/UpdatProveedor.css'
import UpdateProveedorForm from './UpdateProveedorForm'
import AdminOptions from '../AdminOptions';
import CardProviderwFx from './CardProviderwFx';

const UpdateProveedor = () => {
  const [companies, setCompanies] = useState([])
  const [cliked, setCliked] = useState(null)
  const [search, setsearch] = useState(null)

  useEffect(() => {
    fetch("http://localhost:7000/companies", {
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
  }, [cliked, search])

  const updateCompany = (company) => {
    setCliked(<UpdateProveedorForm company={company} />)
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={updateCompany} icon='mode_edit' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={updateCompany} icon='mode_edit' />)
    }
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {cliked ?
          cliked
          :
          <div className="row">
            <div className="col s11" id="formimputSearch">
              <form className="form-inline">
                <input onChange={(e) => setsearch(e.target.value)} value={search} className="form-control sm-2" id='inputSearchFormAdmin' type="search" placeholder="Buscar" aria-label="Search" />
              </form>
            </div>
            <div className='col s1'>
              <i className="small material-icons left" id="iconSearchFormAdmin">search</i>
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

export default UpdateProveedor;