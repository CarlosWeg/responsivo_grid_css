# 🎸 VinylFrame - PWA de Loja de Vinis

![VinylFrame Banner](https://i.imgur.com/GzQ5oXF.png)

**VinylFrame** é uma Progressive Web App (PWA) de uma loja de vinis fictícia, especializada em Rock e Jazz Fusion. O projeto foi desenvolvido com foco em tecnologias web modernas, design responsivo e funcionalidades offline-first.

➡️ **Status do Projeto:** Finalizado ✔️

---

### ✨ Funcionalidades Principais

* **Catálogo de Produtos:** Visualização de vinis com informações detalhadas.
* **Filtragem e Busca Dinâmica:** Filtre por categoria (Rock, Jazz, Raros, etc.) e pesquise em tempo real por título, artista ou gênero.
* **Navegação SPA (Single Page Application):** Transições rápidas entre as seções "Catálogo", "Sobre" e "Contato" sem recarregar a página.
* **Design Totalmente Responsivo:** Experiência otimizada para desktops, tablets e smartphones.
* **Recursos de Progressive Web App (PWA):**
    * **Instalável:** Pode ser adicionado à tela inicial do dispositivo.
    * **Operação Offline:** Navegação básica e visualização de produtos em cache funcionam sem conexão à internet.
    * **Notificações Push:** Código preparado para receber notificações (requer implementação de backend).
    * **Sincronização em Segundo Plano:** O formulário de contato pode registrar envios offline para sincronizar quando a conexão for restaurada.

---

### 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica e acessível.
* **CSS3:** Estilização moderna com Flexbox, Grid Layout e animações.
* **JavaScript (Vanilla):** Toda a interatividade, manipulação do DOM e lógica da aplicação foram feitas sem frameworks.
* **Service Worker API:** Gerenciamento avançado de cache para funcionalidades offline.
* **Web App Manifest:** Para tornar a aplicação instalável.

---

### 🚀 Como Executar Localmente

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/vinylframe.git](https://github.com/seu-usuario/vinylframe.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd vinylframe
    ```

3.  **Inicie um servidor local:**
    > ⚠️ **Importante:** Para que o Service Worker (`sw.js`) funcione corretamente, o projeto precisa ser servido via HTTP/S.
    > A forma mais fácil é usar uma extensão como o **Live Server** no VS Code. Apenas abrir o `index.html` diretamente no navegador não registrará o Service Worker.

4.  **Acesse no navegador:**
    Abra o endereço fornecido pelo seu servidor local (ex: `http://127.0.0.1:5500`).
