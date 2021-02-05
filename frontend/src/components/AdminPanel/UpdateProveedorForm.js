import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import M from 'materialize-css'
import postearUpdateEntity from '../AdminPanel/FetchFunctions'
import uploadImage from "../CloudImageUpload";

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {});
});

const UpdateProveedorForm = (props) => {
  const history = useHistory();
  const company = props.company
  const [urlimage, setUrlimage] = useState(null);
  const [urlBanner, setUrlBanner] = useState(null);
  const [companyName, setcompanyName] = useState(company.companyName)
  const [companyImage, setcompanyImage] = useState(company.companyImage)
  const [companyBanner, setcompanyBanner] = useState(company.companyBanner)
  const [facebook, setfacebook] = useState(company.facebook)
  const [instagram, setinstagram] = useState(company.instagram)
  const [web, setweb] = useState(company.web)
  const [subir, setSubir] = useState(false)
/*  const [postear, setpostear] = useState(false)*/

  useEffect(() => {
    if (urlimage && urlBanner) {
      postearUpdate();
    }
  }, [urlimage, urlBanner]);

  const agregarProveedor = () => {

    if (SubirAlaNubeImagen()) {
      uploadImage({ image: companyImage, fx: setUrlimage });
      setcompanyImage(urlimage)

    } else {
      setUrlimage(companyImage)
    }

    if (SubirAlaNubeBanner()) {
      uploadImage({ image: companyBanner, fx: setUrlBanner });
      setcompanyBanner(urlBanner)

    } else {
      setUrlBanner(companyBanner)
    }
  };

  const SubirAlaNubeImagen = () => {
    return (typeof companyImage !== "string")
  }

  const SubirAlaNubeBanner = () => {
    return (typeof companyBanner !== "string")
  }

  const postearUpdate = () => {
    console.log("entreaPostearUpdate")
    postearUpdateEntity({
      historyProp: history, entityClass: "companies", entity: company, atributes: {
        "companyName": companyName,
        "companyImage": companyImage,
        "companyBanner": companyBanner,
        "facebook": facebook,
        "instagram": instagram,
        "web": web
      }
    })
  };

  console.log(company)

  return (
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input
              id="Nombre_de_la_Empresa" onChange={(e) => {
                setcompanyName(e.target.value)
                console.log(companyName)
              }} type="text" class="validate" value={companyName} />
            <label class="active" for="Nombre_de_la_Empresa">Nombre de la Empresa</label>
          </div>
          <div class="input-field col s6">
            <input id="Web" onChange={(e) => setweb(e.target.value)} type="text" class="validate" value={web} />
            <label class="active" for="Web">Web</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="instagram" onChange={(e) => setinstagram(e.target.value)} type="text" class="validate" value={instagram} />
            <label class="active" for="instagram">Instagram</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="Facebook" onChange={(e) => setfacebook(e.target.value)} type="text" class="validate" value={facebook} />
            <label class="active" for="Facebook">Facebook</label>
          </div>
        </div>
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" id='buttonUploadImages'>
              <span>Cargar Imagen</span>
              <input type="file" onChange={(e) => {
                setcompanyImage(e.target.files[0])
                setSubir(true)
              }} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" value={typeof companyImage !== 'string' ? companyImage.name : companyImage} />
            </div>
          </div>
        </form>
        <form action="#">
          <div class="file-field input-field">
            <div class="btn" id='buttonUploadBanner'>
              <span>Cargar Banner</span>
              <input type="file" onChange={(e) => {
                setcompanyBanner(e.target.files[0])
                setSubir(true)
              }} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" value={typeof companyBanner !== 'string' ? companyBanner.name : companyBanner} />
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col s12">
            <a onClick={() => {
              if (subir) {
                console.log("MODIFIQUE IMAGENES")
                agregarProveedor();
                /*setpostear(true)*/
              } else {
                console.log("NO MODIFIQUE IMAGENES")
                postearUpdate()
              }
            }
            }
              class="waves-effect waves-light red lighten-2 btn-large" id="butonSubmit">Modificar Proveedor</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProveedorForm;