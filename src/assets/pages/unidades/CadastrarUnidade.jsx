import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { schemaUnidades } from "../schema";

import Alert from "../../components/Alert";

function CadastrarUnidade() {
  const [alert, setAlert] = useState(null);

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaUnidades)
  });

  const resetAlert = () => {
    setAlert(null);
  }

  async function onSubmit(formdata) {
    try {
      console.log(formdata);

      //scroll to the top of the page
      window.scrollTo(0, 0);

      const result = await axios.post('/unidadesAPI/', { "unidade": formdata }, { headers: { 'Content-Type': 'application/json' } });
      const { data, status } = result;

      if (status !== 200) {
        setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });
        return setTimeout(resetAlert, 3000);
      }

      if (data.error) {
        setAlert({ mensagem: data.mensagem, variant: "danger" });
        return setTimeout(resetAlert, 3000);
      }

      setAlert({ mensagem: data.mensagem, variant: "success" });
      setTimeout(resetAlert, 3000)
      reset();

    } catch (e) {
      console.log(e);
      setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });
      return setTimeout(resetAlert, 3000)
    }

  }

  return (
    < div className="min-vh-100 container container-fluid d-flex flex-column" >
      <div className="form-card text-center w-100 p-4">

        {alert && <Alert className="mt-5 overflow-scroll" content={alert} />}

        <h4 className="m-5">Cadastrar unidade</h4>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3">
            <div>
              <label htmlFor="nome" className="form-label">Nome*</label>
              <input className="form-control" type="text" name="nome" id="nome" {...register("nome")} />
              <div className="text-danger">{errors['nome']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="cnpj">CNPJ*</label>
              <input className="form-control" type="text" name="cnpj" id="cnpj" {...register("cnpj")} />
              <div className="text-danger">{errors['cnpj']?.message}</div>
            </div>
            <div className="col">
              <label htmlFor="telefone" className="form-label">Telefone*</label>
              <input className="form-control" type="tel" name="telefone" id="telefone" {...register("telefone")} />
              <div className="text-danger">{errors['telefone']?.message}</div>
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="endereco">Endereco*</label>
            <input type="text" name="endereco" className="form-control" id="endereco" {...register("endereco")} />
            <div className="text-danger">{errors['endereco']?.message}</div>
          </div>
          <div className="row d-flex justify-content-center">
            <input className="btn col-12 col-md-3 btn-success mt-5 px-5" type="submit" value="Salvar" />
            <span className="text-muted">Os campos com * não podem ficar vazios</span>
          </div>
        </form>
      </div>
    </div >
  );
}

export default CadastrarUnidade;