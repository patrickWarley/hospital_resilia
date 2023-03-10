import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";

import Alert from "../../components/Alert";

const emptyMessage = (nameInput) => `O campo ${nameInput} não pode estar vazio`;

const schema = yup.object({
  email: yup.string().required(emptyMessage('email')).email("Digite um email valido!").max(100, "O email não pode ter mais de 100 caracteres."),
  password: yup.string().required(emptyMessage('senha')).min(6, 'A senha deve conter no minimo 6 caracteres.').max(30, "A senha deve possuir menos de 30 caracteres."),
  password_validation: yup.string().required(emptyMessage('confirme a senha')).oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  CRM: yup.string().required(emptyMessage('CRM')).max(11,"O CRM deve ter 11 caracteres.").min(11, "O CRM deve ter 11 caracteres."),
  nome: yup.string().required(emptyMessage('nome')).max(50, "O nome não pode ter mais de 50 caracteres."),
  especialidade: yup.string().required(emptyMessage('especialidade')).max(50, "A especialidade nao pode ter mais de 50 caracteres."),
  data_nascimento: yup.date("Data de nascimento com valor invalido!").required(emptyMessage('data de nascimento')),
  sobrenome: yup.string().required(emptyMessage('sobrenome')),
  telefone: yup.string().required(emptyMessage('telefone'))
})

function CadastroMedico() { 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const[alert, setAlert] = useState(null);

  async function onSubmit(formdata) {
    try{

      const { password_validation, ...rest } = formdata;

      const result = await axios.post('/medicosAPI/', { "medico": rest }, { headers: {'Content-Type': 'application/json'} });

      const { data, status } = result;

      if (status !== 200) return setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });

      if (data.error) return setAlert({ mensagem: data.mensagem, variant: "danger" });

      return setAlert({ mensagem: data.mensagem, variant: "success" });
    }catch(e){
      console.log(e);
      return setAlert({ mensagem: "Erro no servidor por favor tente novamente mais tarde!", variant: "danger" });
    }
    
  }

  return (
    <div className="min-vh-100 container container-fluid d-flex flex-column">
      <div className="form-card text-center w-100 p-4">

        <Alert alert={alert}/>

        <h4 className="m-5">Cadastro de novo medico:</h4>
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
              <label className="form-label" htmlFor="CRM">CRM*</label>
              <input className="form-control" type="text" name="CRM" id="CRM" {...register("CRM")} />
              <div className="text-danger">{errors['CRM']?.message}</div>
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

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="password" className="form-label">Senha*</label>
              <input className="form-control" type="password" name="password" id="password" {...register("password")} />
              <div className="text-danger">{errors['senha']?.message}</div>
            </div>
            <div className="col">
              <label htmlFor="password_validation" className="form-label">Confirme a senha*</label>
              <input className="form-control" type="password" name="password_validation" id="password_validation" {...register("password_validation")}/>
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

export default CadastroMedico;