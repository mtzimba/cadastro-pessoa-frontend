# Definir a imagem base
FROM node:14

# Criar o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Expor a porta em que a aplicação estará ouvindo
EXPOSE 3001

# Comando para iniciar a aplicação quando o container for iniciado
CMD [ "node", "server.js" ]
