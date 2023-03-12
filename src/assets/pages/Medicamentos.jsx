import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../components/Loading";
import ListaMedicamentos from "../components/ListaMedicamentos";
import Modal from "../components/Modal"
import MedicamentoForm from "../components/MedicamentoForm";
import Controls from "../components/Controls";
import { FormatDate } from "../util/Date";

function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState([]);

  const [produtoEdit, setProdutoEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  function getMedicamentos() {
    axios.get('/medicamentosAPI')
      .then(result => {
        setMedicamentos(result.data);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    getMedicamentos();
  }, []);

  const adicionarMedicamento = async (data, callback) => {
    const submitData = {
      ...data,
      lote: FormatDate(data.lote, 'YYYY-MM-DD'),
      validade: FormatDate(data.validade, 'YYYY-MM-DD')
    }

    const result = await axios.post('/medicamentosAPI', {
      "medicamento": submitData
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );

    if (callback !== undefined) callback(result);

    if (result.status === 200) return getMedicamentos();
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

    if (callback !== undefined) callback(result);

    if (result.status === 200) return getMedicamentos();
  }

  const removeMedicamento = async (medicamento) => {
    const result = await axios.delete(`medicamentosAPI/${medicamento.id}`)

    if (result.status === 200) {
      getMedicamentos();

      return setAlert({ message: result.data.menssagem, variant: "success" })
    }

    return setAlert({ message: "Algum erro inesperado ocorreu por favor tente novamente mais tarde!", variant: "danger" });
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
      <a href="#" onClick={onClick} className={`${cssClass}`} data-bs-toggle="modal" data-bs-target={`#${target}`}>
        {buttonText}
      </a>

    );
  }

  return (
    <div className="min-vh-100 min-vw-100 container-fluid bg-light mt-5">
      <Modal id={'cadastroModal'} body={< MedicamentoForm submit={adicionarMedicamento} title={'Cadastrar medicamento:'} />} />
      <Modal id={'editarModal'} body={< MedicamentoForm submit={editarMedicamento} title={'Editar medicamento:'} values={produtoEdit} />} />
      {
        loading ?
          (<Loading />)
          :
          (error !== null ?
            (<ErrorMessage />)
            :
            (
              <div className="">
                {
                  (alert != null) &&
                  <div className={`m-3 alert alert-${alert.variant}`}>{alert.message}</div>
                }
                <ListaMedicamentos
                  controls={
                    <Controls action={<a href="#" className="btn btn-success rounded-0" data-bs-toggle="modal" data-bs-target="#cadastroModal">Cadastrar medicamento</a>} />}
                  medicamentos={medicamentos}
                  editar={(medicamento) => setProdutoEdit(medicamento)}
                  remove={(medicamento) => removeMedicamento(medicamento)}
                  editarBtn={(onClick) =>
                    <a onClick={onClick} data-bs-toggle="modal" data-bs-target="#editarModal" className="fs-3 m-3" href="#">
                      <i className="fa-regular fa-pen-to-square"></i>
                    </a>
                  } />
              </div>)
          )
      }
    </div >
  );
}

export default Medicamentos;