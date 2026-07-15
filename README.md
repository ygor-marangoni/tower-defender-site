# Tower Defensor

Landing page estatica do jogo **Tower Defensor**, criada com HTML5, CSS3 e JavaScript puro. A pagina apresenta os modos Futurista e Medieval, as defesas disponiveis, um ranking local de recordes e um tutorial com fluxo de jogo e atalhos.

## Visao geral

O projeto foi separado para funcionar sem frameworks, build step ou dependencias de pacote. Basta abrir o `index.html` em um navegador moderno ou servir a pasta com qualquer servidor estatico.

Principais recursos:

- Hero responsivo com identidade visual do jogo.
- Selecao entre os modos Futurista e Medieval.
- Carousel de defesas com dados, estatisticas e preview em `canvas`.
- Ranking que le recordes salvos no `localStorage`.
- Tutorial com passos de gameplay e modal de atalhos.
- Navegacao principal, navegacao flutuante e suporte a teclado.

## Estrutura

```text
.
├── index.html
├── 404.html
├── llms.txt
├── _headers
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── global.css
│   ├── floating-nav.css
│   ├── motion.css
│   ├── responsive.css
│   └── sections/
└── js/
    ├── main.js
    ├── animations.js
    ├── navigation.js
    ├── storage.js
    └── components/
```

Arquivos importantes:

- `index.html`: estrutura semantica da pagina.
- `css/sections/`: estilos especificos de cada secao.
- `css/responsive.css`: ajustes para tablets e mobile.
- `js/main.js`: inicializacao dos modulos da pagina.
- `js/components/carousel.js`: troca de defesas e modos.
- `js/components/tower-preview.js`: renderizacao das torres no canvas.
- `js/components/records.js`: leitura dos recordes do jogo no `localStorage`.
- `robots.txt` e `sitemap.xml`: descoberta e indexacao por buscadores.
- `llms.txt`: mapa textual das principais secoes para agentes.
- `_headers`: cabecalhos de seguranca para o Cloudflare Pages.

## Como executar

Opcao simples:

1. Abra o arquivo `index.html` diretamente no navegador.

Opcao com servidor estatico:

```bash
npx serve .
```

Ou, se tiver Python instalado:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Desenvolvimento

Este projeto nao usa `npm install`, bundler, TypeScript ou framework frontend. Ao alterar a pagina:

- Mantenha HTML, CSS e JavaScript modulares.
- Preserve os assets reais em `assets/`.
- Evite substituir imagens do jogo por placeholders.
- Teste em desktop e mobile.
- Verifique foco visivel, navegacao por teclado e atributos `aria`.
- Evite scroll horizontal indevido em telas pequenas.

## Recordes locais

A secao de ranking busca valores no `localStorage` usando chaves do jogo:

- `towerDefender.futuristic.bestScore`
- `towerDefender.futuristic.bestWave`
- `towerDefender.medieval.bestScore`
- `towerDefender.medieval.bestWave`

Tambem existe compatibilidade com chaves antigas do modo Futurista:

- `tower-defender.bestScore`
- `tower-defender.bestWave`

## Referencia

Jogo publicado: <https://tower-defender.pages.dev/>

## Status

Projeto estatico configurado para hospedagem no Cloudflare Pages.
