import React from 'react'
import '../styles/CourrierCard.css'

const CourrierCard = (props) => {

    console.log(props)
    var courrierName = props.name
    var courrierCost = props.cost

    return (
        <label id="option" >
            <input name="style2" type="radio" />
            <span>{courrierName}</span>
            <span> $</span>
            <span>{courrierCost}</span>
        </label>
    )
}

export default CourrierCard;