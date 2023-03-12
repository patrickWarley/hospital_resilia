import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Alert from "../../components/Alert";
import Controls from "../../components/Controls";
import MyDialog from "../../components/MyDialog";

import placeHolder from "../../images/maps.jpg";

function Unidades() {
  const [unidades, setUnidades] = useState(null);
  const [error, setError] = useState(false);
  const [openDialog, setOpenDialog] = useState(false)
  const [alert, setAlert] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  async function getUnidades() {
    try {
      const result = await axios.get('/unidadesAPI');

      if (result.status !== 200 || result.data.error) return setError(true);
      return setUnidades(result.data)
    } catch (e) {
      console.log(e);
      return setError(true);
    }
  }

  const resetAlert = () => {
    return setTimeout(() => setAlert(null), 3000);
  }

  async function deleteUnidade(id) {
    try {
      window.scrollTo(0, 0);

      setOpenDialog(false);

      const result = await axios.delete(`/unidadesAPI/${id}`);

      const { status, data } = result;

      if (status !== 200) {
        setAlert({ mensagem: "Algum erro inesperado ocorreu, por favor tente novamente mais tarde!", variant: "danger" });
        return resetAlert();
      }
      if (data.error) {
        setAlert({ mensagem: data.mensagem, variant: "danger" });
        return resetAlert();
      }

      setAlert({ mensagem: data.mensagem, variant: "success" });
      resetAlert();
      return getUnidades();

    } catch (e) {
      setError(true);
      console.log(e);
    }
  }

  useEffect(() => {
    getUnidades()
  }, []);

  return (
    <div className="container mt-5 min-vh-100">
      <Controls
        action={
          <Link to="/cadastrarUnidade" className="btn btn-success rounded-0">Cadastrar Unidade</Link>}
      />

      <MyDialog
        confirm={() => deleteUnidade(idDelete)}
        cancel={() => setOpenDialog(false)}
        title={"Excluir Unidade"}
        description={"Ao clicar em confirmar voce excluirá a unidade permanentemente da base de dados"}
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
      />

      {alert !== null && <Alert content={alert} className="mt-2" />}

      <div className="container medicos-grid col-12">
        {
          unidades !== null ? (
            unidades.length !== 0 ?
              (
                <ul className="list-group mb-5">{
                  unidades.map(unidade => {
                    return (
                      <li className="list-group-item p-5">{
                        <div className="row d-flex align-items-center justify-content-center position-relative">
                          <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                            <a onClick={() => {
                              setIdDelete(unidade.id);
                              setOpenDialog(true);
                            }}>
                              <i className="m-2 fa-solid fa-trash-can"></i>
                            </a>
                            <Link className="" to={`/editarUnidade/${unidade.id}`}>
                              <i className="m-2 fa-solid fa-pen"></i>
                            </Link>
                          </div>
                          <div className="col-12 m-5 m-md-0 col-md-4">
                            <img
                              className="figure-image img-fluid rounded"
                              src={placeHolder}
                              alt="Map"
                              style={{ width: "100px" }}
                            />
                          </div>
                          <div className="col-12 col-md-8">
                            <p><span className="fw-bolder">Nome</span>: {unidade.nome}</p>
                            <p><span className="fw-bolder">CNPJ</span>: {unidade.cnpj}<br />
                              <span className="fw-bolder">Endereço</span>:{unidade.endereco}</p>
                            <p><span className="fw-bolder">Telefone</span>:{unidade.telefone}</p>
                          </div>
                        </div>
                      }</li>
                    )
                  })
                }</ul>)
              :
              (
                <h4>Nenhuma unidade cadastrada ainda!</h4>
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

export default Unidades;