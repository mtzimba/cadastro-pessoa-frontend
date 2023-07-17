# Aplicação de Cadastro de Pessoas

Este é o frontend de uma aplicação para realizar operações de cadastro de pessoas.

## Funcionalidades

A aplicação possui as seguintes funcionalidades:

- Exibir todas as pessoas cadastradas.
- Cadastrar uma nova pessoa.
- Visualizar os detalhes de uma pessoa.
- Editar os dados de uma pessoa.
- Excluir uma pessoa.

## Como Executar

### Executando Localmente

Para executar a aplicação localmente, siga os passos abaixo:

1. Certifique-se de ter o Node.js instalado em sua máquina.

2. Faça o clone do repositório ou baixe o código-fonte.

3. Abra o terminal na pasta raiz do projeto.

4. Execute o seguinte comando para instalar as dependências necessárias:

   ```
   npm install
   ```

5. Após a instalação das dependências, execute o seguinte comando para iniciar a aplicação:

   ```
   npm start
   ```

6. A aplicação estará disponível em `http://localhost:3001`. Você poderá acessar a página de cadastro de pessoas e interagir com as funcionalidades.

### Executando com Docker

Para executar a aplicação utilizando o Docker, siga os passos abaixo:

1. Certifique-se de ter o Docker instalado em sua máquina.

2. Faça o clone do repositório ou baixe o código-fonte.

3. Abra o terminal na pasta raiz do projeto.

4. Execute o seguinte comando para criar a imagem do Docker:

   ```
   docker build -t nome-da-imagem .
   ```

   Substitua `nome-da-imagem` pelo nome desejado para a imagem Docker.

5. Após a criação da imagem, execute o seguinte comando para iniciar o contêiner Docker:

   ```
   docker run -p 80:3001 nome-da-imagem
   ```

   Substitua `nome-da-imagem` pelo nome da imagem Docker que você definiu anteriormente.

6. A aplicação estará disponível em `http://localhost`. Você poderá acessar a página de cadastro de pessoas e interagir com as funcionalidades.

## Dependências

A aplicação utiliza as seguintes dependências:

- Bootstrap: framework CSS para estilização e layout.
- Moment.js: biblioteca JavaScript para manipulação de datas e formatação.
- Outras dependências específicas podem ser encontradas no arquivo `package.json`.

Certifique-se de ter todas as dependências instaladas antes de executar a aplicação.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests com melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
