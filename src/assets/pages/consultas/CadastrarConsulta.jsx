import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import Alert from "../../components/Alert";
import { schemaConsultas } from "../schema";

function CadastrarConsulta() {
  const [alert, setAlert] = useState(null);

  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaConsultas)
  });

  const resetAlert = () => {
    setAlert(null);
  }

  async function onSubmit(formdata) {
    try {
      console.log(formdata);

      //scroll to the top of the page
      window.scrollTo(0, 0);

      const result = await axios.post('/consultasAPI/', { "consulta": formdata }, { headers: { 'Content-Type': 'application/json' } });
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
    <div className="min-vh-100 container container-fluid d-flex flex-column">
      <div className="form-card text-center w-100 p-4">

        {alert && <Alert className="mt-5 overflow-scroll" content={alert} />}

        <h4 className="m-5">Cadastrar consulta:</h4>
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="cpf_paciente" className="form-label">CPF paciente*</label>
              <input
                className="form-control"
                type="text"
                name="cpf_paciente"
                id="cpf_paciente"
                {...register("cpf_paciente")}
              />
              <div className="text-danger">{errors['cpf_paciente']?.message}</div>
            </div>

            <div className="col">
              <label className="form-label" htmlFor="cpf">CRM medico*</label>
              <input
                className="form-control"
                type="text"
                name="crm"
                id="crm"
                {...register("crm")}
              />
              <div className="text-danger">{errors['crm']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label className="form-label" htmlFor="especialidade">Especialidade</label>
              <input className="form-control" type="text" name="especialidade" id="especialidade" {...register("especialidade")} />
              <div className="text-danger">{errors['especialidade']?.message}</div>
            </div>

            <div className="col">
              <label className="form-label" htmlFor="data">Data*</label>
              <input className="form-control" type="date" name="data" id="data" {...register("data")} />
              <div className="text-danger">{errors['data']?.message}</div>
            </div>

            <div className="col">
              <label className="form-label" htmlFor="hora">Hora*</label>
              <input className="form-control" type="time" name="hora" id="hora" {...register("hora")} />
              <div className="text-danger">{errors['hora']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="motivo_procura" className="form-label">Motivo procura*</label>
              <input className="form-control" type="text" name="motivo_procura" id="motivo_procura" {...register("motivo_procura")} />
              <div className="text-danger">{errors['motivo_procura']?.message}</div>
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="observacao_medico" className="form-label">Observacão medico*</label>
              <input className="form-control" type="text" name="observacao_medico" id="observacao_medico" {...register("observacao_medico")} />
              <div className="text-danger">{errors['observacao_medico']?.message}</div>
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

export default CadastrarConsulta;