import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeHolder from "../../images/placeholder.jpg"
import { FormatDate } from "../../util/Date"
import Controls from "../../components/Controls";
import MyDialog from "../../components/MyDialog";
import Alert from "../../components/Alert"

const API = "/examesAPI";

function Exames() {
  const [exames, setExames] = useState(null);
  const [showExames, setShowExames] = useState(null);
  const [filteredExames, setFilteredExames] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [alert, setAlert] = useState(null);

  const resetAlert = () => {
    return setTimeout(() => setAlert(null), 3000);
  }

  async function getExames() {
    try {
      //remember that axios return the data inside data
      const response = await axios.get(API);
      setExames(response.data);
      setShowExames(response.data);

      console.log(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (filteredExames === null) return setShowExames(exames);
    console.log(filteredExames)
    return setShowExames(filteredExames);
  }, [filteredExames]);

  async function deleteExame(id) {
    try {
      window.scrollTo(0, 0);

      const response = await axios.delete(`${API}/${id}`);
      const { data, status } = response;

      if (status !== 200) return setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });

      setOpenDialog(false);
      setAlert({ mensagem: data.mensagem, variant: (data.error ? "danger" : "success") });
      resetAlert();
      return getExames();

    } catch (e) {

      setAlert({ mensagem: "Algum erro ocorreu tente novamente mais tarde!", variant: "danger" });
      resetAlert();
      console.log(e)

    }
  }

  useEffect(() => {
    getExames();
  }, [])


  return (
    <div className="container mt-5 min-vh-100">
      <Controls
        buscaFN={(param) => {
          if (param.trim === "" || param === "" || param === null) return setFilteredExames(null);
          const result = exames.filter(exame => exame.nome_paciente.includes(param));
          return setFilteredExames(result);
        }}
        placeholder="Buscar por nome do paciente ..."
        action={<Link to="/cadastrarExame" className="btn btn-success rounded-0">Cadastrar Exame</Link>}
      />

      <MyDialog
        confirm={() => deleteExame(idDelete)}
        cancel={() => setOpenDialog(false)}
        title={"Excluir Exame"}
        description={"Ao clicar em confirmar voce excluirá o exame permanentemente da base de dados"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {alert !== null && <Alert content={alert} className="mt-2" />}

      <div className="container medicos-grid col-12">
        {
          showExames !== null ? (
            showExames.length !== 0 ?
              (
                <ul className="list-group mb-5">{
                  showExames.map(exame => {
                    return (
                      <li className="list-group-item p-5">{
                        <div className="row d-flex align-items-center justify-content-center position-relative">
                          <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                            <a onClick={() => {
                              setIdDelete(exame.id);
                              setOpenDialog(true);
                            }}>
                              <i className="m-2 fa-solid fa-trash-can"></i>
                            </a>
                            <Link className="" to={`/editarExame/${exame.id}`}>
                              <i className="m-2 fa-solid fa-pen"></i>
                            </Link>
                          </div>
                          <div className="col-12 col-md-12">
                            <p><span className="fw-bolder">Nome</span>: {exame.nome_exame}</p>
                            <p><span className="fw-bolder">Nome paciente</span>: {exame.nome_paciente}<br />
                              <span className="fw-bolder">CRM medico</span>:{exame.crm}</p>
                            <p><span className="fw-bolder">Descricao</span>: {exame.descricao}</p>
                          </div>
                        </div>
                      }</li>
                    )
                  })
                }</ul>)
              :
              (
                <h4>Nenhum exame cadastrado ainda!</h4>
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

export default Exames;