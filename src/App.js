import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Letra from './components/Cancion';

import axios from 'axios';
function App() {

  const [ busquedaLetra, guardarBusquedaLetra ] = useState({});
  const [letra, guardarLetra] = useState('');

  useEffect( ()=> {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {

      const {artista, cancion} = busquedaLetra;

      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

      const resultado = await axios(url);
      guardarLetra(resultado.data.lyrics);
    }
    consultarApiLetra();
  }, [busquedaLetra])
  return (
    <Fragment>
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>Artista</div>
          <div className='col-md-6'>
            <Letra 
              letra={letra}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
