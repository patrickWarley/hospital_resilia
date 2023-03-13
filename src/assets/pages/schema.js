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

export const schemaMedicoEdit = yup.object({
  email: yup.string().required(emptyMessage('email')).email("Digite um email valido!").max(100, "O email não pode ter mais de 100 caracteres."),
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

export const schemaUnidades = yup.object({
  cnpj: yup.string().required(emptyMessage('cnpj')).max(14, 'O campo CNPJ deve conter no maximo 11 caracteres.'),
  nome: yup.string().required(emptyMessage('nome')).max(50, "O campo nome pode ter no maximo 50 caracteres!"),
  endereco: yup.string().required(emptyMessage('endereco')).max(100, "O campo endereco pode ter no maximo 100 caracteres!"),
  telefone: yup.string().required(emptyMessage('telefone')).max(20, "O campo telefone pode ter no maximo 20 caracteres!")
});

export const schemaExames = yup.object({
  cpf: yup.string().required(emptyMessage('cpf')).max(14, 'O campo CPF deve conter no maximo 14 caracteres.'),
  nome_exame: yup.string().required(emptyMessage('nome_exame')).max(50, "O campo nome_exame pode ter no maximo 50 caracteres!"),
  descricao: yup.string().required(emptyMessage('descricao')).max(200, "O campo descricao pode ter no maximo 200 caracteres!"),
  crm: yup.string().required(emptyMessage('crm')).max(11, "O campo crm pode ter no maximo 11 caracteres!"),
  nome_paciente: yup.string().required(emptyMessage('nome_paciente')).max(100, "O campo nome_paciente pode ter no maximo 100 caracteres!")
});


export const schemaConsultas = yup.object({
  cpf_paciente: yup.string().required(emptyMessage('cpf paciente')).max(14, 'O campo cpf_paciente deve conter no maximo 14 caracteres.'),
  especialidade: yup.string().required(emptyMessage('especialidade')).max(50, "O campo especialidade pode ter no maximo 50 caracteres!"),
  data: yup.string().required(emptyMessage('Data')),
  crm: yup.string().required(emptyMessage('crm')).max(11, "O campo crm pode ter no maximo 11 caracteres!"),
  hora: yup.string().required(emptyMessage('hora')).max(100, "O campo nome_paciente pode ter no maximo 100 caracteres!"),
  motivo_procura: yup.string().required(emptyMessage('motivo_procura')).max(500, 'O campo motivo_procura pode ter no maximo 500 caracteres.'),
  observacao_medico: yup.string().required(emptyMessage('observacao_medico')).max(100, 'O campo motivo_procura pode ter no maximo 100 caracteres.'),
  id: yup.string()
});