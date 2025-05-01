## App

@GymPass Style App

## 1 RFs (Requisitos Funcionais)
- [x] 1.1 Deve ser possível se cadastrar;
- [x] 1.2 Deve ser possível autenticar-se;
- [x] 1.3 Deve ser possível obter o perfil de um usuário logado;
- [x] 1.4 Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [x] 1.5 Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] 1.6 Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] 1.7 Deve ser possível o usuário buscar academias pelo nome;
- [x] 1.8 Deve ser possível o usuário realizar check-in em uma academia;
- [x] 1.9 Deve ser possível validar o check-in de um usuário.
- [x] 1.10 Deve ser possível cadastrar uma academia.

## 2 RNs (Regras de Negócio)
- [x] 2.1 O usuário não pode se cadastrar com e-mail ou cpf duplicado; (1.1)
- [x] 2.8.1 O usuário não pode fazer check-in se não estiver perto (100m) da academia; (1.8)
- [X] 2.8.2 O usuário não pode fazer +1 check-ins no mesmo dia; (1.8)
- [x] 2.9.1 O check-in só pode ser vaidado até 20 minutos após ser criado; (1.9)
- [x] 2.9.2 O check-int só pode ser validado por administradores; (1.9)
- [x] 2.10 A academia só pode ser cadastrada por administradores; (1.10)

## 3 RNFs (Requisitos não funcionais)

- [x] 3.1 A senha do usuário precisa estar criptograda;
- [x] 3.2 Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] 3.3 Toda lista de dados precisam estar paginadas com 20 itens por páginas;
- [x] 3.4 O usuário deve ser identificado por um JWT (JSON Web Token);

## AGORA SUPERAR O DDD E DEPOIS PARTIU NESTJS