# Portal Esportivo - Mobile First

## Objetivo

Portal mobile-first para acompanhar uma temporada esportiva, desenvolvido apenas com HTML, CSS e JavaScript puro.

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
├─ prototipo/
│  ├─ index.html               # Página principal
│  ├─ assets/
│  │  └─ css/
│  │     └─ style.css          # CSS completo
│  └─ js/
│     └─ main.js               # JavaScript
└─ wordpress/
   └─ tema-filho/              # Estrutura para tema filho
```

## Tecnologias

- **HTML5:** Semântico, acessível
- **CSS3:** Custom properties, Flexbox, Grid, responsivo
- **JavaScript ES6+:** Nativo, sem frameworks

## Funcionalidades

- ✅ Home com destaque
- ✅ Notícias com busca e favoritos
- ✅ Calendário de jogos
- ✅ Classificação
- ✅ Galeria de fotos
- ✅ Formulário de contato
- ✅ Responsivo (mobile-first)
- ✅ Acessível (WCAG 2.2)

## Conteúdo Fictício

Este projeto utiliza conteúdo fictício para fins educacionais.
