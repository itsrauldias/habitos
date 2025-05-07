# Etapa 1: Construção da imagem com o Node.js
FROM node:18-alpine AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para dentro do container
COPY . .

# Construir a aplicação React
RUN npm run build

# Etapa 2: Servir a aplicação com um servidor web simples
FROM nginx:alpine

# Copiar os arquivos de build do container anterior para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html


# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
