import React from "react";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/AddProveedor.css'
import AdminOptions from '../AdminOptions';
import BannerCategories from '../BannerCategories';

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(elems, {});
});

const AddBanner = () => {
  const history = useHistory();
  const [url, seturl] = useState(null);
  const [image, setimage] = useState(null)
  const [category, setcategory] = useState(null)

  useEffect(() => {
    if (url) {
      postearAdd();
    }
  });

  const agregarBanner = () => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "development");
      data.append("cloud_name", "expovirtual");
      fetch("https://api.cloudinary.com/v1_1/expovirtual/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const urlb = data.url
          seturl(urlb);
        })
        .catch((err) => {
        });
    } else {
      M.toast({ html: "cargar imagen", classes: "#c62828 red darken-3" });
    }
  };

  const postearAdd = () => {
    if (image && category) {
      fetch("http://localhost:7000/banners/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "banner": url,
          "category": category
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Banner agregado exitosamente",
              classes: "#388e3c green darken-2",
            });
            history.push("/admin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
    }
  };

  const loadCategories = () => {
    var categories = ["HOME", "SCHEDULE", "CLASS", "COURRIER", "PAYMENTMETHODS"];
    categories.sort();
    addOptions("Category", categories);
  }

  const addOptions = (idElement, array) => {
    var select = document.getElementsById(idElement)[0];
    array.forEach(element => {
      var option = document.createElement("option");
      option.text = array[element];
      select.add(option);
    });
  }

  return (
    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div class="row" onLoad={loadCategories}>
          <form class="col s12" id="bannerform">
            <BannerCategories val={category} fx={setcategory} />
            <form action="#">
              <div class="file-field input-field">
                <div class="btn" id='buttonUploadImages'>
                  <span>Cargar imagen</span>
                  <input type="file" onChange={(e) => setimage(e.target.files[0])} />
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text" value={url} />
                </div>
              </div>
            </form>
            <div class="row">
              <div class="col s12">
                <a onClick={() => {
                  agregarBanner();
                  if (image &&
                    category && url) {
                    postearAdd();
                  }
                }} class="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Agregar Banner</a>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBanner;
