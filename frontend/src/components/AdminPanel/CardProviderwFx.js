import React from 'react'
import Card from './Card';
import '../../styles/DeleteProveedor.css'

const CardProviderwFx = (props) => {

    var companies = props.cp 
    var funcionD = props.fx
    var iconFx = props.icon

    const list = companies.map((company) => {
        return (
            <li>
                <Card cp={company} fx={funcionD} icon={iconFx} />
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

export default CardProviderwFx;