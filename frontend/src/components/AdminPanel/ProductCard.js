import React from 'react'
import '../../styles/DeleteProveedor.css'

const ProductCard = (props) => {

    console.log(props)
    var products = props.prs
    var product = props.pr
    var funcionD = props.fx
    var iconFx = props.icon

    return (
        <div className="col s1" id='colCard'>
            <div className="card" id='cardViewProveedor_Product'>
                <div className="card-image">
                    <img src={product.images[0]} />
                    <a onClick={() => { funcionD(products, product) }} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">{iconFx}</i></a>
                </div>
                <div className="card-content">
                    <strong><p> {product.itemName}</p></strong>
                    <hr />
                    <p > stock : {product.stock} </p>
                    <p > precio : {product.itemPrice} </p>
                    <p > precio Promocional : {product.promotionalPrice} </p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;