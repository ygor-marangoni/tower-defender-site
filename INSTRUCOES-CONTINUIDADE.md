# Instruções de continuidade — Tower Defender Landing Page independente

Este documento é a referência para qualquer novo chat ou pessoa que continue o desenvolvimento da landing page. Antes de alterar o projeto, leia este arquivo por completo e inspecione a implementação atual.

## 1. Escopo e regra principal

- Este arquivo está dentro da versão estática independente. Ao retirar `landing-page-html/` do repositório atual, considere a própria pasta extraída como a raiz do projeto.
- Ela deve usar somente HTML5, CSS3 e JavaScript puro.
- Não introduzir Vue, Nuxt, React, TypeScript, Tailwind, Bootstrap ou frameworks de componentes.
- A aplicação Nuxt original é somente uma referência: não alterar, mover, renomear ou excluir nenhum arquivo dela.
- Depois de separar a pasta, todas as alterações devem acontecer dentro dessa raiz independente.
- A landing page estática deve permanecer independente do Nuxt/Vue e funcionar em um servidor estático simples.
- Não substituir assets reais por placeholders, gradientes genéricos ou imagens semelhantes.
- Não redesenhar por iniciativa própria. A prioridade é preservar o estilo já consensado.

## 2. Referências do produto

- Jogo publicado: <https://tower-defensor.netlify.app/>
- Repositório local usado como referência do jogo: `C:\Users\drz\Desktop\Pessoal\tower-defender`
- Caso o repositório do jogo esteja fora da área permitida pelo ambiente, solicitar autorização antes de acessá-lo ou modificá-lo.
- A landing page representa esse jogo; nomes, torres, modos, estatísticas e ícones devem permanecer coerentes com ele.

## 3. Estrutura estática principal

- `index.html`: marcação semântica da página.
- `css/responsive.css`: grid compartilhado e ajustes responsivos finais.
- `css/sections/modes.css`: seção de modos.
- `css/sections/defenses.css`: seção de defesas e seu slider.
- `js/components/carousel.js`: troca de modo/defesa, dados e controles do slider.
- `js/components/tower-preview.js`: renderização das torres no `canvas`.
- Manter CSS e JavaScript modulares; não concentrar tudo em um arquivo único.

## 4. Grid e alinhamento

- O header e todas as seções depois da primeira dobra seguem o mesmo grid:
  - `max-width: 1648px`;
  - `24px` de margem/padding lateral em cada lado.
- No desktop, os cabeçalhos e conteúdos principais mantêm `44px` de distância das linhas verticais do grid. Exceção: o grid dos seis passos e o callout de Como Jogar encostam nas linhas; somente o cabeçalho dessa seção usa o recuo de `44px`.
- A primeira dobra não deve ser alterada sem solicitação explícita.
- Abaixo de `1000px`, remover linhas verticais decorativas, cruzamentos e paddings internos extras, mas manter os conteúdos a `24px` das bordas da viewport.
- Não permitir scroll horizontal indevido.
- Linhas horizontais que representam divisões gerais devem alcançar a largura total da viewport quando solicitado pelo layout.

## 5. Tipografia e efeitos gerais

- Fonte de interface e textos: `Figtree`.
- Títulos de destaque: `ProtestStrike, Impact, sans-serif`.
- O título “CONHEÇA SUAS DEFESAS” usa obrigatoriamente `ProtestStrike, Impact, sans-serif` em todas as resoluções.
- No mobile, os títulos principais da seção de modos e de defesas usam `36px` e não podem gerar overflow.
- Preservar quebras de linha intencionais e usar quebra equilibrada quando necessário.
- Não usar `box-shadow` nas seções e componentes dessa linguagem visual.
- Preservar foco visível, semântica correta, `alt`, `aria-label` e navegação por teclado.

## 6. Fundos e linhas

- A seção de modos começa em `#0E110E` e progride para `#0E0E11`.
- O fundo não deve voltar ao verde no fim do degradê.
- Da seção seguinte em diante, manter `#0E0E11`, sem quadriculado decorativo.
- No desktop, as linhas estruturais finas e seus pequenos pontos/cruzamentos fazem parte do design.
- Os marcadores `.section-grid-marker` completam as quinas externas das seções e devem permanecer alinhados ao grid de `1648px`.
- Abaixo de `1000px`, as linhas verticais e os cruzamentos decorativos são removidos.
- A divisória mobile entre os cards Futurista e Medieval deve ocupar `100vw`.

## 7. Seção de modos

- Título: “ESCOLHA COMO VOCÊ / VAI SOBREVIVER”.
- O título deve permanecer em no máximo duas linhas e não pode sofrer corte horizontal.
- Ícones reais:
  - Futurista: `space-ship.png`;
  - Medieval: `castle.png`.
- Imagens reais dos cards:
  - modo futurista: asset `futurista-modo`;
  - modo medieval: asset `medieval`.
- A linha horizontal interna separa o conteúdo textual da imagem em cada card.
- Em mobile, existe também uma divisória de largura total separando os dois cards.
- Parágrafos dos cards e introdução usam `14px` no responsivo, com leitura confortável.

## 8. Seção de defesas — desktop

- O título “CONHEÇA SUAS DEFESAS” substitui a necessidade de outro título introdutório dentro do slider.
- O seletor Futurista/Medieval altera tema, cores, dados, torre e textos.
- O estado ativo do toggle tem peso tipográfico maior que o inativo.
- A área de construção não usa quadriculado.
- As torres são renderizadas no `canvas` com os assets reais do jogo.
- No desktop com ponteiro preciso, a ponta da arma acompanha o cursor dentro da área de construção.
- O raio visual varia conforme o alcance da defesa.
- Futurista e Medieval possuem cores próprias e coerentes em campo, bordas, controles e estatísticas.
- Estatísticas usam ícones maiores e divisórias cinzas, não azul-claro.
- Os cards inferiores de arquétipos permanecem visíveis em tablet/desktop, com estado ativo evidente e hover suave.
- As setas desktop e o contador continuam no cabeçalho do slider.

## 9. Seção de defesas — mobile

Regras atuais para telas pequenas, concentradas principalmente em `responsive.css`:

- Até `680px`, ocultar os três cards inferiores de seleção (`.defense-dots`).
- Até `620px`, a navegação deve usar os controles mobile.
- O toggle Futurista/Medieval permanece acima da área de construção.
- As setas de navegação ficam nas laterais da área de construção, centralizadas verticalmente:
  - retroceder na lateral esquerda;
  - avançar na lateral direita;
  - botões com `44px`;
  - deslocamento de `22px`, deixando metade dentro e metade fora da área.
- O fundo das setas é totalmente opaco: `#0E0E11`.
- O contador `01 / 03` fica centralizado abaixo da área de construção.
- Setas e contador devem permanecer sincronizados com o carrossel.
- O CTA “JOGAR NESTE MODO” possui no máximo `260px` e fica centralizado.
- O espaço entre “CONHEÇA SUAS DEFESAS” e o toggle foi reduzido; não reintroduzir o grande vazio anterior.
- A linha decorativa abaixo do título de defesas não aparece no mobile.
- Não alterar o layout de notebook/desktop ao ajustar essas regras.

## 10. Navegação fixa

- No desktop, após a primeira dobra, existe uma navegação flutuante inferior centralizada.
- Ela aparece com animação e funciona como um bottom navigation para as seções da página.
- Não deve cobrir conteúdo importante nem ser aplicada indiscriminadamente ao mobile.

## 11. Conteúdo e interações

- Preservar textos, estados, links e assets já presentes.
- O CTA do jogo aponta para `https://tower-defensor.netlify.app/`.
- O slider deve continuar funcionando por:
  - setas desktop;
  - setas mobile;
  - cards de arquétipos quando visíveis;
  - troca de universo Futurista/Medieval.
- Ao adicionar controles duplicados para layouts diferentes, usar `querySelectorAll` e manter todos sincronizados.
- Respeitar `prefers-reduced-motion`.

## 12. Breakpoints e validação

Validar pelo menos em:

- `1440px`;
- `1280px`;
- `1024px`;
- `1000px`;
- `768px`;
- `680px`;
- `620px`;
- `480px`;
- `375px`;
- `320px`.

Conferir sempre:

- ausência de overflow horizontal;
- conteúdo a `24px` das bordas no responsivo;
- títulos sem cortes;
- imagens e canvas responsivos;
- áreas clicáveis;
- troca de modos e defesas;
- setas laterais mobile;
- contador sincronizado;
- console sem erros;
- assets e caminhos sem `404`;
- desktop preservado após qualquer ajuste mobile.

## 13. Processo recomendado para novos chats

1. Ler este documento por completo.
2. Inspecionar os arquivos existentes antes de editar.
3. Preservar alterações já feitas pelo usuário.
4. Fazer mudanças exclusivamente dentro da raiz desta versão estática, salvo pedido explícito.
5. Usar `apply_patch` para edições pontuais.
6. Validar sintaxe do JavaScript com `node --check`.
7. Conferir balanceamento de chaves CSS.
8. Servir `landing-page-html/` por servidor estático e testar os breakpoints relevantes.
9. Comparar visualmente antes e depois.
10. Informar com clareza o que mudou e confirmar que desktop/Nuxt não foram afetados.

## 14. Comando sugerido para iniciar um novo chat

Use uma mensagem semelhante a esta:

> Leia integralmente `INSTRUCOES-CONTINUIDADE.md` antes de agir. Esta pasta é uma landing page HTML independente; respeite todas as decisões registradas e não crie dependências com o projeto Nuxt original.
