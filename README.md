-----

## Desaparecidos MT

**Desaparecidos MT** é uma plataforma inovadora desenvolvida para auxiliar na busca por pessoas desaparecidas no estado de Mato Grosso. Utilizando tecnologia web, o projeto visa criar uma ponte entre a sociedade e as informações sobre casos de desaparecimento, facilitando o compartilhamento de dados e aumentando as chances de reencontro.

### Funcionalidades

  * **Listagem de Desaparecidos:** Uma galeria intuitiva onde é possível visualizar fotos, nomes e detalhes de pessoas desaparecidas.
  * **Filtros de Busca:** Facilita a localização de informações específicas através de filtros como nome, cidade e data de desaparecimento.
  * **Detalhes do Caso:** Ao clicar em um perfil, o usuário tem acesso a informações detalhadas, incluindo idade, características físicas e contatos para denúncias ou informações.
  * **Contribuição da Comunidade:** A plataforma é construída para permitir a colaboração. Os usuários podem submeter informações relevantes, ajudando a manter os dados atualizados.

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
