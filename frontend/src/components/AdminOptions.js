import React from "react";
import M from 'materialize-css'
import '../styles/Admin.css'
import { Link } from "react-router-dom";

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, {})
});

const AdminOptions = () => {
    return (
        <div className="col s4">
            <ul className="collapsible">
                <li>
                    <div className="collapsible-header"><i className="material-icons">store_mall_directory</i>Proveedores</div>
                    <div className="collapsible-body">
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarproveedor">Agregar Proveedor</Link>
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/modificarproveedor">Modificar Proveedor</Link>
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarproveedor">Eliminar Proveedor</Link>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">personal_video</i>Productos</div>
                    <div className="collapsible-body">
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarproducto">Agregar Productos</Link>
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/modificarproducto">Modificar Productos</Link>
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarproducto">Eliminar Productos</Link>
                    </div>
                </li>
                <li>
                    <div className="collapsible-header"><i className="material-icons">local_movies</i>Banners</div>
                    <div className="collapsible-body">
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/agregarbanner">Agregar Banner</Link>
                        <Link className="waves-effect waves-light red lighten-2 btn-large" to="/admin/borrarbanner" >Eliminar Banner</Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default AdminOptions;
