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
**Decisão:** Usar elementos semânticos HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)
**Justificativa:** Melhora navegação por leitor de tela e SEO. Permite saltar diretamente para seções importantes.

### Hierarquia de Títulos
**Decisão:** Títulos começando em `h1` sem saltar níveis
**Justificativa:** Garante hierarquia coerente para leitores de tela e estrutura de documento correta.

## Bootstrap 5.3 - INTEGRAÇÃO

### Versão e Origem
**Decisão:** Usar Bootstrap 5.3.3 via CDN
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YcpQKjkNbBR5q4M2KuS8+0Wv4N8d8d4f0f3F3"
      crossorigin="anonymous">
```
**Justificativa:**
- Versão fixa garante estabilidade
- CDN com SRI (Subresource Integrity) para segurança
- Não requer build step no protótipo
- Licença MIT (Open Source)

### Componentes Bootstrap Utilizados

#### 1. Grid System
**Decisão:** Usar sistema de grid do Bootstrap (`container`, `row`, `col`)
```html
<div class="container">
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">...</div>
  </div>
</div>
```
**Justificativa:**
- Reduz significativamente código CSS custom
- Breakpoints pré-definidos (576px, 768px, 992px, 1200px, 1400px)
- Responsividade out-of-the-box
- Utilities para gap (`g-4`)

**Comparação com CSS Próprio:**
- **CSS Próprio:** ~50 linhas para grid responsivo
- **Bootstrap:** ~5 linhas com classes utilitárias
- **Custo:** Dependência externa, mas reduz manutenção

#### 2. Navbar Mobile
**Decisão:** Usar Bootstrap Navbar com collapse
```html
<nav class="navbar navbar-expand-md navbar-dark bg-primary-dark">
  <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
```
**Justificativa:**
- Menu mobile funcional sem JavaScript custom
- Suporte nativo a ARIA
- Transições suaves integradas
- Acessibilidade completa (teclado, leitor de tela)

**Comparação com CSS Próprio:**
- **CSS Próprio:** ~100 linhas (HTML + CSS + JS)
- **Bootstrap:** ~15 linhas + JS bundle
- **Custo:** JS bundle extra (~25KB), mas componente completo e testado

#### 3. Cards
**Decisão:** Usar Bootstrap Cards para jogos
```html
<div class="card h-100 shadow">
  <img class="card-img-top">
  <div class="card-body">...</div>
</div>
```
**Justificativa:**
- Layout consistente sem CSS custom
- Classes utilitárias para sombra (`shadow`), altura (`h-100`)
- Responsividade automática

**Comparação com CSS Próprio:**
- **CSS Próprio:** ~80 linhas para cards custom
- **Bootstrap:** ~10 linhas
- **Custo:** Estrutura HTML ligeiramente mais verbosa

#### 4. Formulário com Validação
**Decisão:** Usar Bootstrap form controls + validação custom
```html
<input class="form-control" required>
<div class="invalid-feedback">Mensagem de erro</div>
```
**Justificativa:**
- Estilo consistente sem CSS custom
- Classes utilitárias para estados (`is-invalid`, `is-valid`)
- Foco visível integrado

**Comparação com CSS Próprio:**
- **CSS Próprio:** ~60 linhas para formulário
- **Bootstrap:** ~20 linhas
- **Custo:** Nenhum significativo

### Customização de Bootstrap

#### Sobrescrita de Variáveis
**Decisão:** Sobrescrever variáveis Bootstrap em `:root` em vez de editar arquivos fonte
```css
:root {
  --bs-primary: #1e40af;
  --bs-secondary: #3b82f6;
  --bs-font-sans-serif: system-ui, sans-serif;
}
```
**Justificativa:**
- Atualizações do Bootstrap não quebram customizações
- Mantém separação entre framework e código do projeto
- Fácil de versionar e manter

#### Não Sobrescrever Globalmente
**Decisão:** Evitar `!important` e sobrescritas globais frágeis
**Justificativa:**
- Mantém especificidade previsível
- Facilita debugging
- Evita conflitos com futuras atualizações

### Custo vs Benefício

**Benefícios:**
- Redução de ~400 linhas de CSS custom
- Componentes testados e acessíveis
- Desenvolvimento mais rápido
- Consistência visual garantida

**Custos:**
- Dependência externa (CDN)
- Bundle JavaScript extra (~25KB gzipped)
- Classes HTML mais verbosas
- Curva de aprendizado para equipe

**Decisão Final:** Bootstrap vale a pena para este projeto devido à redução significativa de código custom e garantia de acessibilidade nos componentes móveis (navbar, carousel).

## CSS Custom (Adicional ao Bootstrap)

### Custom Properties
**Decisão:** Manter tokens custom além de Bootstrap
```css
:root {
  --color-primary: #1e40af;
  --color-secondary: #3b82f6;
  --spacing-md: 1rem;
}
```
**Justificativa:**
- Facilita theming
- Mantém consistência visual
- Permite transições suaves entre temas

### Skip Link
**Decisão:** Implementar skip link custom
```css
.skip-link {
  position: absolute;
  top: -100%;
  transition: top 0.15s;
}
.skip-link:focus {
  top: 0;
}
```
**Justificativa:** Bootstrap não fornece skip link nativo. Essencial para acessibilidade.

### Animações Custom
**Decisão:** Animar borda de jogo ao vivo
```css
@keyframes pulse-border {
  0%, 100% { border-left-color: var(--bs-danger); }
  50% { border-left-color: #6b7280; }
}
```
**Justificativa:** Bootstrap não fornece animações específicas. Necessário para indicar jogo ao vivo.

## JavaScript

### Eventos
**Decisão:** Usar eventos nativos, evitar duplicação touch/click
**Justificativa:** Navegadores modernos convertem touch em click automaticamente. Listener único simplifica código.

### Segurança
**Decisão:** Nunca inserir HTML do usuário diretamente. Usar `textContent`
**Justificativa:** Previne XSS. Se HTML for necessário, sanitizar com biblioteca como DOMPurify.

### Integração com Bootstrap
**Decisão:** Usar Bootstrap JavaScript bundle para componentes (navbar, carousel)
**Justificativa:** Componentes Bootstrap requerem JS bundle para funcionar. Não reimplementar funcionalidade já testada.

## Acessibilidade

### Foco
**Decisão:** Manter indicador de foco visível com `:focus-visible`
```css
*:focus-visible {
  outline: 3px solid var(--bs-primary);
  outline-offset: 2px;
}
```
**Justificativa:** Usuários de teclado precisam saber onde estão. Bootstrap já foca, mas customização melhora visibilidade.

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
**Decisão:** Bootstrap CSS no `<head>`, JS bundle no final do `<body>`
**Justificativa:** CSS é render-blocking e necessário para evitar FOUC. JS não bloqueia renderização.

### Lazy Loading
**Decisão:** Usar `loading="lazy"` em imagens abaixo do fold
```html
<img loading="lazy">
```
**Justificativa:** Carrega imagens apenas quando necessário, melhorando LCP.

## WordPress

### Tema Filho
**Decisão:** Criar tema filho do tema pai (ex: Twenty Twenty-Four)
**Justificativa:** Atualizações do tema pai não sobrescrevem customizações. Boa prática WordPress.

## Histórico de Alterações

| Data | Decisão | Impacto |
|------|---------|---------|
| 2026-10-08 | Configuração inicial do projeto | Estrutura base criada |
| 2026-10-13 | Integração Bootstrap 5.3.3 | Redução de ~400 linhas CSS, componentes móveis implementados |
| 2026-10-14 | Adição de tipografia fluida | Melhor responsividade em diferentes viewports |
| 2026-10-14 | Implementação de container queries | Cards de jogos adaptam ao tamanho do container |
| 2026-10-14 | Delegação de eventos em lista dinâmica | Melhor performance para itens criados dinamicamente |
| 2026-10-14 | Pointer Events para gestos | Swipe em cards de jogos com feedback visual |
| 2026-10-14 | jQuery 4.0 para interações específicas | Demonstração de conhecimento da biblioteca (removido - projeto limitado a HTML/CSS/JS puro) |
