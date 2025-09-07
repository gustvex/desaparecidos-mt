### **`README.md`**

# Projeto Prático: Pessoas Desaparecidas - Mato Grosso

Este projeto é uma **Single Page Application (SPA)** desenvolvida como parte de um teste técnico. O objetivo é fornecer uma interface para que cidadãos possam consultar e enviar informações sobre pessoas desaparecidas ou localizadas.

-----

### **Visão Geral do Projeto**

A aplicação consome a API oficial da Polícia Judiciária Civil de Mato Grosso para gerenciar registros de pessoas desaparecidas e localizadas. A interface foi projetada para ser intuitiva e responsiva, garantindo uma experiência de usuário consistente em diferentes dispositivos.

### **Funcionalidades**

  * **Tela Inicial**:
      * Exibição em cards de pessoas desaparecidas ou localizadas.
      * Paginação para exibir no mínimo 10 registros por página.
      * Campo de busca para consulta de registros com os seguintes filtros: (`status` `sexo` `idade mínima` e `idade máxima`).
  * **Página de Detalhes**:
      * **Exibição de informações completas da pessoa, com destaque visual para os status `Localizada Viva`, `Localizada Morta` ou `Desaparecida`.**
  * **Envio de Informações Adicionais**:
      * Formulário para o cidadão enviar observações, localização e fotos.
      * Campos com máscaras de entrada (ex: datas).
  * **Temas Personalizáveis**:
      * Suporte para múltiplos temas (`light` e `dark`), permitindo que o usuário altere a aparência da aplicação.

-----

### **Tecnologias Utilizadas**

O projeto foi construído utilizando as seguintes ferramentas e bibliotecas:

  * **Frontend**: `Vite` com `React` e `TypeScript`.
  * **Estilização**: `Tailwind CSS`, com componentes `shadcn/ui` para agilidade no desenvolvimento.
  * **Rotas**: `React Router Dom` para navegação.
  * **Requisições API**: `axios`.
  * **Outras Bibliotecas**: `lucide-react`, `sonner`, entre outras.

-----

### **Lógica para Tags de Status**

A aplicação diferencia o status de uma pessoa de forma detalhada com base nos dados da API:

  * **Localizada Viva**: A tag **verde** é exibida quando a pessoa tem uma data de localização e o campo `vivo` é `true`.
  * **Localizada Morta**: A tag **vermelha** é exibida quando a pessoa tem uma data de localização e o campo `vivo` é `false`.
  * **Desaparecida**: A tag **vermelha** é exibida quando a pessoa não tem uma data de localização.

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

  * **Gustavo Oliveira de Moura**
  * **gustavooliveiraworks@gmail.com**
