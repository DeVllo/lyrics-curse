import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Letra from './components/Cancion';
import Info from './components/Info';
import Loader from './components/Loader';


import axios from 'axios';
function App() {

  const [primerBusqueda, guardarPrimerBusqueda] = useState(0);
  const [ busquedaLetra, guardarBusquedaLetra ] = useState({});
  const [buscando, guardarBuscando] = useState(false);
  const [letra, guardarLetra] = useState('');
  const [info, guardarInfo ] = useState({});

  useEffect( ()=> {
    if(Object.keys(busquedaLetra).length === 0) return;

    const consultarApiLetra = async () => {
      guardarBuscando(true);
      if(primerBusqueda > 0){
        guardarLetra('');
        guardarInfo({});
      }
      
      const {artista, cancion} = busquedaLetra;
      //Reseteamos la letra y el artista, para renovarlo con el loader.css
      
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      const [ letra, informacion ] = await Promise.all([
        axios(url),
        axios(url2)
      ]);
      console.log("Buscando");
      const ResultLetra = letra.data.lyrics;
      const ResultInfo = informacion.data.artists[0];
     
        
        guardarLetra(ResultLetra);
        guardarInfo(ResultInfo);
        guardarBuscando(false);
        document.querySelector('#search').disabled = false;
      guardarPrimerBusqueda(primerBusqueda + 1);

      // const resultado = await axios(url);
      // guardarLetra(resultado.data.lyrics);
    }
    consultarApiLetra();
  }, [busquedaLetra])

  //Desestructuramos la búsqueda

  return (
    <Fragment>
      {buscando ? (<Loader />) : null}
      <Formulario 
        guardarBusquedaLetra={guardarBusquedaLetra}
      />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6'>
            <Letra 
              letra={letra}
              nombreCancion={busquedaLetra.cancion}
            /></div>
          <div className='col-md-6'>
            <Info 
              info={info}
              nombreArtista={busquedaLetra.artista}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
