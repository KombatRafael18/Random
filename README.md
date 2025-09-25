# N8N Custom Node: True Random Number Generator

![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![n8n](https://img.shields.io/badge/n8n-1A1A1A?style=for-the-badge&logo=n8n&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

Este repositório contém um conector (nó) customizado para a plataforma de automação **n8n**, desenvolvido como solução para um desafio técnico. O objetivo do conector é estender as capacidades do n8n, oferecendo uma integração direta com a API do **Random.org** para a geração de números inteiros verdadeiramente aleatórios.

---

## 📖 Sobre o Projeto

O conector `Random` permite que usuários do n8n gerem um número aleatório dentro de um intervalo definido, utilizando a API pública do Random.org, que baseia seus números em ruído atmosférico.

Este projeto abrange desde a criação do nó em TypeScript até sua conteinerização completa com Docker e Docker Compose, garantindo um ambiente de desenvolvimento e execução limpo e portável.

### Principais Funcionalidades

* **Operação Única:** "True Random Number Generator".
* **Parâmetros de Entrada:** Inputs `Min` e `Max` para definir o intervalo do número a ser gerado.
* **Integração Externa:** Utiliza obrigatoriamente o endpoint `GET /integers/` do Random.org.
* **Identidade Visual:** Possui um ícone SVG customizado para fácil identificação na interface do n8n.
* **Ambiente Conteinerizado:** Totalmente configurado para ser executado com Docker, sem a necessidade de instalar Node.js ou outras dependências localmente.

---

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias e ferramentas:

* **Plataforma:** n8n (`@latest`)
* **Linguagem:** TypeScript
* **Ambiente de Execução:** Node.js `v22` (LTS)
* **Orquestração:** Docker & Docker Compose

---

## Como Instalar e Executar

Siga os passos abaixo para clonar, construir e executar a aplicação localmente.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas na sua máquina:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

### Passos para Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/KombatRafael18/Random.git
    ```

2.  **Construa e inicie os contêineres:**
    Este comando irá construir a imagem Docker customizada e iniciar o serviço em background.
    ```bash
    docker compose up --build -d
    ```
    *Aguarde alguns instantes para que a imagem seja construída e os serviços sejam iniciados.*

3.  **Acesse o n8n:**
    A interface do n8n estará disponível no seu navegador no seguinte endereço:
    **[http://localhost:5678](http://localhost:5678)**

### Como Usar o Nó no n8n

Após iniciar a aplicação, siga estes passos para testar o conector:

1.  Crie um novo workflow em branco (*"Add workflow"*).
2.  Clique no botão `+` para adicionar um novo nó.
3.  Na barra de busca, procure por **"Random"**.
4.  Clique no nó para adicioná-lo ao canvas.
5.  No painel de configuração, defina os valores de `Min` e `Max`.
6.  Clique em **"Execute step"** para executar o nó e ver o número aleatório gerado na aba "Output".

![WhatsApp Image 2025-09-24 at 10 04 50 PM](https://github.com/user-attachments/assets/773f749e-cb7d-4c99-965a-65434b1a441d)


---

## Configuração de Ambiente

Este projeto foi desenhado para ser executado **"out-of-the-box"**, sem a necessidade de configurar variáveis de ambiente (`.env`). Todas as configurações necessárias para a comunicação entre o n8n e o banco de dados, bem como para o carregamento do nó customizado, estão contidas nos arquivos `docker-compose.yml`.

---

## Testes

A verificação da funcionalidade do nó deve ser realizada manualmente através da interface do n8n, conforme descrito na seção **"Como Usar o Nó no n8n"**.

---

## Estrutura do Projeto e Ferramentas

O projeto está organizado seguindo as convenções da comunidade n8n e utilizando um conjunto de ferramentas modernas para garantir a qualidade, consistência e portabilidade do código. Abaixo está a descrição detalhada da estrutura e do papel de cada arquivo relevante.

```
/Random/
├── nodes/
│   └── Random/
│       ├── Random.node.json
│       ├── Random.node.ts
│       └── Random.svg
├── .dockerignore
├── .editorconfig
├── .eslintrc.js
├── .eslintrc.prepublish.js
├── .gitignore
├── .prettierrc.js
├── docker-compose.yml
├── Dockerfile
├── gulpfile.js
├── index.js
├── LICENSE.md
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```

### Orquestração e Ambiente

* **`Dockerfile`**: Constrói uma imagem Docker que contém o n8n e o nosso nó customizado já compilado e instalado. Garante que o projeto rode em qualquer ambiente que tenha Docker.
* **`docker-compose.yml`**: Orquestra a inicialização e a rede entre os contêineres da aplicação (`n8n`) e do banco de dados (`PostgreSQL`), gerenciando também os volumes de dados.
* **`.dockerignore`**: Otimiza o processo de build da imagem Docker, instruindo-o a ignorar arquivos e pastas desnecessárias (como `node_modules`), resultando em uma imagem final mais leve e segura.

### Código-Fonte do Nó

* **`nodes/Random/`**: Diretório que abriga o código-fonte do nó (TS, JSON, SVG), seguindo a convenção do n8n.

### Manifesto e Dependências

* **`package.json`**: O manifesto do projeto e dependências.
* **`package-lock.json`**: Garante que todos os desenvolvedores (e o ambiente de build do Docker) usem as mesmas versões exatas dos pacotes, tornando as instalações 100% reprodutíveis.

### Qualidade de Código e Automação

* **`gulpfile.js`**: Um script de automação de tarefas usando a ferramenta Gulp. No template do n8n, sua função principal é processar o arquivo `Random.svg`, para que o ícone seja parte do arquivo `.js` e não um arquivo separado.
* **`index.js`**: Ele exporta as classes dos nós a partir da pasta `dist` (após a compilação), permitindo que o n8n descubra e carregue o conector.
* **`.prettierrc.js`**: Arquivo de configuração do Prettier. Garante que todo o código siga um estilo visual consistente.
* **`.eslintrc.js` & `.eslintrc.prepublish.js`**: Arquivos de configuração do ESLint. O primeiro define as regras de linting para o desenvolvimento do dia a dia (ajudando a encontrar bugs e a manter padrões). O segundo, `prepublish`, Contém regras e é usado como uma verificação de qualidade final antes de publicar o pacote.
* **`.editorconfig`**: Garante que estilos básicos de codificação sejam consistentes entre diferentes editores de texto e IDEs (VS Code, WebStorm, etc.).

---

Qualquer informação adicional, estou à disposição para esclarecer.

**Rafael Ferraz Barra**
* rafafbarra@gmail.com
* https://www.linkedin.com/in/rafael-ferraz-barra
