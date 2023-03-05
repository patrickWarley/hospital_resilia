function ListaMedicamentos({ medicamentos, controls, editar, editarBtn, remove }) {
  return (
    <div className="container d-flex flex-column align-items-center" style={{ marginTop: '100px', marginBottom: '100px' }}>
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
                      {editarBtn(() => editar(medicamento))}
                      <button className="btn btn-danger" onClick={() => remove(medicamento)}>Remover</button>
                      < h5 className="card-title">{medicamento.nome}</h5>
                      <p className="card-text">Valor: {medicamento.valor}</p>
                      <p className="card-text">Lote : {medicamento.lote}</p>
                      <p className="card-text">Validade : {medicamento.validade}</p>
                      <p className="card-text">Quantidade em estoque: {medicamento.qtd_estoque}</p>
                      <a href={`/medicamentosAPI/${medicamento.id}`} className="btn btn-primary"> Mais Informações ...</a>
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