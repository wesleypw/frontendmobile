# Portal Esportivo - Mobile First

## Objetivo

Portal mobile-first para acompanhar uma temporada esportiva, desenvolvido com HTML, CSS, JavaScript puro e Bootstrap 5.3.

## Público-Alvo

- Torcedores que acompanham a temporada pelo celular
- Usuários com necessidades de acessibilidade (teclado, leitor de tela)

## Como Executar

1. Abra o arquivo `prototipo/index.html` diretamente no navegador
2. Ou use um servidor local:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - VS Code: Live Server extension

## Estrutura do Projeto

```
/
├─ README.md                    # Este arquivo
├─ DECISOES.md                 # Registro de decisões técnicas
├─ TESTES.md                   # Plano de testes manuais
├─ CMS.md                      # Documentação WordPress (futuro)
├─ PROJETO-UC15-HTML-MOBILE-FIRST.md  # README original
├─ prototipo/
│  ├─ index.html               # Página principal (Bootstrap 5.3)
│  ├─ assets/
│  │  └─ css/
│  │     └─ style.css          # CSS custom + customização Bootstrap
│  └─ js/
│     └─ main.js               # JavaScript (integração Bootstrap)
├─ wordpress/
│  └─ tema-filho/              # Estrutura para tema filho
└─ docs/
   └─ evidencias/              # Diretório para evidências
```

## Tecnologias

- **HTML5:** Semântico, acessível
- **CSS3:** Custom properties, Bootstrap 5.3.3, responsivo
- **JavaScript ES6+:** Nativo, Bootstrap JS bundle
- **Bootstrap 5.3.3:** Grid, componentes mobile, utilities

## Funcionalidades

- ✅ Home com destaque
- ✅ Calendário de jogos
- ✅ Classificação
- ✅ Formulário de contato (Bootstrap validation)
- ✅ Menu mobile (Bootstrap Navbar)
- ✅ Responsivo (Bootstrap breakpoints)
- ✅ Acessível (WCAG 2.2)

## Bootstrap 5.3 - Integração

### Componentes Utilizados

- **Grid System:** Layout responsivo com container, row, col
- **Navbar:** Menu mobile com collapse
- **Cards:** Notícias e jogos
- **Carousel:** Galeria de fotos
- **Forms:** Formulário de contato com validação
- **Utilities:** Sombras, espaçamento, flexbox

### Customização

- Variáveis Bootstrap sobrescritas em `:root`
- CSS custom adicional para funcionalidades específicas
- Manutenção de paleta de cores original

### Versão

Bootstrap 5.3.3 via CDN com SRI (Subresource Integrity)

## Conteúdo Fictício

Este projeto utiliza conteúdo fictício para fins educacionais.
