import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { schemaPaciente } from "../schema";

import { FormatDate } from "../../util/Date";
import Alert from "../../components/Alert";

function CadastroPaciente() {
  const [sucesso, setSuccesso] = useState(false);
  const [alert, setAlert] = useState(null);

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaPaciente)
  });

  useEffect(() => {
    reset();
  }, [sucesso]);

  const resetAlert = () => {
    setAlert(null);
  }

  async function onSubmit(formdata) {
    try {
      console.log(formdata);

      //scroll to the top of the page
      window.scrollTo(0, 0);

      const { password_validation, ...rest } = formdata;
      const submitData = { ...rest, data_nascimento: FormatDate(rest.data_nascimento, 'YYYY-MM-DD') }
      const result = await axios.post('/pacientesAPI/', { "paciente": submitData }, { headers: { 'Content-Type': 'application/json' } });
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
      setSuccesso(true);

    } catch (e) {
      console.log(e);
      setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });
      return setTimeout(resetAlert, 3000)
    }

  }

  return (
    <div className="min-vh-100 container container-fluid d-flex flex-column">
      <div className="form-card text-center w-100 p-4">

        {alert && <Alert className="mt-5 overflow-scroll" content={alert} />}

        <h4 className="m-5">Cadastro de novo paciente:</h4>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="nome" className="form-label">Nome*</label>
              <input className="form-control" type="text" name="nome" id="nome" {...register("nome")} />
              <div className="text-danger">{errors['nome']?.message}</div>
            </div>
            <div className="col">
              <label className="form-label" htmlFor="sobrenome">Sobrenome*</label>
              <input className="form-control" type="text" name="sobrenome" id="sobrenome" {...register("sobrenome")} />
              <div className="text-danger">{errors['sobrenome']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="cpf">cpf*</label>
              <input className="form-control" type="text" name="cpf" id="cpf" {...register("cpf")} />
              <div className="text-danger">{errors['cpf']?.message}</div>
            </div>
            <div className="col">
              <label htmlFor="data_nascimento" className="form-label">Data de nascimento*</label>
              <input className="form-control" type="date" name="data_nascimento" id="data_nascimento" {...register("data_nascimento")} />
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="email" className="form-label">email*</label>
              <input className="form-control" type="email" name="email" id="email" {...register("email")} />
              <div className="text-danger">{errors['email']?.message}</div>
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
          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label">Senha*</label>
              <input className="form-control" type="password" name="password" id="password" {...register("password")} />
              <div className="text-danger">{errors['senha']?.message}</div>
            </div>
            <div className="col">
              <label htmlFor="password_validation" className="form-label">Confirme a senha*</label>
              <input className="form-control" type="password" name="password_validation" id="password_validation" {...register("password_validation")} />
              <div className="text-danger">{errors['password_validation']?.message}</div>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <input className="btn col-12 col-md-3 btn-primary mt-5 px-5" type="submit" value="Cadastrar" />
            <span className="text-muted">Os campos com * não podem ficar vazios</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CadastroPaciente;