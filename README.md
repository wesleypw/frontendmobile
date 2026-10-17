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
├─ PROJETO-UC15-HTML-MOBILE-FIRST.md  # Checklist completo do projeto
├─ LICENSE                     # Licença MIT
├─ prototipo/
│  ├─ index.html               # Página principal (Bootstrap 5.3)
│  ├─ favoritos.html           # Página de destaques e favoritos com acesso demonstrativo
│  ├─ assets/
│  │  └─ css/
│  │     └─ style.css          # CSS custom + customização Bootstrap
│  └─ js/
│     ├─ main.js               # JavaScript
│     └─ carrossel-favoritos.js # Login demonstrativo e favoritos
├─ wordpress/
│  └─ tema-filho/              # Tema filho WordPress
│     ├─ style.css
│     ├─ functions.php
│     ├─ theme.json
│     └─ page-home.php
└─ docs/
   ├─ evidencias/              # Diretório para evidências
   └─ relatorio-final.md       # Relatório auditoria
```

## Tecnologias

- **HTML5:** Semântico, acessível, imagens responsivas (srcset/sizes)
- **CSS3:** Custom properties, Bootstrap 5.3.3, responsivo
- **JavaScript ES6+:** Nativo, Bootstrap JS bundle
- **Bootstrap 5.3.3:** Grid, componentes mobile, utilities

> **NOTA:** Projeto limitado a HTML, CSS e JavaScript puro. Os testes automatizados de interface rodam no navegador, sem dependências ou ferramentas de build.

### Executar os testes do portal

1. Na raiz do projeto, inicie um servidor local com `python -m http.server 8000`
2. Abra `http://localhost:8000/prototipo/testes/favoritos.test.html` no navegador
3. Confira o resultado de cada teste na página

O executor testa as páginas `index.html` e `favoritos.html`, incluindo navegação, calendário, validação do contato, login, escolha e persistência do time e favoritos de jogos. Os dados locais existentes são restaurados ao final.

## Funcionalidades

- ✅ Home com destaque
- ✅ Calendário de jogos
- ✅ Classificação
- ✅ Escolha de time favorito na página inicial, sincronizada com a página de favoritos
- ✅ Formulário de contato (Bootstrap validation)
- ✅ Carrossel de jogos e lista de favoritos
- ✅ Acesso demonstrativo à página de favoritos (e-mail válido e senha de 6+ caracteres)
- ✅ Menu mobile (Bootstrap Navbar)
- ✅ Responsivo (Bootstrap breakpoints)
- ✅ Acessível (WCAG 2.2)
- ✅ Tipografia fluida (clamp())
- ✅ Container queries
- ✅ Pointer Events (gestos)
- ✅ Delegação de eventos
- ✅ Imagens responsivas (srcset/sizes, lazy loading)

> **Importante:** o login da página de favoritos é apenas uma demonstração no navegador. Como o projeto é estático, não há validação de credenciais nem proteção real dos arquivos; para produção, implemente autenticação e autorização em um backend.

## Progresso do Projeto

Baseado no PROJETO-UC15-HTML-MOBILE-FIRST.md:
- **Total de itens:** 66
- **Itens concluídos:** 50 (75.8%)
- **Itens não implementados:** 16 (limitação HTML/CSS/JS puro)

### Itens Não Implementados (limitação técnica)
- Git flow (branches, PRs) - Requer comandos Git
- jQuery - Limite: apenas HTML/CSS/JS puro
- WordPress completo - Requer PHP, MySQL, servidor (apenas estrutura e documentação)
- Testes automatizados - Requer Node.js/Playwright
- Publicação em servidor - Requer servidor/domínio

## Bootstrap 5.3 - Integração

### Componentes Utilizados

- **Grid System:** Layout responsivo com container, row, col
- **Navbar:** Menu mobile com collapse
- **Cards:** Jogos
- **Forms:** Formulário de contato com validação
- **Utilities:** Sombras, espaçamento, flexbox

### Performance de Imagens

Todas as imagens implementam:
- **srcset/sizes:** Múltiplas resoluções para diferentes viewports
- **width/height:** Dimensões explícitas para prevenir CLS
- **lazy loading:** Carregamento diferido para imagens abaixo do fold
- **eager loading:** Carregamento imediato para imagens críticas (destaque)

**Exemplo:**
```html
<img src="https://via.placeholder.com/800x400/1e40af/ffffff?text=Jogo+da+Final"
     srcset="https://via.placeholder.com/400x200/1e40af/ffffff?text=Jogo+da+Final 400w,
             https://via.placeholder.com/800x400/1e40af/ffffff?text=Jogo+da+Final 800w,
             https://via.placeholder.com/1200x600/1e40af/ffffff?text=Jogo+da+Final 1200w"
     sizes="(max-width: 576px) 100vw,
            (max-width: 768px) 50vw,
            50vw"
     width="800"
     height="400"
     loading="eager">
```

### Customização

- Variáveis Bootstrap sobrescritas em `:root`
- CSS custom adicional para funcionalidades específicas
- Manutenção de paleta de cores original

### Versão

Bootstrap 5.3.3 via CDN com SRI (Subresource Integrity)

## Conteúdo Fictício

Este projeto utiliza conteúdo fictício para fins educacionais.
