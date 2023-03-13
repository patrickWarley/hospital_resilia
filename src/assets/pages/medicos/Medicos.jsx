import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeHolder from "../../images/placeholder.jpg"
import { FormatDate } from "../../util/Date"
import Controls from "../../components/Controls";
import MyDialog from "../../components/MyDialog";
import Alert from "../../components/Alert"

const API = "/medicosAPI";

function Medicos() {
  const [medicos, setMedicos] = useState(null);
  const [showMedicos, setShowMedicos] = useState(null);
  const [filteredMedicos, setFilteredMedicos] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const resetAlert = () => {
    return setTimeout(() => setAlert(null), 3000);
  }

  async function getMedicos() {
    try {
      //remember that axios return the data inside data
      const response = await axios.get(API);
      setMedicos(response.data);
      setShowMedicos(response.data);

      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (filteredMedicos === null) return setShowMedicos(medicos);
    return setShowMedicos(filteredMedicos);
  }, [filteredMedicos])

  async function deleteMedico(id) {
    try {
      window.scrollTo(0, 0);

      const response = await axios.delete(`${API}/${id}`);
      const { data, status } = response;

      if (status !== 200) return setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });

      setOpenDialog(false);
      setAlert({ mensagem: data.mensagem, variant: (data.error ? "danger" : "success") });
      resetAlert();
      return getMedicos();

    } catch (e) {

      setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });
      resetAlert();
      console.log(e)

    }
  }

  useEffect(() => {
    getMedicos();
  }, [])


  return (
    <div className="container mt-5 min-vh-100">
      <Controls
        buscaFN={(param) => {
          if (param.trim === "" || param === "" || param === null) return setFilteredMedicos(null);
          const result = medicos.filter(medico => medico.nome.includes(param));
          return setFilteredMedicos(result);
        }}
        placeholder="Buscar por nome ..."
        action={<Link to="/cadastroMedico" className="btn btn-success rounded-0">Cadastrar Medico</Link>}
      />

      <MyDialog
        confirm={() => deleteMedico(idDelete)}
        cancel={() => setOpenDialog(false)}
        title={"Excluir Medico"}
        description={"Ao clicar em confirmar voce excluirá o medico permanentemente da base de dados"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {alert !== null && <Alert content={alert} className="mt-2" />}

      <div className="container medicos-grid col-12">
        {
          showMedicos !== null ? (
            showMedicos.length !== 0 ?
              (
                <ul className="list-group mb-5">{
                  showMedicos.map(medico => {
                    return (
                      <li className="list-group-item p-5">{
                        <div className="row d-flex align-items-center justify-content-center position-relative">
                          <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                            <a onClick={() => {
                              setIdDelete(medico.id);
                              setOpenDialog(true);
                            }}>
                              <i className="m-2 fa-solid fa-trash-can"></i>
                            </a>
                            <Link className="" to={`/editarMedico/${medico.id}`}>
                              <i className="m-2 fa-solid fa-pen"></i>
                            </Link>
                          </div>
                          <div className="col-12 m-5 m-md-0 col-md-4">
                            <img
                              className="figure-image img-fluid rounded"
                              src={placeHolder}
                              alt="Foto do medico"
                              style={{ width: "100px" }}
                            />
                          </div>
                          <div className="col-12 col-md-8">
                            <p><span className="fw-bolder">Nome</span>: {medico.nome} {medico.sobrenome}</p>
                            <p><span className="fw-bolder">CRM</span>: {medico.crm}<br />
                              <span className="fw-bolder">Data de nascimento</span>: {FormatDate(medico.data_nascimento, 'YYYY-MMM-DD')}</p>
                            <p><span className="fw-bolder">Especialidade</span>: {medico.especialidade}</p>
                          </div>
                        </div>
                      }</li>
                    )
                  })
                }</ul>)
              :
              (
                <h4>Nenhum medico cadastrado ainda!</h4>
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

export default Medicos;