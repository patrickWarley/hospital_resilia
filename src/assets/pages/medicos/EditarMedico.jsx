import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormatDate } from "../../util/Date";
import Alert from "../../components/Alert";
import { schemaMedicoEdit } from "../schema";

function EditarMedico() {
  const [alert, setAlert] = useState(null);
  const [medico, setMedico] = useState(null);
  const { id } = useParams();

  const getMedico = async () => {
    try {
      const result = await axios.get(`/medicosAPI/${id}`);

      const formatedResult = { ...result.data, data_nascimento: FormatDate(result.data_nascimento, "YYYY-MM-DD") };

      setMedico(formatedResult);

    } catch (e) {
      console.log(e);
    }
  }

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaMedicoEdit), defaultValues: {
      email: "",
      password: "",
      password_validation: "",
      crm: "",
      nome: "",
      especialidade: "",
      data_nascimento: "",
      sobrenome: "",
      telefone: "",
      endereco: "",
      id: ""
    }
  });


  const resetAlert = () => {
    setAlert(null);
  }

  useEffect(() => {
    getMedico();
  }, []);

  useEffect(() => {
    console.log(medico)
    reset({
      ...medico
    })
  }, [medico]);

  async function onSubmit(formdata) {
    try {
      console.log(formdata);

      //scroll to the top of the page
      window.scrollTo(0, 0);

      const { password_validation, ...rest } = formdata;
      const submitData = { ...rest, data_nascimento: FormatDate(rest.data_nascimento, 'YYYY-MM-DD') }
      const result = await axios.put(`/medicosAPI/${rest.id}`, { "medico": submitData }, { headers: { 'Content-Type': 'application/json' } });
      const { data, status } = result;

      console.log(data, status)

      if (status !== 200) {
        setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });
        return setTimeout(resetAlert, 3000);
      }

      if (data.error) {
        setAlert({ mensagem: data.mensagem, variant: "danger" });
        return setTimeout(resetAlert, 3000);
      }

      setAlert({ mensagem: data.mensagem, variant: "success" });
      setTimeout(resetAlert, 3000);

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

        <h4 className="m-5">Editar informa????es do medico</h4>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="id" id="id" {...register("id")} />
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
              <label className="form-label" htmlFor="crm">crm*</label>
              <input className="form-control" type="text" name="crm" id="crm" {...register("crm")} />
              <div className="text-danger">{errors['crm']?.message}</div>
            </div>
            <div className="col">
              <label htmlFor="especialidade" className="form-label">Especialidade*</label>
              <input className="form-control" type="text" name="especialidade" id="especialidade" {...register("especialidade")} />
              <div className="text-danger">{errors['especialidade']?.message}</div>
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

          <div className="row d-flex justify-content-center">
            <input className="btn col-12 col-md-3 btn-success mt-5 px-5" type="submit" value="Salvar" />
            <span className="text-muted">Os campos com * n??o podem ficar vazios</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarMedico;