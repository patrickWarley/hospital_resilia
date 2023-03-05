import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const emptyMessage = (nameInput) => `O campo ${nameInput} não pode estar vazio`;

const schema = yup.object({
  nome: yup.string().required(emptyMessage('nome')),
  valor: yup.string().required(emptyMessage('valor')),
  validade: yup.date().required(emptyMessage('validade')),
  lote: yup.date().required(emptyMessage('lote')),
  qtd_estoque: yup.number().required(emptyMessage('Quantide em estoque'))
})

function MedicamentoForm({ submit, title, values }) {
  const initialValues = null || { nome: "", valor: 0, qtd_estoque: 0, validade: "", lote: "" };
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema), values
  });

  function onSubmit(data) {
    submit(data);
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
    <div>
      <p className="fs-3">{title}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="mt-2" htmlFor="nome">Nome: </label>
          <input className="w-100 form-control" type="text" id="nome" name="nome" {...register('nome')} />
        </div>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="valor" className="mt-2">Preco: </label>
            <input className="form-control" type="number" id="valor" name="valor" {...register('valor')} />
          </div>
          <div className="col-6">
            <label htmlFor="qtd_estoque" className="mt-2">Quantidade em estoque: </label>
            <input className="form-control" type="number" name="qtd_estoque" id="qtd_estoque" {...register('qtd_estoque')} />
          </div>
        </div>

        <div className="form-group row  ">
          <div className="col-12 col-md-6">
            <label htmlFor="validade" className="mt-2">Data de validade:</label>
            <input className="form-control" type="date" name="validade" id="validade"  {...register('validade')} />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="lote" className="mt-2">Lote</label>
            <input className="form-control" type="date" name="lote" id="lote" {...register('lote')} />
          </div>
        </div>

        <input className="mt-5 px-3 btn btn-success" type="submit" value={'salvar'} />
      </form >
    </div >
  );
}

export default MedicamentoForm;