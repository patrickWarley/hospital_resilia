import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const emptyMessage = (nameInput) => `O campo ${nameInput} não pode estar vazio`;

const schema = yup.object({
  email: yup.string().required(emptyMessage('email')).email("Digite um email valido!"),
  password: yup.string().required(emptyMessage('senha')).min(6),
  password_validation: yup.string().required(emptyMessage('confirme a senha')).oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  CRM: yup.string().required(emptyMessage('CRM')),
  nome: yup.string().required(emptyMessage('nome')),
  especialidade: yup.string().required(emptyMessage('especialidade')),
  data_nascimento: yup.date("Data de nascimento com valor invalido!").required(emptyMessage('data de nascimento')),
  sobrenome: yup.string().required(emptyMessage('sobrenome')),
})

function CadastroMedico() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(data) {
    console.log(data);
  }

  function showErrors() {
    if (Object.keys(errors).length === 0) return "";

    return (
      <ul className="list-group">
        {Object.keys(errors).map(error => <li className="text-muted">{errors[error].message}</li>)}
      </ul>
    )
  }

  return (
    <div className="min-vh-100 container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="form-card text-center p-4">
        <h4 className="m-5">Cadastro de novo medico:</h4>
        <form className="h-100" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-3 row">
            <div className="col-md-4">
              <label htmlFor="nome">Nome*</label>
              <input className="form-control" type="text" name="nome" id="nome" {...register("nome")} />
            </div>
            <div className="col-md-8">
              <label htmlFor="sobrenome">Sobrenome*</label>
              <input className="form-control" type="text" name="sobrenome" id="sobrenome" {...register("sobrenome")} />
            </div>
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="CRM">CRM*</label>
              <input className="form-control" type="text" name="CRM" id="CRM" {...register("CRM")} />
            </div>
            <div className="col">
              <label htmlFor="especialidade">Especialidade*</label>
              <input className="form-control" type="text" name="especialidade" id="especialidade" {...register("especialidade")} />
            </div>
            <div className="col">
              <label htmlFor="data_nas</>cimento">Data de nascimento*</label>
              <input className="form-control" type="date" name="data_nascimento" id="data_nascimento" {...register("data_nascimento")} />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">email*</label>
            <input className="form-control" type="email" name="email" id="email" />
          </div>

          <div className="form-group row mb-3">
            <div className="col">
              <label htmlFor="password">Senha*</label>
              <input className="form-control" type="password" name="password" id="password" {...register("password")} />
            </div>
            <div className="col">
              <label htmlFor="password_validation">Confirme a senha*</label>
              <input className="form-control" type="password" name="password_validation" id="password_validation" />
            </div>
          </div>
          <input className="btn w-100 btn-primary mt-5 px-5" type="submit" value="Cadastrar" />
          <span className="text-muted">Os campos com * não podem ficar vazios</span>
        </form>
      </div>
    </div>
  );
}

export default CadastroMedico;