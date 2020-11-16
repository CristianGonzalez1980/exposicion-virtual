import React, { useState, useEffect} from "react";
import "../../styles/Singin.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import logo from "../../images/logo.png"
const Login = () => {
  const history = useHistory();
  const [mail, setmail] = useState(null);
  const [password, setpassword] = useState(null);


  const PostData = () => {
      fetch("http://localhost:7000/login/admin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          "password": password,
          "userName":mail
        }),
      })
        .then((res) => {
          //console.log(res)
          if(!res.ok){
            M.toast({ html:"datos invalidos o el Administrador no existe", classes: "#c62828 red darken-3" });
          }else{
            M.toast({
              html: "Loggeado exitosamente",
              classes: "#388e3c green darken-2",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });

  };

  
  return (
    <div className="mycard">
          <div id="fondoTarjetaLogin"  className="card auth-card input-field">
             <img alt="logo" className="logo-login" src={logo}/>
            <input
              type="text"
              id='inputLogin'
              placeholder="Ingrese su Mail"
              value={mail}
              onChange={(e) => setmail(e.target.value)}
            />
            <input
              type="password"
              id='inputLogin'
              placeholder="Ingrese su Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button
            id="botonLogin"
              className="btn waves-effect waves-light #64b5f6 red darken-1"
              onClick={() => PostData()}
            >
              Singin
            </button>
            <h5 id="H5Register">
              <Link id="linkRegister" to="/login">Logearse como usuario</Link>
              <tr/>
              <Link id="linkRegister" to="/register">Registrate acá</Link>
            </h5>
          </div>
        </div>
  );
};

export default Login;
