import React from "react";
import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import M from 'materialize-css'
import '../../styles/AddProveedor.css'
import AdminOptions from "../AdminOptions";
import CloudImageUpload from "../CloudImageUpload";

const AddProveedor = (props) => {
  const history = useHistory();
  const company = props.company
  const [urlBanner, setUrlBanner] = useState(null);
  const [urlLogo, setUrlLogo] = useState(null);
  const [companyName, setcompanyName] = useState(null)
  const [companyImage, setcompanyImage] = useState(null)
  const [companyBanner, setcompanyBanner] = useState(null)
  const [facebook, setfacebook] = useState(null)
  const [instagram, setinstagram] = useState(null)
  const [web, setweb] = useState(null)

  document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems, {});
  });

  useEffect(() => {
    if (urlBanner && urlLogo) {
      postearAdd();
    }
  });

  const agregarProveedor = () => {
    return(<CloudImageUpload image={companyImage} fx={setUrlLogo} />);

    /*
    if (companyImage) {
      const data = new FormData();
      data.append("file", companyImage);
      data.append("upload_preset", "development");
      data.append("cloud_name", "expovirtual");
      fetch("https://api.cloudinary.com/v1_1/expovirtual/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUrlLogo(data.url);
          //   postear()
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({ html: "cargar imagen", classes: "#c62828 red darken-3" });
    }*/
  };
  const subirBanner = () => {
    return(<CloudImageUpload image={companyBanner} fx={setUrlBanner} />);
    /*
    if (companyBanner) {
      const data = new FormData();
      data.append("file", companyBanner);
      data.append("upload_preset", "development");
      data.append("cloud_name", "expovirtual");
      fetch("https://api.cloudinary.com/v1_1/expovirtual/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrlBanner(data.url);
          // postear()
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({ html: "cargar imagen", classes: "#c62828 red darken-3" });
    }*/
  };
  /*
    const postear = () => {
      if (urlLogo && urlBanner) {
        console.log("se hizo el posteo")
        postearAdd()
      } else (
        console.log("no se hizo el posteo por que urlLogo es " + { urlLogo } + " y urlBanner es " + { urlBanner })
      )
    }
    */
  const postearAdd = () => {

    if (companyName && companyImage && facebook && instagram && web && companyBanner) {
      fetch("http://localhost:7000/companies", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "companyName": companyName,
          "companyImage": urlLogo,
          "companyBanner": urlBanner,
          "facebook": facebook,
          "instagram": instagram,
          "web": web
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Proveedor agregado exitosamente",
              classes: "#388e3c green darken-2",
            });
            history.push("/admin");
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      M.toast({ html: "Llenar todos los campos", classes: "#c62828 red darken-3" });
    }
  };

  return (

    <div className="row">
      <AdminOptions />
      <div className='col s8'>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="Nombre_de_la_Empresa" onChange={(e) => setcompanyName(e.target.value)} type="text" className="validate" value={companyName} required />
                <label className="active" for="Nombre_de_la_Empresa">Nombre de la empresa</label>
              </div>
              <div className="input-field col s6">
                <input id="Web" onChange={(e) => setweb(e.target.value)} type="text" className="validate" value={web} required />
                <label className="active" for="Web">Web</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="instagram" onChange={(e) => setinstagram(e.target.value)} type="text" className="validate" value={instagram} required />
                <label className="active" for="instagram">Instagram</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="Facebook" onChange={(e) => setfacebook(e.target.value)} type="text" className="validate" value={facebook} required />
                <label className="active" for="Facebook">Facebook</label>
              </div>
            </div>
            <div className="row">
            </div>
            <form action="#">
              <div className="file-field input-field">
                <div className="btn" id='buttonUploadImages'>
                  <span>Cargar imagen</span>
                  <input type="file" onChange={(e) => {
                    setcompanyImage(e.target.files[0])
                    console.log(e.target.files[0])
                  }} required />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value={companyImage ? companyImage.name : ""} />
                </div>
              </div>
            </form>
            <form action="#">
              <div className="file-field input-field">
                <div className="btn" id='buttonUploadImages'>
                  <span>Cargar banner</span>
                  <input type="file" onChange={(e) => {
                    setcompanyBanner(e.target.files[0])
                    console.log(e.target.files[0])
                  }} required />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" value={companyBanner ? companyBanner.name : ""} />
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col s12">
                <a onClick={() => {
                  agregarProveedor();
                  subirBanner();
                  //  CloudImageUpload({ image: companyImage }, { property: {setUrlLogo} });
                  console.log(urlLogo)
                  //  CloudImageUpload({ image: companyBanner }, { property: {setUrlBanner} });
                  console.log(urlBanner)
                  postearAdd()
                }} className="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Agregar proveedor</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProveedor;
