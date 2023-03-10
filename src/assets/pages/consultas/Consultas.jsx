import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Controls from "../../components/Controls";
import MyDialog from "../../components/MyDialog";
import Alert from "../../components/Alert"

const API = "/consultasAPI";

function Consultas() {
  const [showConsultas, setShowConsultas] = useState(null);
  const [consultas, setConsultas] = useState(null);
  const [filteredConsultas, setFilteredConsultas] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const resetAlert = () => {
    return setTimeout(() => setAlert(null), 3000);
  }

  useEffect(() => {
    if (filteredConsultas === null) return setShowConsultas(consultas);

    return setShowConsultas(filteredConsultas);

  }, [filteredConsultas])

  async function getConsultas() {
    try {
      //remember that axios return the data inside data
      const response = await axios.get(API);
      setConsultas(response.data);
      setShowConsultas(response.data);

      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteConsulta(id) {
    try {
      window.scrollTo(0, 0);

      const response = await axios.delete(`${API}/${id}`);
      const { data, status } = response;
      console.log(data)
      if (status !== 200) return setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });

      setOpenDialog(false);
      setAlert({ mensagem: data.mensagem, variant: (data.error ? "danger" : "success") });
      resetAlert();
      return getConsultas();

    } catch (e) {

      setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });
      resetAlert();
      console.log(e)

    }
  }

  useEffect(() => {
    getConsultas();
  }, [])


  return (
    <div className="container mt-5 min-vh-100">
      <Controls
        buscaFN={(param) => {
          if (param.trim === "" || param === "" || param === null) return setFilteredConsultas(null);
          const result = consultas.filter(consulta => consulta.cpf_paciente.includes(param));
          setFilteredConsultas(result);
        }}
        placeholder="Buscar por CPF"
        action={<Link to="/cadastrarConsulta" className="btn btn-success rounded-0">Cadastrar consulta</Link>}
      />

      <MyDialog
        confirm={() => deleteConsulta(idDelete)}
        cancel={() => setOpenDialog(false)}
        title={"Excluir consulta"}
        description={"Ao clicar em confirmar voce excluir?? a consulta permanentemente da base de dados"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {alert !== null && <Alert content={alert} className="mt-2" />}

      <div className="container medicos-grid col-12">
        {
          showConsultas !== null ? (
            showConsultas.length !== 0 ?
              (
                <ul className="list-group mb-5">{
                  showConsultas.map(consulta => {
                    return (
                      <li className="list-group-item p-5">{
                        <div className="row d-flex align-items-center justify-content-center position-relative">
                          <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                            <a onClick={() => {
                              setIdDelete(consulta.id);
                              setOpenDialog(true);
                            }}>
                              <i className="m-2 fa-solid fa-trash-can"></i>
                            </a>
                            <Link className="" to={`/editarConsulta/${consulta.id}`}>
                              <i className="m-2 fa-solid fa-pen"></i>
                            </Link>
                          </div>
                          <div className="col-12 col-md-12">
                            <p><span className="fw-bolder">Especialidade</span>: {consulta.especialidade}</p>
                            <p><span className="fw-bolder">Motivo procura</span>: {consulta.motivo_procura}<br />
                              <span className="fw-bolder">Observa????o medico</span>:{consulta.observacao_medico}</p>
                            <p><span className="fw-bolder">CPF</span>: {consulta.cpf_paciente}</p>
                          </div>
                        </div>
                      }</li>
                    )
                  })
                }</ul>)
              :
              (
                <h4>Nenhum consulta cadastrada ainda!</h4>
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

export default Consultas;