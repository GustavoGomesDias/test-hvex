# Job Test - Gerenciamento de usuário

CRUD com login

➡ [Descrição do teste](https://github.com/GustavoGomesDias/test-hvex/blob/main/test-description.md)

➡ [Documentação online](https://hvex.herokuapp.com/docs/)

➡ [Link da API](https://hvex.herokuapp.com) (status: on ✔ - Vai precisar de alguma ferramenta para testes de API, explicado na seção de como rodar localmente)

## 📕 Sumário
1. [Tecnologias usadadas](https://github.com/GustavoGomesDias/test-hvex#1--tecnologias-usadas)
2. [Para rodar o projeto LOCALMENTE](https://github.com/GustavoGomesDias/test-hvex#2--para-rodar-o-projeto-localmente)
3. [Configurar variáveis de ambiente](https://github.com/GustavoGomesDias/test-hvex#3--vari%C3%A1veis-de-ambiente-necess%C3%A1rio-no-heroku-tamb%C3%A9m)

## 1. 💻 Tecnologias usadas
* NodeJS;
* MongoDB;
* Express;
* Mongoose;
* Swagger;
* Bcrypt;
* JWT;
* ES Lint AirBnB.

## 2. 🎉 Para rodar o projeto localmente
1. Clone o repositório e navegue até a pasta dele:

    ```
    git clone https://github.com/GustavoGomesDias/test-hvex.git 
    ```

2. Instale todas es tec's usadas junto do Node JS:

    ```
    npm install
    ```
3. Crie um arquivo .env na raiz do projeto, adicione as informações seguindo o arquivo .env.example, que é um exemplo de como configurar as variáveis de ambiente, atentando para as explicações na seção 4

4. Você precisará de uma ferramente de teste de requisições como o [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) ou então pode fazer toda a requisiçaõ pela doc gerada pelo Swagger.
   a. Para usar o Swagger, vá em src/swagger.json e na seção "servers" muda a url para http://localhost:3001
   ```json
   ...
     "servers": [
      {
        "url": "https://hvex.herokuapp.com", // => mude para http://localhost:3001
        "description": "Local Host API Test"
      }
    ],
   ...
   ```

5. Caso use uma ferramenta de teste de requisições, utilize http://localhost:3001 para usar a API

## 3.  Variáveis de Ambiente (necessário no Heroku também)
`TOKEN_EXPIRATION`: Tempo em que o token gerado ao fazer login irá ficar ativo (lembrando que é um token JWT);

`TOKEN_SECRET`: Palavra secreta uada na hora de gerar o token (token JWT);

`DATABASE_PASSWORD`: (Usado apenas se for usar o Mongodb Atlas) Senha do admin do banco de dados no Mongodb Atlas;

`DATABASE_USER`: (Usado apenas se for usar o Mongodb Atlas) Nome de usuário do admin do banco de dados no Mongodb Atlas

## Autor
<table>
  <tr>
    <td align="center"><a href="https://github.com/GustavoGomesDias"><img src="https://github.com/GustavoGomesDias.png" width="100px;" alt="Profile"/><br /><sub><b>Gustavo</b></sub></a><br /><a href="https://github.com/GustavoGomesDias" title="Code">😎</a></td>
  <tr>
</table>
