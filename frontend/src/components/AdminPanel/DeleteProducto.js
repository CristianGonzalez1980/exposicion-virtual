import React, { useState, useEffect } from 'react'
import '../../styles/DeleteProveedor.css'
import { Link } from 'react-router-dom'
import ListOfProductToDelete from './ListOfProductToDelete'
import AdminOptions from '../AdminOptions';
import CardProviderwFx from './CardProviderwFx';

const DeleteProducto = () => {
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

  const deleteProduct = (company) => {
    setClicked(<ListOfProductToDelete company={company} />)
  }

  const filterCompanies = () => {
    let mycompanies = []
    companies.forEach(element => {
      if (element.companyName.toLowerCase().includes(search.toLowerCase())) {
        mycompanies.push(element)
      }
    });
    return (<CardProviderwFx cp={mycompanies} fx={deleteProduct} icon='delete' />)
  }

  const listOfCompanies = () => {
    if (companies) {
      return (<CardProviderwFx cp={companies} fx={deleteProduct} icon='delete' />)
    }
  }
  console.log(clicked)
  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        {
          clicked ?
            clicked
            :
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
        }
      </div>
    </div>
  )
}

export default DeleteProducto;