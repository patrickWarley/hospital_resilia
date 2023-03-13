import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import placeHolder from "../../images/placeholder.jpg";
import { FormatDate } from "../../util/Date"
import Controls from "../../components/Controls";
import MyDialog from "../../components/MyDialog";
import Alert from "../../components/Alert"

const API = "/pacientesAPI";

function Pacientes() {
  const [pacientes, setPacientes] = useState(null);
  const [showPacientes, setShowPacientes] = useState(null);
  const [filteredPacientes, setFilteredPacientes] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const resetAlert = () => {
    return setTimeout(() => setAlert(null), 3000);
  }

  async function getPacientes() {
    try {
      //remember that axios return the data inside data
      const response = await axios.get(API);
      setPacientes(response.data);
      setShowPacientes(response.data);

      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (filteredPacientes === null) return setShowPacientes(pacientes);
    return setShowPacientes(filteredPacientes);
  }, [filteredPacientes]);

  async function deletePaciente(id) {
    try {
      window.scrollTo(0, 0);

      const response = await axios.delete(`${API}/${id}`);
      const { data, status } = response;

      if (status !== 200) return setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });

      setOpenDialog(false);

      setAlert({ mensagem: data.mensagem, variant: (data.error ? "danger" : "success") });
      resetAlert();
      return getPacientes();

    } catch (e) {

      setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });
      resetAlert();
      console.log(e)

    }
  }

  useEffect(() => {
    getPacientes();
  }, [])


  return (
    <div className="container mt-5 min-vh-100">
      <Controls
        buscaFN={(param) => {
          if (param.trim === "" || param === "" || param === null) return setFilteredPacientes(null);
          const result = pacientes.filter(paciente => paciente.cpf.includes(param));
          return setFilteredPacientes(result);
        }}
        placeholder="Buscar por CPF ..."
        action={<Link to="/cadastroPaciente" className="btn btn-success rounded-0">Cadastrar Paciente</Link>}
      />

      <MyDialog
        confirm={() => deletePaciente(idDelete)}
        cancel={() => setOpenDialog(false)}
        title={"Excluir Paciente"}
        description={"Ao clicar em confirmar voce excluirá o paciente permanentemente da base de dados"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {alert !== null && <Alert content={alert} className="mt-2" />}

      <div className="container medicos-grid col-12">
        {
          showPacientes !== null ? (
            showPacientes.length !== 0 ?
              (
                <ul className="list-group mb-5">{
                  showPacientes.map(paciente => {
                    return (
                      <li className="list-group-item p-5">{
                        <div className="row d-flex align-items-center justify-content-center position-relative">
                          <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                            <a onClick={() => {
                              setIdDelete(paciente.id);
                              setOpenDialog(true);
                            }}>
                              <i className="m-2 fa-solid fa-trash-can"></i>
                            </a>
                            <Link className="" to={`/editarPaciente/${paciente.id}`}>
                              <i className="m-2 fa-solid fa-pen"></i>
                            </Link>
                          </div>
                          <div className="col-12 m-5 m-md-0 col-md-4">
                            <img
                              className="figure-image img-fluid rounded"
                              src={placeHolder}
                              alt="Foto do paciente"
                              style={{ width: "100px" }}
                            />
                          </div>
                          <div className="col-12 col-md-8">
                            <p><span className="fw-bolder">Nome</span>: {paciente.nome} {paciente.sobrenome}</p>
                            <p><span className="fw-bolder">CPF</span>: {paciente.cpf}<br />
                              <span className="fw-bolder">Data de nascimento</span>: {FormatDate(paciente.data_nascimento, 'YYYY-MMM-DD')}</p>
                            <p><button className="btn btn-primary" disabled>Consultas</button></p>
                          </div>
                        </div>
                      }</li>
                    )
                  })
                }</ul>)
              :
              (
                <h4>Nenhum paciente cadastrado ainda!</h4>
              )
          ) :
            (
              <h4>Ocorreu algum erro</h4>
            )

        }
      </div>
    </div >

  );
}

export default Pacientes;