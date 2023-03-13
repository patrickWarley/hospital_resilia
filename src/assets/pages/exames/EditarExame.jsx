import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import { useParams } from "react-router-dom";
import { FormatDate } from "../../util/Date";
import Alert from "../../components/Alert";
import { schemaExames } from "../schema";

function EditarExame() {
  const [alert, setAlert] = useState(null);
  const [exame, setExame] = useState(null);
  const { id } = useParams();

  const getExame = async () => {
    try {
      const result = await axios.get(`/examesAPI/${id}`);
      setExame(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaExames), defaultValues: {
      nome_paciente: "",
      nome_exame: "",
      descricao: "",
      cpf: "",
      crm: "",
      id: ""
    }
  });


  const resetAlert = () => {
    setAlert(null);
  }

  useEffect(() => {
    getExame();
  }, []);

  useEffect(() => {
    reset({
      ...exame
    })
  }, [exame]);

  async function onSubmit(formdata) {
    try {
      console.log(formdata);

      //scroll to the top of the page
      window.scrollTo(0, 0);

      const result = await axios.put(`/examesAPI/${formdata.id}`, { "exame": formdata }, { headers: { 'Content-Type': 'application/json' } });
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

        <h4 className="m-5">Editar exame:</h4>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="nome_paciente" className="form-label">Nome paciente*</label>
              <input
                className="form-control"
                type="text"
                name="nome_paciente"
                id="nome_paciente"
                {...register("nome_paciente")}
              />
              <div className="text-danger">{errors['nome_paciente']?.message}</div>
            </div>

            <div className="col">
              <label className="form-label" htmlFor="cpf">CPF</label>
              <input
                className="form-control"
                type="text"
                name="cpf"
                id="cpf"
                {...register("cpf")}
              />
              <div className="text-danger">{errors['cpf']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="crm">CRM Medico*</label>
              <input className="form-control" type="text" name="crm" id="crm" {...register("crm")} />
              <div className="text-danger">{errors['crm']?.message}</div>
            </div>

            <div className="col">
              <label className="form-label" htmlFor="nome_exame">Nome exame*</label>
              <input className="form-control" type="text" name="nome_exame" id="nome_exame" {...register("nome_exame")} />
              <div className="text-danger">{errors['nome_exame']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="descricao" className="form-label">Descricao*</label>
              <input className="form-control" type="text" name="descricao" id="descricao" {...register("descricao")} />
              <div className="text-danger">{errors['descricao']?.message}</div>
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

export default EditarExame;