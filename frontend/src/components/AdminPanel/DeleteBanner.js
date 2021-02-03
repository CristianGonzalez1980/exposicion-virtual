import React, { useState, useEffect } from 'react'
import '../../styles/DeleteBanner.css'
import { /*Link,*/ useHistory } from 'react-router-dom'
import M from 'materialize-css'
import AdminOptions from '../AdminOptions';
import BannerCategories from '../BannerCategories';

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems, {});
});

const DeleteBanner = () => {
  const history = useHistory()
  const [banners, setBanners] = useState([])
  const [category, setcategory] = useState(null)
  useEffect(() => {
    fetch(`http://localhost:7000/banners`, {
      headers: {
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then((result) => {
        setBanners(result)
      })
      .catch((err => {
        console.log(err)
      }))
  }, [banners])

  const deleteBanner = (id) => {
    fetch(`http://localhost:7000/banners/${id}`, {
      method: 'DELETE',
      headers: {
      }
    }).then((res) => {
      M.toast({
        html: "Banner eliminado exitosamente",
        classes: "#388e3c green darken-2",
      });
      history.push("/admin");
    }
    )
  }

  const listOfBanners = (category) => {
    if (banners) {
      const bannersByCategory = banners.filter(banner => banner.category === category)
      const list = bannersByCategory.map((banner) => {
        return (
          <li>
            <div className="col s1" id='colCard'>
              <div className="card" id='cardDeleteBD'>
                <div className="card-image" id="imageDB">
                  <img alt="bannerImage" src={banner.image} />
                  <button onClick={() => {
                    deleteBanner(banner.id)
                  }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">delete</i></button>
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
        <div>
          {
            !banners ?
              <p>Loading...</p>
              :
              <div className="row">
                <form className="col s12" id="bannerform">
                  <BannerCategories val={category} fx={setcategory} />
                </form>
                {listOfBanners(category)}
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default DeleteBanner;