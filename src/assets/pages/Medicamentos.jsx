import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ListaMedicamentos from "../components/ListaMedicamentos";
import Modal from "../components/Modal"
import MedicamentoForm from "../components/MedicamentoForm";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);

  const [produtoEdit, setProdutoEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function getMedicamentos() {
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

  useEffect(() => {
    getMedicamentos();
  }, []);

  const adicionarMedicamento = async (data) => {
    const submitData = {
      ...data,
      lote: moment(data.lote).format('YYYY-MM-DD'),
      validade: moment(data.validade).format('YYYY-MM-DD')
    }

    const result = await axios.post('/medicamentosAPI', {
      "medicamento": submitData
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );

    console.log(result);
  }

  const editarMedicamento = async (data, callback) => {
    const submitData = {
      ...data,
      lote: moment(data.lote).format('YYYY-MM-DD'),
      validade: moment(data.validade).format('YYYY-MM-DD')
    }

    const result = await axios.put(`/medicamentosAPI/${produtoEdit.id}`, {
      "medicamento": submitData
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    if(callback!==undefined) callback(result);
    console.log(result);
  }

  const removeMedicamento = async (medicamento) => {
    const result = await axios.delete(`medicamentosAPI/${medicamento.id}`)

    console.log(result);
  }

  const ErrorMessage = () => {
    return (
      <div className="container d-flex justify-content-center flex-column min-vh-100 w-100 fs-4 text-center">
        <p>Desculpe algum erro ocorreu por favor tente novamente mais tarde!</p>
        <Link to={'/'}> Voltar a pagina inicial</Link>
      </div>
    );
  }

  const ActionButton = ({ buttonText, target, cssClass, onClick }) => {
    return (
      <button onClick={onClick} type="button" className={`${cssClass}`} data-bs-toggle="modal" data-bs-target={`#${target}`}>
        {buttonText}
      </button>

    );
  }
  const Controls = () => {
    return (
      <div
        className="overflow-scroll container d-flex p-2 bg-dark m-5 flex-column ">
        <div className="w-100 mb-2 d-flex justify-content-between">
          <input className="w-100 h-100 p-2" type="text" name="search" id="search" placeholder="Nome, valor ..." />
          <input className=" mx-2 btn btn-primary rounded-0" type="button" value="Pesquisar" />
        </div>
        <div>
          <ActionButton buttonText={'Cadastrar produto'} target={'cadastroModal'} cssClass="btn btn-success rounded-0" />
          <Modal id={'cadastroModal'} body={< MedicamentoForm submit={adicionarMedicamento} title={'Cadastrar medicamento:'} />} />
        </div>
      </div >
    );
  }
  return (
    <div className="min-vh-100 min-vw-100 container-fluid bg-light">
      <Modal id={'editarModal'} body={< MedicamentoForm submit={editarMedicamento} title={'Editar medicamento:'} values={produtoEdit} />} />
      {
        loading ?
          (<Loading />)
          :
          (error !== null ?
            (<ErrorMessage />)
            :
            (<ListaMedicamentos
              controls={<Controls />}
              medicamentos={medicamentos}
              editar={(medicamento) => setProdutoEdit(medicamento)}
              remove={(medicamento) => removeMedicamento(medicamento)}
              editarBtn={(onClick) => <ActionButton onClick={onClick} buttonText={'Editar produto'} target={'editarModal'} cssClass="btn btn-success rounded-0" />}
            />)
          )
      }
    </div >
  );
}

export default Medicamentos;