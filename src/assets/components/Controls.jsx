const Controls = ({action}) => {
  return (
    <div
      className="overflow-hidden container d-flex p-2 bg-dark mb-5 flex-column ">
      <div className="w-100 mb-2 d-flex justify-content-between">
        <input className="w-100 h-100 p-2" type="text" name="search" id="search" placeholder="Nome, valor ..." />
        <input className=" mx-2 btn btn-primary rounded-0" type="button" value="Pesquisar" />
      </div>
      <div>
        {action}
      </div>
    </div >
  );
}

export default Controls;