# Por quê testar?

"É impensável desenvolver profissionalmente sem incluir testes."

- Confiança ao fazer refactoring;
- Confiança ao incluir novas funcionalidades;
- Confiança ao atualizar dependências;
- Facilidade para compreender a implementação;
- Funciona como uma documentação do projeto;

## Tipos de testes:

#### Testes de unidade

São testes pequenos, a nível de função.

#### Testes de integração

Testes utilizados para tudo que possui dependência. Ex: o funcionamento de um componente que conecta com uma API de terceiros.

#### Testes de fluxo da aplicação (End To End (E2E))

Testes a nível do que o meu usuário vai encontrar.

# TDD

`Write a failing test > Make the test pass > Refactor`

### Vantagens

- Melhora a implementação
- Facilita implementações mais simples
- Facilita escrita dos testes
- Detalhes de implementação frescos na mente
- Menor tempo dedicado a bug fixing

### Desafios

- Curva de aprendizado
- Maior tempo de desenvolvimento
- Difícil de vender ao time de produto
