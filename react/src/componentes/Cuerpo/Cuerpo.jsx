import { Inicio } from '../Inicio/Inicio';
import './Cuerpo.css';

export function Cuerpo ( { children })  {

    const hijo = children;
    return(
        <>
            <div className="cuerpo">
                { hijo ? (hijo) : (<Inicio/>) }
            </div>
        </>
    )
}