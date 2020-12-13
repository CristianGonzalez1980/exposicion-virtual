import React from 'react'
import '../../styles/DeleteProveedor.css'

const Card = (props) => {

  console.log(props)
  var provider = props.cp 
  var funcionD = props.fx
  var iconFx = props.icon 

  return (
    <div className="col s1" id='colCard'>
      <div className="card" id='cardDeleteProveedor'>
        <div className="card-image">
          <img src={provider.companyImage} />
          <span className="card-title">{provider.companyName}</span>
          <a onClick={() => {funcionD(provider)}} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">{iconFx}</i></a>
        </div>
        <div className="card-content">
          <a href={"http://" + provider.facebook} target="_blank"><p>Facebook</p></a>
          <a href={"http://" + provider.instagram} target="_blank"><p>Instagram</p></a>
          <a href={"http://" + provider.web} target="_blank"><p>Web</p></a>
        </div>
      </div>
    </div>
  )
}

export default Card;