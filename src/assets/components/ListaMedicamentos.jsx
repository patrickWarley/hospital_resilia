function ListaMedicamentos({ medicamentos, controls, editar, editarBtn, remove }) {
  return (
    <div className="container d-flex flex-column align-items-center" >
      {controls && controls}

      <h4>Lista de medicamentos</h4>
      <div className="medicamentos-grid w-100">
        {
          medicamentos.length === 0 ? (
            <h5>Nenhum medicamento encontrado!</h5>
          )
            :
            medicamentos.map(medicamento => {
              return (
                <div className="grid-med d-inline-block" key={`listaMedicamento${medicamento.id}`}>
                  <div className="card">
                    <img src="https://karanzi.websites.co.in/obaju-turquoise/img/product-placeholder.png" alt={`Caixa do ${medicamento.nome}`} className="card-img-top" />
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6 d-flex">
                          < h5 className="card-title">{medicamento.nome}</h5>
                        </div>
                        <div className="col-6 d-flex justify-content-end">
                          {editarBtn(() => editar(medicamento))}
                          <a href="#" onClick={() => remove(medicamento)} className="fs-3 m-3"><i class="fa-solid fa-trash"></i></a>
                        </div>
                      </div>
                      <p className="card-text">Valor: {medicamento.valor}</p>
                      <p className="card-text">Lote : {medicamento.lote}</p>
                      <p className="card-text">Validade : {medicamento.validade}</p>
                      <p className="card-text">Quantidade em estoque: {medicamento.qtd_estoque}</p>
                    </div>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div >
  );
}

export default ListaMedicamentos;