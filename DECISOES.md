# Registro de Decisões Técnicas

Este documento registra as decisões técnicas tomadas durante o desenvolvimento do projeto, justificando escolhas e facilitando a manutenção futura.

## HTML Semântico e Viewport

### Viewport Configuration
**Decisão:** Configurar `meta viewport` sem bloquear zoom
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
**Justificativa:** Permite que usuários com necessidades de acessibilidade zoomem a página. Não usar `user-scalable=no` garante conformidade com WCAG 2.2.

### Landmarks
**Decisão:** Usar elementos semânticos HTML5 (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`)
**Justificativa:** Melhora navegação por leitor de tela e SEO. Permite saltar diretamente para seções importantes.

### Hierarquia de Títulos
**Decisão:** Títulos começando em `h1` sem saltar níveis
**Justificativa:** Garante hierarquia coerente para leitores de tela e estrutura de documento correta.

## Sistema CSS

### Custom Properties (CSS Variables)
**Decisão:** Definir tokens globais em `:root`
```css
:root {
  --color-primary: #1e40af;
  --color-secondary: #3b82f6;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --font-family-base: system-ui, sans-serif;
}
```
**Justificativa:** Centraliza design tokens, facilita manutenção e permite theming. Custom properties têm fallback nativo em navegadores modernos.

### Unidades
**Decisão:** Usar `rem` para tipografia e espaçamento, `px` para bordas finas, `%` para larguras relativas
**Justificativa:**
- `rem`: Escala com preferência do usuário, previne problemas de acumulação
- `px`: Bordes finas (< 2px) ficam nítidas em todos os DPIs
- `%`: Layouts fluidos que se adaptam ao container

### Especificidade
**Decisão:** Evitar `!important` global. Usar seletores descritivos.
**Justificativa:** Mantém CSS manutenível e previsível. `!important` só aceitável para overrides específicos de terceiros.

## Layout

### Flexbox vs Grid
**Decisão:**
- Flexbox: Componentes unidimensionais (navegação, listas de cards)
- Grid: Layouts bidimensionais (grade de notícias, calendário)
**Justificativa:** Cada técnica resolve problemas diferentes. Flexbox é ideal para distribuição linear, Grid para composição em 2D.

### Breakpoints
**Decisão:** Breakpoints orientados por conteúdo, não por dispositivos
```css
@media (min-width: 768px) { /* tablet/desktop */ }
@media (min-width: 1024px) { /* desktop grande */ }
```
**Justificativa:** Dispositivos variam. Content-first approach garante layout adequado independentemente do aparelho.

## Responsividade

### Imagens
**Decisão:** Usar `srcset` e `sizes` para imagens responsivas
```html
<img src="small.jpg"
     srcset="small.jpg 480w, medium.jpg 768w, large.jpg 1024w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Descrição">
```
**Justificativa:** Carrega imagem apropriada para cada viewport, economizando banda e melhorando performance.

### Tipografia Fluida
**Decisão:** Usar `clamp()` para fontes fluidas
```css
font-size: clamp(1rem, 2.5vw, 1.5rem);
```
**Justificativa:** Fonte escala suavemente entre breakpoints sem saltos discretos. Limite inferior garante legibilidade, superior previne excesso.

## Bootstrap 5.3

### Integração
**Decisão:** Usar Bootstrap via CDN com versão fixa (5.3.3)
**Justificativa:** Reduz código boilerplate para grid e componentes. Versão fixa garante estabilidade. CDN não requer build step no protótipo.

### Customização
**Decisão:** Sobrescrever variáveis Bootstrap em CSS custom, não editar arquivos fonte
**Justificativa:** Atualizações do Bootstrap não quebram customizações. Mantém separação entre framework e código do projeto.

### Custo vs Benefício
**Decisão:** Bootstrap usado apenas onde reduz complexidade significativa
**Justificativa:** Evitar dependência desnecessária. Componentes simples implementados em CSS próprio reduzem bundle size.

## JavaScript

### Eventos
**Decisão:** Usar eventos nativos, evitar duplicação touch/click
```javascript
// Usar 'click' (dispara em touch e mouse)
button.addEventListener('click', handler);
```
**Justificativa:** Navegadores modernos convertem touch em click automaticamente. Listener único simplifica código.

### Segurança
**Decisão:** Nunca inserir HTML do usuário diretamente. Usar `textContent` ou validação rigorosa.
**Justificativa:** Previne XSS. Se HTML for necessário, sanitizar com biblioteca como DOMPurify.

### Pointer Events
**Decisão:** Usar Pointer Events para gestos com fallback por botão
**Justificativa:** API unificada para mouse, touch e pen. Fallback garante acessibilidade para teclado.

## Acessibilidade

### Foco
**Decisão:** Manter indicador de foco visível sempre
```css
:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
```
**Justificativa:** Usuários de teclado precisam saber onde estão. `:focus-visible` não afeta usuários de mouse.

### Contraste
**Decisão:** Verificar contraste WCAG AA (4.5:1 para texto normal, 3:1 para grande)
**Justificativa:** Garante legibilidade para usuários com baixa visão. Ferramenta: WebAIM Contrast Checker.

### Reduzir Movimento
**Decisão:** Respeitar `prefers-reduced-motion`
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
**Justificativa:** Usuários com vestibulares ou sensibilidade a movimento podem desabilitar animações.

## Performance

### Carregamento Crítico
**Decisão:** CSS inline no `<head>`, JS deferido no final do `<body>`
**Justificativa:** CSS é render-blocking e necessário para evitar FOUC. JS não bloqueia renderização.

### Lazy Loading
**Decisão:** Usar `loading="lazy"` em imagens abaixo do fold
```html
<img src="image.jpg" loading="lazy" alt="...">
```
**Justificativa:** Carrega imagens apenas quando necessário, melhorando LCP.

## WordPress

### Tema Filho
**Decisão:** Criar tema filho do tema pai (ex: Twenty Twenty-Four)
**Justificativa:** Atualizações do tema pai não sobrescrevem customizações. Boa prática WordPress.

### Plugins
**Decisão:** Usar plugins essenciais apenas, documentando cada um
**Justificativa:** Cada plugin adiciona superfície de ataque e pode impactar performance. Documentação facilita rollback.

## Testes

### Automatização
**Decisão:** Playwright para testes E2E
**Justificativa:** Suporta múltiplos navegadores (Chromium, Firefox, WebKit) e dispositivos móveis. API moderna e confiável.

### Locators
**Decisão:** Usar locators semânticos (role, text, label) não seletores CSS frágeis
```javascript
await page.getByRole('button', { name: 'Enviar' }).click();
```
**Justificativa:** Testes mais robustos a mudanças de implementação. Acessibilidade nativa.

## Versão e Release

### Tags
**Decisão:** Usar tags semânticas (v1.0.0, v1.1.0) para releases
**Justificativa:** Permite rollback e rastreamento de versões publicadas.

## Histórico de Alterações

| Data | Decisão | Impacto |
|------|---------|---------|
| 2026-10-08 | Configuração inicial do projeto | Estrutura base criada |
