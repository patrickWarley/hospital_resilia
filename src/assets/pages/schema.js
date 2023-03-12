import * as yup from "yup";

const emptyMessage = (nameInput) => `O campo ${nameInput} não pode estar vazio`;

export const schemaPaciente = yup.object({
  email: yup.string().required(emptyMessage('email')).email("Digite um email valido!").max(100, "O email não pode ter mais de 100 caracteres."),
  password: yup.string(),
  password_validation: yup.string(),
  cpf: yup.string().required(emptyMessage('cpf')).max(15, "O cpf deve ter 11 caracteres.").min(11, "O cpf deve ter 11 caracteres."),
  nome: yup.string().required(emptyMessage('nome')).max(50, "O nome não pode ter mais de 50 caracteres."),
  data_nascimento: yup.date("Data de nascimento com valor invalido!").required(emptyMessage('data de nascimento')),
  sobrenome: yup.string().required(emptyMessage('sobrenome')),
  telefone: yup.string().required(emptyMessage('telefone')).max(15, "O campo telefone pode ter no maximo 15 caracteres."),
  endereco: yup.string().required(emptyMessage('endereco')),
  id: yup.string()
})

export const schemaMedico = yup.object({
  email: yup.string().required(emptyMessage('email')).email("Digite um email valido!").max(100, "O email não pode ter mais de 100 caracteres."),
  password: yup.string().required(emptyMessage('senha')).min(6, 'A senha deve conter no minimo 6 caracteres.').max(30, "A senha deve possuir menos de 30 caracteres."),
  password_validation: yup.string().required(emptyMessage('confirme a senha')).oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
  crm: yup.string().required(emptyMessage('crm')).max(11, "O crm deve ter 11 caracteres.").min(11, "O crm deve ter 11 caracteres."),
  nome: yup.string().required(emptyMessage('nome')).max(50, "O nome não pode ter mais de 50 caracteres."),
  especialidade: yup.string().required(emptyMessage('especialidade')).max(50, "A especialidade nao pode ter mais de 50 caracteres."),
  data_nascimento: yup.date("Data de nascimento com valor invalido!").required(emptyMessage('data de nascimento')),
  sobrenome: yup.string().required(emptyMessage('sobrenome')),
  telefone: yup.string().required(emptyMessage('telefone')),
  endereco: yup.string().required(emptyMessage('endereco'))
});

export const schemaMedicamento = yup.object({
  nome: yup.string().required(emptyMessage('nome')),
  valor: yup.string().required(emptyMessage('valor')),
  validade: yup.date().required(emptyMessage('validade')),
  lote: yup.date().required(emptyMessage('lote')),
  qtd_estoque: yup.number().required(emptyMessage('Quantide em estoque'))
});