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
          <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-id=${pessoa.id}>Editar</button>
          <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-id=${pessoa.id}>Excluir</button>
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

  // Função para excluir uma pessoa na API
  async function excluirPessoa(pessoaId) {
    try {
      const response = await fetch(`${apiUrl}/api/pessoas/${pessoaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        buscarPessoas();
        alert("Pessoa excluída com sucesso!");
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Erro ao excluir o registro.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Erro ao excluir pessoa:", error);
    }
  }

  function preencherFormulario(pessoa) {
    const nomeInput = document.getElementById('nome');
    const dataNascimentoInput = document.getElementById('dataNascimento');

    nomeInput.value = pessoa.nome;
    dataNascimentoInput.value = moment(pessoa.dataNascimento).format('YYYY-MM-DD');
  }

  async function atualizarPessoa(pessoaId, pessoa) {
    try {
      const response = await fetch(`${apiUrl}/api/pessoas/${pessoaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pessoa)
      });
      if (response.ok) {
        buscarPessoas();
        alert("Pessoa atualizada com sucesso!");
      } else {
        console.error('Erro ao atualizar pessoa:', response.status);
      }
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error);
    }
  }

  // Event listener para o formulário de cadastro
  formPessoa.addEventListener('submit', async event => {
    event.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
  
    const pessoa = { nome, dataNascimento };
  
    if (formPessoa.dataset.editId) {
      // Se tiver um ID no atributo "data-edit-id", é uma operação de atualização
      await atualizarPessoa(formPessoa.dataset.editId, pessoa);
    } else {
      // Caso contrário, é uma operação de cadastro
      cadastrarPessoa(pessoa);
    }
  
    formPessoa.reset();
    delete formPessoa.dataset.editId; // Limpa o atributo "data-edit-id" após a operação
  });
  

  // Event listener para os botões de excluir
  listaPessoas.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-danger")) {
      const pessoaId = event.target.dataset.id;
      const confirmExcluir = confirm("Deseja Excluir?");
      
      if (confirmExcluir) {
        await excluirPessoa(pessoaId);
      }
    }
  });

  listaPessoas.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-primary")) {
      const pessoaId = event.target.dataset.id;
      try {
        const response = await fetch(`${apiUrl}/api/pessoas/${pessoaId}`);
        const pessoa = await response.json();
        preencherFormulario(pessoa);
        formPessoa.dataset.editId = pessoaId; 
      } catch (error) {
        console.error("Erro ao buscar pessoa para edição:", error);
      }
    }
  });
  
  // Chama a função buscarPessoas ao carregar a página para exibir as pessoas cadastradas
  buscarPessoas();
});

