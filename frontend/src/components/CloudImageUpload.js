import M from 'materialize-css';
import React from "react";
import { useState } from "react";
//import PostProveedor from "../components/AdminPanel/PostProveedor"

const CloudImageUpload = (props) => {
    const pic = props.image;
    const functionD = props.fx;
    const [url, setUrl] = useState(null);
    // console.log(props.image)
    // console.log(props.fx)
    /*
        const doyLoQueMeDas = (peperucho) => {
            console.log(peperucho);
        }*/
    const uploadImage = () => {

        console.log(pic)
        console.log(functionD)
        //  console.log(Object.keys(props2.property)[0])
        //  var fx = Object.keys(props2.property)[0]
        //   console.log(fx === "setUrlLogo")

        if (pic) {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "development");
            data.append("cloud_name", "expovirtual");
            fetch("https://api.cloudinary.com/v1_1/expovirtual/image/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    //  if (fx === "setUrlBanner") {
                    setUrl(data.url);
                    console.log(url);
                    functionD(url);
                    //return(imgUrl)
                    //setPic(img);
                    // console.log(pic)
                    //doyLoQueMeDas(img);
                    //PostProveedor(data.url);
                    //}
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            M.toast({ html: "cargar imagen", classes: "#c62828 red darken-3" });
        }
    }

    uploadImage()

};

export default CloudImageUpload;