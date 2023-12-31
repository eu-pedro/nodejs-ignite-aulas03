# APP 

Gympass style app.

## RFs (Requisitos funcionais)

# É o que é possível o usuário fazer na aplicação, exemplo
# É possível que o usuário faça check-in na aplicação!

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado
- [ ] O check-in só pode ser validado por admnistradores;
- [ ] A academia só pode ser cadastradas por admnistradores;

## RNFs (Requisitos não-funcionais)

# Cada regra de negócio é atrelada a um requisito funcional, exemplo: 
# Um usuário só pode fazer check-in se estiver a mena de 10km da localização da academia!

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um jwt (json web token);