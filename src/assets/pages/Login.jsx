import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Por favor preencha o email!").email("Digite um email valido!"),
  password: yup.string().required("Por favor digite a senha!").min(6)
})

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="min-vh-100 container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="form-card bg-danger col-sm-6 col-md-4 col-lg-4 text-center p-4">
        <h4 className="m-5">Login</h4>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input className="form-control" type="text" name="email" id="email" {...register("email")} />
            <span className="form-text text-muted text-danger">{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input className="form-control" type="password" name="pasword" id="password" {...register("password")} />
            <span className="form-text text-muted text-danger">{errors.password?.message}</span>
          </div>

          <input className="btn w-100 btn-primary mt-5 px-5" type="submit" value="Login" />
          <span>Ainda não possui um cadastro?</span>
          <a href="">Fale com o administrador</a>
        </form>
      </div>
    </div>
  );
}

export default Login;