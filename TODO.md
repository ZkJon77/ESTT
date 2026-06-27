# TODO - Login e Cadastro Funcionando

## Backend
- [x] Implementar fluxo de **cadastro**: `POST /api/auth/register`
- [x] Implementar fluxo de **login**: `POST /api/auth/login`
- [x] Criar autenticação simples com **persistência local** (arquivo JSON) + **hash de senha**
- [x] Retornar JWT no login e validar no backend quando necessário

## Frontend (Next)
- [ ] Integrar `app/login/page.tsx` com as rotas do backend
- [ ] Ajustar validações e exibir erros vindos do backend
- [ ] Salvar token no `localStorage` após login/cadastro e redirecionar

## Verificação
- [ ] Subir backend e testar login/cadastro via browser
- [ ] Testar fluxos de erro (email repetido, senha inválida)

