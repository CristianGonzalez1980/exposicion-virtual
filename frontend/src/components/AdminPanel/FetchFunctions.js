//import { useHistory } from "react-router-dom";
import M from 'materialize-css'

    const postearUpdateEntity = (props) => {
        const history = props.historyProp
        const entityClass = props.entityClass
        const entity = props.entity
        const atributes = props.atributes

        console.log(entityClass)
        
        fetch(`http://localhost:7000/${entityClass}/${entity.id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(
                atributes
                /*{
                "companyName": companyName,
                "companyImage": postComapanyImage(),
                "companyBanner": postCompanyBanner(),                   ARMAR JSON SEGUN ENTIDAD
                "facebook": facebook,
                "instagram": instagram,
                "web": web
            }*/)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.error) {
                    M.toast({
                        html: data.error, classes: "#c62828 red darken-3"
                    });
                } else {
                    M.toast({
                        html: "Proveedor modificado exitosamente",
                        classes: "#388e3c green darken-2",
                    });
                    history.push("/admin");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


export default postearUpdateEntity;