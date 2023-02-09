# Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol!

## Stack utilizada

**Front-end:** React, React Router Dom e Axios

**Back-end:** Node, Express, JWT, BcryptJS e MySQL

## Funcionalidades

- Desenvolvimento de um endpoint /login que permita o acesso a partir do front-end, verificando se os dados são válidos e encriptados.
- Verificação da existência de um email para acesso ao endpoint /login.
- Verificação da existência de uma senha para acesso ao endpoint /login.
- Inserir uma nova partida com times diferentes
- Retorna as classificações dos times da casa, considerando os dados iniciais do banco de dados. Partidas em andamento não são consideradas.
- Retorna as classificações dos times visitantes, considerando os dados iniciais do banco de dados. Partidas em andamento não são consideradas.
- Retorna a classificação geral dos times, considerando os dados iniciais do banco de dados. Partidas em andamento não são consideradas.
- Inserir uma nova partida com token válido
- Atualizar partidas em andamento

## Instalação

<details><summary> Rodando Localmente</summary>
<p>

```bash
# Clonar Projeto
$ git clone https://github.com/pedroygor/trybe-futebol-clube.git

# Entrar no diretório
$ cd trybe-futebol-clube

# Instalando dependências Front e Back
$ npm run postinstall

# Subir o docker
$ docker-compose up --build -d
```

</p>
</details>
</br>

Porta Front-End - [http://localhost:3000/](http://localhost:3000/)
Porta Back-End - [http://localhost:3001/](http://localhost:3001/)

### Login

***Email:*** user@user.com
***Senha:*** secret_user

