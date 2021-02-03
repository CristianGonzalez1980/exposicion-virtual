import React, { useState } from 'react'
/*import { Carousel } from 'react-materialize'*/
import { useParams } from 'react-router-dom'
import { Dropdown, Button, Divider/*, Icon */} from 'react-materialize'
import ProductCard from './ProductCard'
import '../styles/ResultSearchProduct.css'

const ResultSearchProduct = (props) => {
    const products = props.products
    let { textsearch } = useParams()
    console.log(products)
    const [orderProduct, setOrderProduct] = useState([])

    const orderButton = () => {
        return (
            <Dropdown
                id="Dropdown_6"
                options={{
                    alignment: 'left',
                    autoTrigger: true,
                    closeOnClick: true,
                    constrainWidth: true,
                    container: null,
                    coverTrigger: true,
                    hover: false,
                    inDuration: 150,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 250
                }}
                trigger={<Button node="button">Ordenar por</Button>}>
                <button href="#" className="link-button" onClick={() => ordenarPrecioAsc()}> Precio+</button>
                <button href="#" className="link-button" onClick={() => ordenarPrecioDesc()}> Precio-</button>
                <Divider />
                <button href="#" className="link-button" onClick={() => ordenarAlfabeticamenteAsc()}> Alfabeticamente+</button>
                <button href="#" className="link-button" onClick={() => ordenarAlfabeticamenteDesc()}> Alfabeticamente-</button>
                <Divider />
                <button href="#" className="link-button" onClick={() => ordenarPromocionAsc()}> Descuento+</button>
                <button href="#" className="link-button" onClick={() => ordenarMasVendidos()}> Vendidos+</button>
            </Dropdown>
        )
    }

    const ordenarPrecioAsc = () => {
        const list = products.sort((a, b) => parseFloat(a.itemPrice) - parseFloat(b.itemPrice));
        setOrderProduct(list)
    }

    const ordenarPrecioDesc = () => {
        const list = products.sort((a, b) => parseFloat(b.itemPrice) - parseFloat(a.itemPrice));
        setOrderProduct(list)
    }

    const ordenarPromocionAsc = () => {
        const list = products.sort((a, b) => parseFloat(a.promotionalPrice) - parseFloat(b.promotionalPrice));
        setOrderProduct(list)
    }

    const ordenarAlfabeticamenteAsc = () => {
        const list = products.sort(function (a, b) {
            if (a.itemName < b.itemName) { return -1; }
            if (a.itemName > b.itemName) { return 1; }
            return 0;
        })
        setOrderProduct(list)
    }

    const ordenarAlfabeticamenteDesc = () => {
        const list = products.sort(function (a, b) {
            if (a.itemName > b.itemName) { return -1; }
            if (a.itemName < b.itemName) { return 1; }
            return 0;
        })
        setOrderProduct(list)
    }

    const ordenarMasVendidos = () => {
        const list = products.sort((a, b) => parseFloat(b.vendidos) - parseFloat(a.vendidos));
        setOrderProduct(list)
    }

    const listOfProducts = (productos) => {
        if (productos.length > 0) {
            const res = []
            for (let index = 0; index < productos.length; index++) {
                const element = productos[index];
                if (productos[index] === undefined) {
                } else {
                    res.push(element)
                }
            }

            const result = res.map((product) => {
                return (
                    <ProductCard product={product} />
                )
            }
            )
            return (
                <div>
                    <div className="row">
                        {result}
                    </div>
                </div>
            )
        }
    }

    return (
        products ?
            orderProduct.length === 0 ?
                <div>
                    <div>
                        {orderButton()}
                    </div>
                    <div className='row'>
                        {listOfProducts(products)}
                    </div>
                </div>
                :
                <div>
                    <div>
                        {orderButton()}
                    </div>
                    <div className='row'>
                        {listOfProducts(orderProduct)}
                    </div>
                </div>
            :
            <p></p>
    )
}

export default ResultSearchProduct;