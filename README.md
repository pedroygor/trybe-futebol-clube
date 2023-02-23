<h1 align="center">Trybe Futebol Clube</h1>

<p align="center">
  <img src="/app/frontend/src/images/tfc.jpg" width="100%"/>
</p>

## Sobre o projeto

O TFC é um site informativo sobre partidas e classificações de futebol!

## Stack utilizada

**Front-end:** React, Hooks e Axios

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


Porta Front-End - [http://localhost:3000](http://localhost:3000)</br>
Porta Back-End - [http://localhost:3001](http://localhost:3001)

### Login

***Email:*** user@user.com</br>
***Senha:*** secret_user

---

## Documentação API

### Authenticate

#### Realizar Login

```http
POST /login
```

| Parâmetro            | Tipo                    | Descrição                              |
| :------------------- | :---------------------- | :------------------------------------- |
| `email`</br> `senha` | `string` </br> `string` | **Obrigatório:** email e senha |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "email": "admin@admin.com",
  "password": "secret_admin"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>All fields must be filled</code> caso o campo email não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>All fields must be filled</code> caso o campo password não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>Incorrect email or password</code> caso o campo email seja inválido no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>Incorrect email or password</code> caso o campo password seja inválido no body da requisição;<br>
</details>
</br>

#### Validar Login

```http
GET /login/validate
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `authorization` | `string` | **Obrigatório:** token de autenticação no header |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{ "role": "admin" }
```

</details>
<br>

### Teams

#### Retorna todos os times

```http
GET /teams
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  // ...
]
```

</details>
</br>

#### Retorna um Time

```http
GET /teams/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório:** O ID do time que você quer  |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{
  "id": 1,
  "teamName": "Avaí/Kindermann"
}
```

</details>
</br>

### Matches

#### Retorna todas as partidas

```http
GET /matches
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  // ...
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  }
]
```

</details>
</br>

#### Retorna lista de partidas em andamento

```http
GET /matches?inProgress=true
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 41,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Internacional"
    }
  },
  {
    "id": 42,
    "homeTeam": 6,
    "homeTeamGoals": 1,
    "awayTeam": 1,
    "awayTeamGoals": 0,
    "inProgress": true,
    "teamHome": {
      "teamName": "Ferroviária"
    },
    "teamAway": {
      "teamName": "Avaí/Kindermann"
    }
  }
]
```

</details>
</br>

#### Retorna lista de partidas finalizadas

```http
GET /matches?inProgress=false
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 1,
    "awayTeam": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "São Paulo"
    },
    "teamAway": {
      "teamName": "Grêmio"
    }
  },
  {
    "id": 2,
    "homeTeam": 9,
    "homeTeamGoals": 1,
    "awayTeam": 14,
    "awayTeamGoals": 1,
    "inProgress": false,
    "teamHome": {
      "teamName": "Internacional"
    },
    "teamAway": {
      "teamName": "Santos"
    }
  }
]
```

</details>
</br>

#### Cria partida em andamento

```http
POST /matches
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `homeTeam` </br> `awayTeam` </br> `homeTeamGoals` </br> `awayTeamGoals` </br> `inProgress`| `number` </br> `number` </br> `number` </br> `number` </br> `boolean` | **Obrigatório:** Todos os campos obrigatórios </br> Adicionar ao **Header** o token de autenticação obrigatório em `authorization`   |


<details>
  <summary>Exemplo do <code>body</code> da requisição:</summary>

```json
{
  "homeTeam": 16, // O valor deve ser o id do time
  "awayTeam": 8, // O valor deve ser o id do time
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
  "inProgress": true
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>

```json
{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>It is not possible to create a match with two equal teams</code> caso informe o mesmo valor para ambos os campos homeTeam e awayTeam body da requisição;<br>
  - A rota retorna o código <code>404</code>, com a mensagem <code>There is no team with such id!</code> caso informe um id de time inválido no body da requisição;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token must be a valid token</code> caso informe um token de autenticação inválido no campo authorization dos headers da requisição;<br>
</details>

</br>

#### Finaliza partida em andamento

```http
PATCH /matches/:id/finish
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
{ "message": "Finished" }
```

</details>
</br>

#### Altera os dados de uma partida em andamento

```http
PATCH /matches/:id
```

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>

```json
{
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```

</details>

<details>
  <summary>Exemplo de Resposta da requisição com status 200:</summary>

```json
{
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 3,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
}
```

</details>
</br>

### Leaderboards

#### Retorna a classificação do campeonato

```http
GET /leaderboard
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": "86.67"
  },
  // ...
  {
    "name": "Napoli-SC",
    "totalPoints": 2,
    "totalGames": 5,
    "totalVictories": 0,
    "totalDraws": 2,
    "totalLosses": 3,
    "goalsFavor": 3,
    "goalsOwn": 12,
    "goalsBalance": -9,
    "efficiency": "13.33"
  }
]
```

</details>
</br>

#### Classificação baseada apenas nos jogos em casa

```http
GET /leaderboard/home
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Santos",
    "totalPoints": 9,
    "totalGames": 3,
    "totalVictories": 3,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 9,
    "goalsOwn": 3,
    "goalsBalance": 6,
    "efficiency": "100.00"
  },
  // ...
  {
    "name": "Bahia",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 0,
    "goalsOwn": 4,
    "goalsBalance": -4,
    "efficiency": "0.00"
  }
]
```

</details>
</br>

#### Classificação baseada apenas nos jogos fora de casa

```http
GET /leaderboard/away
```

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 6,
    "totalGames": 2,
    "totalVictories": 2,
    "totalDraws": 0,
    "totalLosses": 0,
    "goalsFavor": 7,
    "goalsOwn": 0,
    "goalsBalance": 7,
    "efficiency": "100.00"
  },
  // ...
  {
    "name": "Napoli-SC",
    "totalPoints": 0,
    "totalGames": 3,
    "totalVictories": 0,
    "totalDraws": 0,
    "totalLosses": 3,
    "goalsFavor": 1,
    "goalsOwn": 10,
    "goalsBalance": -9,
    "efficiency": "0.00"
  }
]
```

</details>

## Autor

- [@pedroygor](https://www.github.com/pedroygor)
