-----

# Desaparecidos MT

Este projeto, construído com **React** e **TypeScript**, utiliza o **Vite** para um ambiente de desenvolvimento rápido e eficiente. Ele serve como a interface de usuário para a plataforma **Desaparecidos MT**, que tem como objetivo auxiliar na busca por pessoas desaparecidas no estado de Mato Grosso.

-----

### O que é este projeto?

Este repositório contém o código frontend do **Desaparecidos MT**. A aplicação consome dados de uma API para exibir informações de pessoas desaparecidas, permitindo que a comunidade colabore na busca.

-----

### Instalação e Uso

Para começar a desenvolver, siga estes passos:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/gustvex/desaparecidos-mt.git
    cd desaparecidos-mt
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

O projeto será executado em `http://localhost:5173`.

-----

### Scripts Disponíveis

No diretório do projeto, você pode rodar os seguintes comandos:

  * **`npm run dev`**: Inicia o servidor de desenvolvimento com *Hot Module Replacement* (HMR).
  * **`npm run build`**: Compila o projeto para produção.
  * **`npm run lint`**: Executa o linter para encontrar e corrigir problemas de código.
  * **`npm run preview`**: Inicia um servidor local para visualizar a build de produção.

-----

### Plugins do Vite

Este projeto utiliza o `@vitejs/plugin-react` para oferecer um desenvolvimento com **Fast Refresh**. Para uma alternativa com melhor desempenho, você pode considerar o uso do `@vitejs/plugin-react-swc`.

-----

### Configuração do ESLint

Para garantir a qualidade do código, o projeto utiliza **ESLint** com regras específicas para **TypeScript** e **React**. Se você precisar de regras mais rigorosas ou específicas, pode expandir a configuração no arquivo `eslint.config.js`.

-----

### Como Contribuir

Sua contribuição é muito bem-vinda\! Se você encontrar um bug, tiver uma sugestão de melhoria ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma **issue** ou um **pull request**.
