import React, {Fragment} from 'react';

const Cancion = ({letra, nombreCancion}) => {

    if(letra.length === 0) return null;

    return (
        <Fragment>
            <h2>{nombreCancion}</h2>
            <p className='letra'>
                {letra}
            </p>
        </Fragment>
       );
}
 
export default Cancion;