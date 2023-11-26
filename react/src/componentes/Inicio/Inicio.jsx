//hook de react
import { useEffect, useState } from "react";
// componente personalizado
import { MiCard } from "./MiCard";
// clase de bootstrap
import { Alert } from "react-bootstrap";
import './Inicio.css';

export function Inicio(){
    
    const [datos, setDatos] = useState(null);

    useEffect(()=>{
        const apiKey = 'ccbb3d66fce440c5a8493fe3f243e876';
        const consulta = `https://newsapi.org/v2/top-headlines?country=ar&apiKey=${apiKey}`;

        fetch(consulta)
        .then( resp => {
            resp.json().then(data => {
                console.log(data);
                setDatos(data.articles);
            } )
        })
        .catch(error => {
            console.log('error -->', error);
        });

    }, []);

    return(
        <>
            <div>
                {
                    datos ? (datos.map((item, index) => (
                        <div key = {index}>
                            {/* <li> {item.title} </li> */}
                            <MiCard articulo = {item} />
                        </div>
                    ))) 
                    : 
                    (
                        <div className="container mt-5">
                            <Alert>buscando info.</Alert>
                        </div>
                    )
                }
            </div>
        </>
    )
}