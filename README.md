# APP 

Gympass style app.

## RFs (Requisitos funcionais)

# É o que é possível o usuário fazer na aplicação, exemplo
# É possível que o usuário faça check-in na aplicação!

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um email duplicado;
- [ ] O usuário não pode fazer check-ins no mesmo dia;
- [ ] O usuário não pode fazer checko-in se não estiver perto(100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após ser criado
- [ ] O check-in só pode ser validado por admnistradores;
- [ ] A academia só pode ser cadastradas por admnistradores;

## RNFs (Requisitos não-funcionais)

# Cada regra de negócio é atrelada a um requisito funcional, exemplo: 
# Um usuário só pode fazer check-in se estiver a mena de 10km da localização da academia!

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco postgreSQL
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um jwt (json web token);