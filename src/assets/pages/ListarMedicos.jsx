import { useEffect, useState } from "react";

const mockMedicos = () => {
  var result = [];

  for (let i = 0; i < 10; i++)
    result.push({
      nome: `${i}marcelo`,
      sobrenome: "silva",
      CRM: `${Math.random() * 2000}`,
      data_nascimento: new Date(),
      especialidade: "Proctologista",
    });

  return result;
}

function ListarMedicos() {
  const [medicos, setMedicos] = useState(null);

  function getMedicos() {
    setMedicos(mockMedicos());
  }

  useEffect(() => {
    getMedicos();
  }, [])

  return (
    <div className="container-fluid mt-5 min-vh-100 vw-100">
      <div className="controls col-lg-8 container py-3 d-flex flex-column">
        <form className="" onSubmit={{}}>
          <input className="rounded p-1 col-10" type="text" name="buscar" id="buscar" placeholder="Pesquisar:" />
          <input className="btn col-2 btn-secondary " type="submit" value="Buscar" />
        </form>
        <input className="btn btn-success w-25 mt-4" type="button" value="Adicionar" />
      </div>

      <div className="container medicos-grid col-lg-8">
        <ul className="list-group mb-5">{
          medicos?.map(medico => {
            return (
              <li className="list-group-item p-5">{
                <div className="row d-flex align-items-center justify-content-center position-relative">
                  <div className="commands position-absolute top-0 end-0 d-flex" style={{ width: '50px', color: 'red' }}>
                    <i className="m-2 fa-solid fa-trash-can"></i>
                    <i className="m-2 fa-solid fa-pen"></i>
                  </div>

                  <div className="col-12 m-5 m-md-0 col-md-4">
                    <img
                      className="img-medico"
                      src="https://randomuser.me/api/portraits/lego/2.jpg"
                      alt="Foto do medico"
                      style={{ width: "100px" }}
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <p><span className="fw-bolder">Nome</span>: {medico.nome} {medico.sobrenome}</p>
                    <p><span className="fw-bolder">CRM</span>: {medico.CRM}<br />
                      <span className="fw-bolder">Data de nascimento</span>: {medico.data_nascimento.toLocaleDateString("en-US")}</p>
                    <p><span className="fw-bolder">Especialidade</span>: {medico.especialidade}</p>
                  </div>
                </div>
              }</li>
            )
          })
        }</ul>
      </div>
    </div>

  );
}

export default ListarMedicos;