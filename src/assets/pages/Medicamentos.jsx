import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ListaMedicamentos from "../components/ListaMedicamentos";

function Medicamentos(){
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  function getMedicamentos(){
    axios.get('http://localhost:3000/medicamentosAPI')
    .then(result => {
      setMedicamentos(result.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }

  useEffect(()=>{
    getMedicamentos();
  },[]);

  const ErrorMessage = () =>{
    return(
      <div className="container w-100 fs-4 text-center">
        <p>Desculpe algum erro ocorreu por favor tente novamente mais tarde!</p> 
        <Link to={'/'}> Voltar a pagina inicial</Link>
      </div>
    );
  }

  return(
    <div className="min-vh-100 min-vw-100 container-fluid bg-light">
      {
        loading?(<Loading/>):(error!== null?(<ErrorMessage/>):<ListaMedicamentos medicamentos={medicamentos}/>)
      }
    </div>
  );
}

export default Medicamentos;