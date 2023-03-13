import { useState } from "react";

const Controls = ({ action, buscaFN, placeholder }) => {
  const [busca, setBusca] = useState("");
  function submit(e) {
    e.preventDefault();
    buscaFN(busca)
  }

  function handleChange(e) {
    if (e.target.value === "") buscaFN("");
    return setBusca(e.target.value);
  }

  return (
    <div
      className="overflow-hidden container d-flex p-2 bg-dark mb-5 flex-column ">
      <form onSubmit={submit} className="w-100 mb-2 d-flex justify-content-between">
        <input className="w-100 h-100 p-2" type="text" name="search" id="search" onChange={handleChange} placeholder={placeholder} value={busca} />
        <input className=" mx-2 btn btn-primary rounded-0" type="submit" value="Pesquisar" />
      </form>
      <div>
        {action}
      </div>
    </div >
  );
}

export default Controls;