
# Sistema de Gestão de uma Pizzaria 2.0

## Objetivo:
Desenvolver uma aplicação web para uma pizzaria, simulando um sistema real de pedidos, comandas, entregas e administração, utilizando React + React Router + Context API + Hooks.

## Bibiliotecas a serem utilizadas
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [react-hook-form](https://www.npmjs.com/package/react-hook-form)
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers)
- [React-Toastify](https://www.npmjs.com/package/react-toastify)
- [react-tooltip](https://www.npmjs.com/package/react-tooltip)
- [yup](https://www.npmjs.com/package/yup)

## Requisitos Funcionais

### 1. Autenticação
* Tela de login com verificação de usuário/senha (mockado ou via API).
* Armazenamento do token ou sessão (localStorage ou context).
* Área pública (login) e áreas protegidas (painel, pedidos etc.).

### 2. Cardápio de Pizzas 
 * Listagem de pizzas com:
    * Nome
    * Ingredientes
    * Tamanho (Pequena, Média, Grande)
    * Preço
    * Imagem
    * Filtro por ingredientes ou tipo.
    * Opção para adicionar ao carrinho/pedido.

### 3. Carrinho / Comanda 
*  Visualizar pizzas adicionadas com:
    * Quantidade
    * Total acumulado
    * Botão para enviar pedido para a cozinha
    * Opção para informar número da mesa ou entrega com endereço.
    * Componente reutilizável de item da comanda
  
### 4. Painel da Cozinha
 * Lista dos pedidos em preparação.
* Visualizar detalhes (pizzas, mesa ou endereço).
* Botão "Pedido pronto" → move para área de entrega.

### 5. Painel de Entrega / Mesas
* Lista de pedidos prontos para entrega ou consumo no local.
* Botão "Entregue" ou "Servido".


### 6. Administração (somente admin)
* Cadastrar novas pizzas no cardápio.
* Editar ou excluir pizzas.
* Visualizar histórico de pedidos.

## Requisitos Técnicos
* React 18+
* React Router Dom para rotas e navegação
* Context API para autenticação e carrinho
* Hooks: useState, useEffect, useContext, useMemo
* Componentização: criar componentes reutilizáveis (ex: PizzaCard, Comanda, PedidoItem)
* Estilização com Material UI ou Bootstrap
Simular backend com:
* json-server ou usar uma API de teste
* Responsividade: layout funcional em dispositivos móveis
Funcionalidades para dar mais charme a sua aplicação:
* Adicionar notificações com Toastify
* Implementar dark mode
* Gerar relatórios de vendas
* Utilizar React Hook Form + Yup no cadastro de pizzas
* Criar versão PWA para uso em dispositivos móveis

