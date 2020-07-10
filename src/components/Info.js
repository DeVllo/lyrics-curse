import React from 'react';

const Info = ({info, nombreArtista}) => {

    if(Object.keys(info).length === 0) return null;
    const {intFormedYear, strStyle, strGenre, strBiographyES} = info;
    return ( 
        <div className='card border-light'>
            <div className='card-header bg-primary text-light font-weight-bold'>
                Información del Artista
            </div>
            <div className='card-body'>
                <h3>{nombreArtista}</h3>
                <img 
                    src={info.strArtistThumb} alt="Logo Artista"
                />
                <div className='row'>
                    <div className='col s6'>
                        <h5>Comienzo musical: {intFormedYear}</h5>
                    </div>
                    <div className='col s6'>
                        <h5>Género: {strGenre} , {strStyle}</h5>
                    </div>
                </div>
                <h2>Biografía</h2>
                <p className='card-text'>
                    {strBiographyES}
                </p>
            </div>
        </div>
     );
}
 
export default Info;