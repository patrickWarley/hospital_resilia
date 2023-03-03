function ListaMedicamentos({medicamentos}){
  return(
    <div className="container d-flex flex-column align-items-center" style={{marginTop:'100px'}}>
      <h1>Lista de medicamentos</h1>
      <div className="medicamentos-grid">
      {
        medicamentos.length===0?(
          <h1>Nenhum medicamento encontrado!</h1>
        )
        :
        medicamentos.map(medicamento => {
          return(
            <div className="" key={`listaMedicamento${medicamento.id}`}>
              <div className="card">
                <img src="" alt={`Caixa do ${medicamento.nome}`} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{medicamento.nome}</h5>
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
      </div>
  );
}

export default ListaMedicamentos;