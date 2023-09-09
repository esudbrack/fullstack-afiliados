# Fullstack Afiliados
>  This is a challenge by [Coodesh](https://coodesh.com/)

O objetivo desse teste é avaliar minhas habilidades em programação.

# Tecnologias utilizadas
Frontend: React / MUI (Material UI)
Backend: Node / Adonis.js / MySQL
## Rodando o projeto
### Backend
- Crie o banco utilizando o docker compose no diretorio do backend ```docker compose -f "docker-compose.yml" up -d --build```
- Copie o conteúdo do .env.example para seu .env
- Rode um ```npm install``` para instalar as dependências do projeto
- Instale o CLI do adonis: ```npm i --global @adonisjs/cli```
- Para criar as tabelas no banco utilize o CLI do adonis: ```adonis migration:run```
- ```npm start```
### Frontend
- ```npm i```
- ```npm start```

## Descrição do projeto

Surgiu uma nova demanda urgente e precisamos de uma área exclusiva para fazer o
upload de um arquivo das transações feitas na venda de produtos por nossos
clientes.

Nossa plataforma trabalha no modelo criador-afiliado, sendo assim um criador
pode vender seus produtos e ter 1 ou mais afiliados também vendendo esses
produtos, desde que seja paga uma comissão por venda.

Sua tarefa é construir uma interface web que possibilite o upload de um arquivo
de transações de produtos vendidos, normalizar os dados e armazená-los em um
banco de dados relacional.

Você deve utilizar o arquivo [sales.txt](sales.txt) para fazer o teste da
aplicação. O formato esá descrito na seção "Formato do arquivo de entrada".



## URL da apresentação

