Com base em todas as informações que você compartilhou sobre o projeto (os requisitos, seu `package.json` e o `Dockerfile`), preparei um modelo de `README.md` completo para você usar.

Este `README.md` já inclui todas as seções importantes que um recrutador ou avaliador esperaria ver, detalhando o projeto, as tecnologias, e as instruções para execução.

-----

### **`README.md`**

# Projeto Prático: Pessoas Desaparecidas - Mato Grosso

Este projeto é uma **Single Page Application (SPA)** desenvolvida como parte de um teste técnico para a Polícia Judiciária Civil de Mato Grosso. O objetivo é fornecer uma interface para que cidadãos possam consultar e enviar informações sobre pessoas desaparecidas ou localizadas.

-----

### **Visão Geral do Projeto**

A aplicação consome a API oficial da Polícia Judiciária Civil de Mato Grosso para gerenciar registros de pessoas desaparecidas e localizadas. A interface foi projetada para ser intuitiva e responsiva, garantindo uma experiência de usuário consistente em diferentes dispositivos.

### **Funcionalidades**

  * **Tela Inicial**:
      * Exibição em cards de pessoas desaparecidas ou localizadas.
      * Paginação para exibir no mínimo 10 registros por página.
      * Campo de busca para consulta de registros.
  * **Página de Detalhes**:
      * Exibição de informações completas da pessoa.
      * Destaque visual para o status "Desaparecida" ou "Localizada".
  * **Envio de Informações Adicionais**:
      * Formulário para o cidadão enviar observações, localização e fotos.
      * Campos com máscaras de entrada (ex: datas).

-----

### **Tecnologias Utilizadas**

O projeto foi construído utilizando as seguintes ferramentas e bibliotecas:

  * **Frontend**: `Vite` com `React` e `TypeScript`.
  * **Estilização**: `Tailwind CSS`, com componentes `shadcn/ui` para agilidade no desenvolvimento.
  * **Rotas**: `React Router Dom` para navegação.
  * **Requisições API**: `axios`.
  * **Outras Bibliotecas**: `lucide-react`, `sonner`, entre outras.

-----

### **Como Rodar o Projeto**

Você pode executar a aplicação de duas formas: localmente (sem Docker) ou usando o Docker.

#### 1\. Executando Localmente

Certifique-se de ter o **Node.js** (versão 20 ou superior) e o **npm** instalados.

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
    npm run start
    ```
    A aplicação estará disponível em `http://localhost:5173`.

#### 2\. Executando com Docker

Se você tiver o Docker instalado, pode construir e rodar a aplicação em um contêiner, o que garante um ambiente isolado e padronizado.

1.  **Certifique-se de ter o `Dockerfile` e o `.dockerignore` na raiz do projeto.**
2.  **Construa a imagem do Docker:**
    ```bash
    docker build -t desaparecidos-mt .
    ```
3.  **Execute o contêiner:**
    ```bash
    docker run -p 8080:80 desaparecidos-mt
    ```
    A aplicação estará disponível em `http://localhost:8080`.

-----

### **Meus Dados de Inscrição**

  * [**Gustavo Oliveira de Moura**]
  * [**gustavooliveiraworks@gmail.com**]

-----
