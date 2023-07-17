const apiUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  // Elementos HTML
  const formPessoa = document.getElementById('formPessoa');
  const listaPessoas = document.getElementById('listaPessoas');

  // Função para exibir as pessoas cadastradas na tabela
  function exibirPessoas(pessoas) {
    listaPessoas.innerHTML = '';

    pessoas.forEach(pessoa => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${pessoa.id}</td>
        <td>${pessoa.nome}</td>
        <td>${moment(pessoa.dataNascimento).format('DD/MM/YYYY')}</td>
        <td>
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editarModal-${pessoa.id}">Editar</button>
          <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#excluirModal-${pessoa.id}">Excluir</button>
        </td>
      `;
      listaPessoas.appendChild(row);
    });
  }

  // Função para buscar todas as pessoas na API
  async function buscarPessoas() {
    try {
      const response = await fetch(`${apiUrl}/api/pessoas`);
      const data = await response.json();
      exibirPessoas(data);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
    }
  }

  // Função para cadastrar uma pessoa na API
  async function cadastrarPessoa(pessoa) {
    try {
      const response = await fetch(`${apiUrl}/api/pessoas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });

      if (response.ok) {
        buscarPessoas();
      } else {
        console.error('Erro ao cadastrar pessoa:', response.status);
      }
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
    }
  }

  // Event listener para o formulário de cadastro
  formPessoa.addEventListener('submit', async event => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    const pessoa = { nome, dataNascimento };
    cadastrarPessoa(pessoa);

    formPessoa.reset();
  });

  // Chama a função buscarPessoas ao carregar a página para exibir as pessoas cadastradas
  buscarPessoas();
});
