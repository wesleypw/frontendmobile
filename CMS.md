# Documentação WordPress

Este documento documenta a implementação WordPress do portal, incluindo ambiente, tema, plugins, usuários e procedimentos de backup.

## Ambiente Local

### Requisitos
- PHP 8.0+
- MySQL 5.7+ ou MariaDB 10.3+
- Apache ou Nginx
- WordPress 6.4+

### Instalação Local

#### Opção 1: LocalWP (Recomendado)
1. Baixar e instalar [LocalWP](https://localwp.com/)
2. Criar novo site "portal-esportivo"
3. Configurar PHP 8.0+ e MySQL 5.7+
4. Acessar admin em `http://portal-esportivo.local/wp-admin`

#### Opção 2: XAMPP
1. Instalar [XAMPP](https://www.apachefriends.org/)
2. Baixar WordPress em [wordpress.org](https://wordpress.org/download/)
3. Extrair em `htdocs/portal-esportivo`
4. Criar banco de dados via phpMyAdmin
5. Configurar `wp-config.php`

### wp-config.php
```php
define('DB_NAME', 'portal_esportivo');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
define('WP_DEBUG', false);
```

**IMPORTANTE:** Nunca commitar `wp-config.php` com credenciais reais. Usar variáveis de ambiente em produção.

## Versões

| Componente | Versão Local | Versão Produção |
|------------|--------------|-----------------|
| WordPress | 6.4.2 | 6.4.2 |
| PHP | 8.1 | 8.1 |
| MySQL | 8.0 | 8.0 |
| Apache | 2.4 | 2.4 |

## Diferenças Host Local vs Produção

### Local
- HTTP (sem HTTPS)
- Debug habilitado
- Cache desabilitado
- Plugins de desenvolvimento ativos

### Produção
- HTTPS obrigatório (Let's Encrypt ou certificado pago)
- Debug desabilitado
- Cache habilitado (plugin de cache)
- Plugins de desenvolvimento removidos
- CDN para assets estáticos

## Banco de Dados

### Estrutura Principal
- `wp_posts`: Conteúdo (notícias, páginas)
- `wp_postmeta`: Metadados de posts
- `wp_terms`: Categorias e tags
- `wp_users`: Usuários do sistema
- `wp_options`: Configurações do site

### Backup do Banco

```bash
# Exportar
mysqldump -u root -p portal_esportivo > backup_$(date +%Y%m%d).sql

# Importar
mysql -u root -p portal_esportivo < backup_20261008.sql
```

### Plugin Recomendado: UpdraftPlus
- Automatiza backups
- Backup para Google Drive, Dropbox, etc.
- Restauração com um clique

## Uploads

### Localização
`wp-content/uploads/`

### Backup
```bash
# Comprimir uploads
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz wp-content/uploads/

# Restaurar
tar -xzf uploads_backup_20261008.tar.gz
```

### Limite de Upload
Configurar em `php.ini`:
```ini
upload_max_filesize = 10M
post_max_size = 10M
```

## Tema

### Tema Pai: Twenty Twenty-Four
Escolhido por:
- Acessibilidade WCAG 2.1 AA nativa
- Suporte a blocos (Gutenberg)
- Performance otimizada
- Manutenção ativa pela Automattic

### Tema Filho: Portal Esportivo

#### Estrutura Atual (Implementada)
```
wordpress/tema-filho/
├─ style.css              # CSS custom e import do pai
├─ functions.php          # Hooks e funcionalidades
├─ theme.json             # Configurações do editor de blocos
├─ page-home.php          # Template personalizado da página inicial
└─ functions.php          # CPT, Taxonomia, Meta Boxes
```

#### Funcionalidades Implementadas em functions.php
- Enfileirar scripts e estilos
- **Custom Post Type: Jogos** - Para gerenciar jogos do campeonato
- **Taxonomia: Times** - Para categorizar jogos por time
- **Meta Boxes:** Data, horário e estádio para cada jogo

#### Arquivos Criados
- ✅ `style.css` - CSS do tema filho
- ✅ `functions.php` - Funções PHP completas
- ✅ `theme.json` - Configurações do editor de blocos
- ✅ `page-home.php` - Template da página inicial

#### Estrutura Futura (para implementação completa)
```
wordpress/tema-filho/
├─ style.css              # CSS custom e import do pai
├─ functions.php          # Hooks e funcionalidades
├─ theme.json             # Configurações do editor de blocos
├─ page-home.php          # Template personalizado da página inicial
├─ index.php              # Template principal
├─ single.php             # Template de post individual
├─ page.php               # Template de página
├─ archive.php            # Template de arquivo
├─ assets/
│  ├─ css/
│  │  └─ custom.css       # CSS adicional
│  └─ js/
│     └─ main.js          # JavaScript custom
└─ screenshot.png         # Preview do tema
```

#### style.css
```css
/*
Theme Name: Portal Esportivo
Theme URI: https://exemplo.com
Description: Tema filho do Twenty Twenty-Four para portal esportivo
Author: Seu Nome
Author URI: https://exemplo.com
Template: twentytwentyfour
Version: 1.0.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: portal-esportivo
*/

/* Importar CSS do tema pai */
@import url('../twentytwentyfour/style.css');

/* Customizações */
:root {
  --color-primary: #1e40af;
  --color-secondary: #3b82f6;
}

/* Overrides específicos */
/* ... */
```

#### functions.php
```php
<?php
/**
 * Portal Esportivo - Tema Filho
 */

// Enfileirar assets
function portal_esportivo_enqueue_assets() {
    wp_enqueue_style(
        'portal-esportivo-style',
        get_stylesheet_uri(),
        array('twentytwentyfour-style'),
        '1.0.0'
    );

    wp_enqueue_script(
        'portal-esportivo-main',
        get_stylesheet_directory_uri() . '/assets/js/main.js',
        array(),
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'portal_esportivo_enqueue_assets');

// Configurar theme.json
function portal_esportivo_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
}
add_action('after_setup_theme', 'portal_esportivo_setup');
```

### theme.json
```json
{
    "version": 2,
    "settings": {
        "color": {
            "palette": [
                {
                    "slug": "primary",
                    "color": "#1e40af",
                    "name": "Primary"
                },
                {
                    "slug": "secondary",
                    "color": "#3b82f6",
                    "name": "Secondary"
                }
            ]
        },
        "typography": {
            "fontSizes": [
                {
                    "slug": "large",
                    "size": "2.5rem",
                    "name": "Large"
                }
            ]
        }
    }
}
```

## Plugins

### Plugins Essenciais

| Plugin | Versão | Propósito | Justificativa |
|--------|--------|-----------|---------------|
| Akismet | 5.3 | Anti-spam | Proteção contra spam em comentários |
| UpdraftPlus | 1.23 | Backup | Backup automatizado do banco e uploads |
| WP Super Cache | 1.10 | Cache | Melhora performance com cache estático |
| Autoptimize | 3.1 | Otimização | Minifica CSS/JS, otimiza imagens |
| Rank Math SEO | 3.0 | SEO | Melhora SEO com metadados e sitemap |

### Plugins de Desenvolvimento (Não em Produção)
| Plugin | Versão | Propósito |
|--------|--------|-----------|
| Query Monitor | 3.14 | Debug de queries e performance |
| WP Debugging | 2.0 | Debug avançado |

### Procedência e Segurança
- Baixar apenas de [wordpress.org/plugins](https://wordpress.org/plugins/)
- Verificar avaliações, última atualização e suporte ativo
- Manter atualizados sempre
- Remover plugins não utilizados

### Impacto e Rollback
- **Akismet:** Sem impacto visual. Rollback: desativar.
- **UpdraftPlus:** Sem impacto visual. Rollback: restaurar backup manual.
- **WP Super Cache:** Impacta cache. Rollback: limpar cache.
- **Autoptimize:** Pode quebrar se minificação agressiva. Rollback: desativar e limpar cache.
- **Rank Math SEO:** Modifica metadados. Rollback: desativar (metadados permanecem).

## Usuários

### Roles do WordPress

| Role | Capacidades | Uso no Projeto |
|------|-------------|----------------|
| Super Admin | Total acesso | Desenvolvedor principal |
| Administrator | Gerenciar todo site | Administrador do conteúdo |
| Editor | Publicar/editar posts/páginas | Editor de conteúdo |
| Author | Publicar/editar próprios posts | Autor de notícias |
| Contributor | Editar posts (sem publicar) | Colaborador |
| Subscriber | Apenas perfil | Leitor/Usuário |

### Usuários de Teste

#### editor-teste
- **Role:** Editor
- **Email:** editor@exemplo.com
- **Senha:** (configurar localmente)
- **Tarefas:** Criar e editar notícias, gerenciar mídia

#### autor-teste
- **Role:** Author
- **Email:** autor@exemplo.com
- **Senha:** (configurar localmente)
- **Tarefas:** Criar rascunhos de notícias

**IMPORTANTE:** Usuários de teste com menor privilégio para suas tarefas (princípio do menor privilégio).

## Plano de Backup/Restauração

### Backup Automatizado (UpdraftPlus)
- **Frequência:** Diário
- **Retenção:** 7 dias
- **Destino:** Google Drive
- **Componentes:** Banco de dados, uploads, plugins, temas

### Backup Manual (Antes de Mudanças Críticas)
```bash
# Banco de dados
mysqldump -u root -p portal_esportivo > backup_manual.sql

# Uploads
tar -czf uploads_manual.tar.gz wp-content/uploads/

# Temas e Plugins
tar -czf themes_plugins_manual.tar.gz wp-content/themes/ wp-content/plugins/
```

### Restauração

#### Via UpdraftPlus
1. Acessar Configurações > UpdraftPlus Backups
2. Selecionar backup a restaurar
3. Clicar em "Restore"
4. Seguir instruções

#### Manual
```bash
# Restaurar banco
mysql -u root -p portal_esportivo < backup_manual.sql

# Restaurar uploads
tar -xzf uploads_manual.tar.gz -C wp-content/

# Restaurar temas/plugins
tar -xzf themes_plugins_manual.tar.gz -C wp-content/
```

## Staging

### Configuração Staging
- **URL:** `staging.exemplo.com`
- **Banco:** `portal_esportivo_staging`
- **Ambiente:** Similar à produção
- **Dados:** Cópia anonimizada da produção

### Processo de Deploy
1. Fazer backup completo de produção
2. Criar ambiente staging (se não existir)
3. Migrar conteúdo de produção para staging
4. Testar mudanças em staging
5. Aplicar mudanças em produção
6. Smoke test em produção
7. Monitorar por 24h

### Migração de URLs

#### Plugin: Better Search Replace
1. Instalar em staging
2. Buscar: `https://exemplo.com`
3. Substituir por: `https://staging.exemplo.com`
4. Selecionar todas as tabelas
5. Executar

#### Via SQL (Alternativa)
```sql
UPDATE wp_options SET option_value = REPLACE(option_value, 'https://exemplo.com', 'https://staging.exemplo.com');
UPDATE wp_postmeta SET meta_value = REPLACE(meta_value, 'https://exemplo.com', 'https://staging.exemplo.com');
UPDATE wp_posts SET post_content = REPLACE(post_content, 'https://exemplo.com', 'https://staging.exemplo.com');
```

## Produção

### Publicação
1. Verificar HTTPS funcionando
2. Limpar cache
3. Testar formulários
4. Testar navegação mobile
5. Verificar SEO (meta tags, sitemap)
6. Executar smoke test

### Smoke Test
- [ ] Home carrega corretamente
- [ ] Links funcionam
- [ ] Formulários enviam
- [ ] Imagens carregam
- [ ] Console sem erros
- [ ] Google PageSpeed Insights verde
- [ ] SEO ok (title, description, canonical)

### Monitoramento
- **Uptime:** UptimeRobot ou similar
- **Performance:** Google PageSpeed Insights mensal
- **SEO:** Google Search Console
- **Logs:** Access logs e error logs do servidor

### Manutenção
- Atualizar WordPress mensalmente
- Atualizar plugins mensalmente
- Atualizar temas quando disponível
- Backup antes de atualizações
- Testar após atualizações

## Rollback

### Rota de Rollback

#### Versão Anterior (Tag Git)
```bash
# Reverter para tag anterior
git checkout v1.0.0

# Re-deployar
# (procedimento específico do host)
```

#### Backup UpdraftPlus
1. Acessar UpdraftPlus
2. Selecionar backup anterior
3. Restaurar
4. Limpar cache

#### Backup Manual
```bash
# Restaurar banco
mysql -u root -p portal_esportivo < backup_anterior.sql

# Restaurar uploads
tar -xzf uploads_anterior.tar.gz -C wp-content/
```

### Procedimento de Rollback
1. Identificar versão estável anterior
2. Notificar usuários (manutenção programada)
3. Fazer backup do estado atual (caso precise voltar)
4. Executar rollback
5. Smoke test completo
6. Monitorar por 24h
7. Documentar incidente

## Segurança

### Não Commitar
- `wp-config.php` (credenciais)
- `.htaccess` (configurações específicas)
- `wp-content/uploads/` (arquivos de usuários)
- `wp-content/plugins/` (exceto plugins custom)
- `wp-content/advanced-cache.php`
- `wp-content/db.php`

### Credenciais em Produção
Usar variáveis de ambiente em `wp-config.php`:
```php
define('DB_NAME', getenv('DB_NAME'));
define('DB_USER', getenv('DB_USER'));
define('DB_PASSWORD', getenv('DB_PASSWORD'));
define('DB_HOST', getenv('DB_HOST'));
```

### Hardening
- Limitar tentativas de login (plugin: Limit Login Attempts Reloaded)
- Forçar HTTPS (plugin: Really Simple SSL)
- Remover versão do WordPress do source
- Desabilitar XML-RPC se não necessário
- Proteger `wp-admin` com IP whitelist ou 2FA

## Documentação Adicional

- [WordPress Codex](https://codex.wordpress.org/)
- [Developer Resources](https://developer.wordpress.org/)
- [Theme Handbook](https://developer.wordpress.org/themes/)
- [Plugin Handbook](https://developer.wordpress.org/plugins/)
