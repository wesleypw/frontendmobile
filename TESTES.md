# Plano de Testes Manuais

Este documento define os testes manuais para validar o projeto.

## Como Testar

1. Abra `prototipo/index.html` no navegador
2. Siga os cenários de teste abaixo
3. Documente os resultados

## Testes de Funcionalidade

### TM-01: Carregamento da Página
**Passos:**
1. Abrir `prototipo/index.html`
**Esperado:** Página carrega sem erros, todos elementos visíveis
**Observado:** _______________

### TM-02: Navegação por Teclado
**Passos:**
1. Usar `Tab` para navegar
2. Usar `Enter` para ativar links
**Esperado:** Ordem lógica de foco, indicador visível
**Observado:** _______________

### TM-03: Menu Mobile
**Passos:**
1. Reduzir viewport para < 768px
2. Clicar no botão de menu
3. Navegar pelos links
**Esperado:** Menu abre/fecha, links funcionam
**Observado:** _______________

### TM-04: Busca de Notícias
**Passos:**
1. Digitar termo no campo de busca
2. Verificar filtragem
**Esperado:** Notícias filtradas em tempo real
**Observado:** _______________

### TM-05: Favoritos
**Passos:**
1. Clicar no botão de favorito
2. Recarregar página
3. Verificar persistência
**Esperado:** Favorito persiste no localStorage
**Observado:** _______________

### TM-06: Galeria
**Passos:**
1. Clicar em botões próximo/anterior
2. Tentar swipe (touch)
3. Navegar por teclado
**Esperado:** Todos métodos funcionam
**Observado:** _______________

### TM-07: Formulário
**Passos:**
1. Enviar sem preencher campos
2. Preencher campos válidos
3. Enviar
**Esperado:** Validação funciona, sucesso visível
**Observado:** _______________

## Testes de Responsividade

### TR-01: Mobile (320px)
**Viewport:** 320px
**Esperado:** Layout sem scroll horizontal, touch funcional
**Observado:** _______________

### TR-02: Tablet (768px)
**Viewport:** 768px
**Esperado:** Layout adaptado, menu desktop
**Observado:** _______________

### TR-03: Desktop (1920px)
**Viewport:** 1920px
**Esperado:** Layout completo, hover funcional
**Observado:** _______________

## Testes de Acessibilidade

### TA-01: Leitor de Tela
**Ferramenta:** NVDA, JAWS ou VoiceOver
**Esperado:** Conteúdo anunciado corretamente
**Observado:** _______________

### TA-02: Contraste
**Ferramenta:** WebAIM Contrast Checker
**Esperado:** Contraste WCAG AA (4.5:1)
**Observado:** _______________

### TA-03: Zoom
**Passos:** Zoom 200%
**Esperado:** Layout não quebra
**Observado:** _______________

## Testes Cross-Browser

### TB-01: Chrome
**Versão:** 120+
**Esperado:** Funcionalidades completas
**Observado:** _______________

### TB-02: Firefox
**Versão:** 121+
**Esperado:** Funcionalidades completas
**Observado:** _______________

### TB-03: Safari
**Versão:** 17+
**Esperado:** Funcionalidades completas
**Observado:** _______________

### TB-04: Edge
**Versão:** 120+
**Esperado:** Funcionalidades completas
**Observado:** _______________
