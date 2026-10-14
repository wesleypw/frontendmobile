# Plano de Testes Manuais

Este documento define os testes manuais para validar o projeto com Bootstrap 5.3.

## Como Testar

1. Abra `prototipo/index.html` no navegador
2. Siga os cenários de teste abaixo
3. Documente os resultados

## Testes de Funcionalidade

### TM-01: Carregamento da Página
**Passos:**
1. Abrir `prototipo/index.html`
**Esperado:** Página carrega sem erros, Bootstrap CSS/JS carregados, todos elementos visíveis
**Observado:** _______________

### TM-02: Navegação por Teclado
**Passos:**
1. Usar `Tab` para navegar
2. Usar `Enter` para ativar links
**Esperado:** Ordem lógica de foco, indicador visível, Bootstrap foco funciona
**Observado:** _______________

### TM-03: Menu Mobile (Bootstrap Navbar)
**Passos:**
1. Reduzir viewport para < 768px
2. Clicar no botão de menu (navbar-toggler)
3. Navegar pelos links
4. Clicar em link para fechar
**Esperado:** Menu abre/fecha com animação Bootstrap, links funcionam, acessível por teclado
**Observado:** _______________

### TM-04: Formulário (Bootstrap Validation)
**Passos:**
1. Enviar sem preencher campos
2. Preencher campos válidos
3. Enviar
**Esperado:** Validação Bootstrap funciona (classes is-invalid), feedback visível, sucesso visível
**Observado:** _______________

### TM-05: Grid Responsivo
**Passos:**
1. Ajustar viewport para diferentes tamanhos
2. Verificar layout de cards
**Esperado:** Grid Bootstrap se adapta (1 col mobile, 2 col tablet/desktop)
**Observado:** _______________

## Testes de Responsividade (Bootstrap Breakpoints)

### TR-01: Extra Small (< 576px)
**Viewport:** 320px
**Esperado:** 1 coluna de cards, menu mobile, sem scroll horizontal
**Observado:** _______________

### TR-02: Small (≥ 576px)
**Viewport:** 576px
**Esperado:** 1 coluna de cards, menu mobile
**Observado:** _______________

### TR-03: Medium (≥ 768px)
**Viewport:** 768px
**Esperado:** 2 colunas de cards, menu desktop (navbar-expand-md)
**Observado:** _______________

### TR-04: Large (≥ 992px)
**Viewport:** 992px
**Esperado:** 2 colunas de cards, layout completo
**Observado:** _______________

### TR-05: Extra Large (≥ 1200px)
**Viewport:** 1200px
**Esperado:** Layout completo, container Bootstrap máximo
**Observado:** _______________

## Testes de Acessibilidade

### TA-01: Leitor de Tela
**Ferramenta:** NVDA, JAWS ou VoiceOver
**Esperado:** Conteúdo anunciado corretamente, componentes Bootstrap acessíveis
**Observado:** _______________

### TA-02: Contraste
**Ferramenta:** WebAIM Contrast Checker
**Esperado:** Contraste WCAG AA (4.5:1), cores Bootstrap custom verificadas
**Observado:** _______________

### TA-03: Zoom
**Passos:** Zoom 200%
**Esperado:** Layout não quebra, Bootstrap utilities funcionam
**Observado:** _______________

### TA-04: Skip Link
**Passos:** Pressionar Tab no carregamento
**Esperado:** Skip link focável, leva ao conteúdo principal
**Observado:** _______________

## Testes Cross-Browser

### TB-01: Chrome 120+
**Esperado:** Funcionalidades completas, Bootstrap funciona
**Observado:** _______________

### TB-02: Firefox 121+
**Esperado:** Funcionalidades completas, Bootstrap funciona
**Observado:** _______________

### TB-03: Safari 17+
**Esperado:** Funcionalidades completas, Bootstrap funciona
**Observado:** _______________

### TB-04: Edge 120+
**Esperado:** Funcionalidades completas, Bootstrap funciona
**Observado:** _______________

## Testes Específicos Bootstrap

### TBS-01: Utilities Classes
**Passos:** Verificar uso de classes utilitárias (shadow, rounded, etc.)
**Esperado:** Classes aplicam estilos corretamente
**Observado:** _______________

### TBS-02: Custom Variables
**Passos:** Inspecionar CSS, verificar variáveis custom sobrescrevem Bootstrap
**Esperado:** --bs-primary custom definido, aplicado corretamente
**Observado:** _______________

### TBS-03: Breakpoints
**Passos:** Testar em cada breakpoint Bootstrap
**Esperado:** Layout se adapta conforme especificado
**Observado:** _______________

### TBS-04: JavaScript Bundle
**Passos:** Verificar console por erros do Bootstrap JS
**Esperado:** Sem erros, componentes funcionam (navbar)
**Observado:** _______________
