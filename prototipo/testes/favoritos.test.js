document.addEventListener('DOMContentLoaded', async function() {
  const storageKeys = [
    'portalEsportivoFavoriteTeam',
    'portalEsportivoFavorites'
  ];
  const authKey = 'portalEsportivoAuthenticated';
  const results = document.getElementById('test-results');
  const status = document.getElementById('test-status');
  const frame = document.getElementById('app-frame');
  const originalLocalStorage = new Map(
    storageKeys.map(key => [key, localStorage.getItem(key)])
  );
  const originalAuth = sessionStorage.getItem(authKey);
  let passed = 0;
  let failed = 0;

  function report(name, error) {
    const item = document.createElement('li');
    item.className = error ? 'fail' : 'pass';
    item.textContent = error ? `FALHOU: ${name} — ${error.message}` : `PASSOU: ${name}`;
    results.append(item);

    if (error) {
      failed++;
    } else {
      passed++;
    }
  }

  async function test(name, run) {
    try {
      await run();
      report(name);
    } catch (error) {
      report(name, error);
    }
  }

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function appDocument() {
    const appWindow = frame.contentWindow;
    if (!appWindow || appWindow.document.readyState !== 'complete') {
      throw new Error('A página sob teste ainda não terminou de carregar.');
    }
    return appWindow.document;
  }

  function loadPage(fileName) {
    return new Promise(function(resolve, reject) {
      const timeout = window.setTimeout(function() {
        reject(new Error(`Tempo esgotado ao carregar ${fileName}.`));
      }, 10000);

      frame.addEventListener('load', function() {
        window.clearTimeout(timeout);
        resolve();
      }, { once: true });

      frame.src = new URL(`../${fileName}?test=${Date.now()}`, window.location.href).href;
    });
  }

  function restoreStorage() {
    storageKeys.forEach(function(key) {
      const value = originalLocalStorage.get(key);
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    });

    if (originalAuth === null) {
      sessionStorage.removeItem(authKey);
    } else {
      sessionStorage.setItem(authKey, originalAuth);
    }
  }

  try {
    storageKeys.forEach(key => localStorage.removeItem(key));
    sessionStorage.removeItem(authKey);

    await loadPage('favoritos.html');

    await test('A página inicia com o conteúdo privado bloqueado', function() {
      const document = appDocument();
      assert(!document.getElementById('login-gate').classList.contains('d-none'),
        'O formulário de login deveria estar visível.');
      assert(document.getElementById('private-content').classList.contains('d-none'),
        'O conteúdo privado deveria estar oculto.');
    });

    await test('Um formulário de login vazio não libera o conteúdo', function() {
      const document = appDocument();
      document.getElementById('login-form').requestSubmit();
      assert(document.getElementById('private-content').classList.contains('d-none'),
        'O conteúdo foi liberado sem credenciais válidas.');
    });

    await test('Login válido libera o conteúdo privado', function() {
      const document = appDocument();
      document.getElementById('login-email').value = 'teste@example.com';
      document.getElementById('login-password').value = 'senha123';
      document.getElementById('login-form').requestSubmit();
      assert(!document.getElementById('private-content').classList.contains('d-none'),
        'O conteúdo privado não apareceu após o login.');
    });

    await test('Salvar um time favorito exibe o time e persiste a escolha', function() {
      const document = appDocument();
      document.getElementById('favorite-team').value = 'falcões';
      document.getElementById('favorite-team-form').requestSubmit();
      assert(localStorage.getItem('portalEsportivoFavoriteTeam') === 'falcões',
        'A escolha não foi salva no localStorage.');
      assert(document.getElementById('favorite-team-display').textContent.includes('Falcões do Norte'),
        'O time selecionado não apareceu na seção de favoritos.');
    });

    await loadPage('favoritos.html');

    await test('O time favorito permanece após recarregar a página', function() {
      const document = appDocument();
      assert(document.getElementById('favorite-team').value === 'falcões',
        'A seleção não foi restaurada no campo.');
      assert(document.getElementById('favorite-team-display').textContent.includes('Falcões do Norte'),
        'O time salvo não foi exibido após recarregar.');
    });

    await test('Adicionar um jogo cria um cartão e salva o favorito', function() {
      const document = appDocument();
      document.querySelector('.favorite-toggle[data-match-id="final"]').click();
      assert(document.querySelector('#favorites-list [data-match-id="final"]'),
        'O cartão do jogo favorito não foi criado.');
      assert(JSON.parse(localStorage.getItem('portalEsportivoFavorites')).includes('final'),
        'O jogo favorito não foi salvo no localStorage.');
    });

    await loadPage('favoritos.html');

    await test('O jogo favorito permanece após recarregar a página', function() {
      const document = appDocument();
      assert(document.querySelector('#favorites-list [data-match-id="final"]'),
        'O jogo favorito não foi restaurado após recarregar.');
    });

    await test('Remover o time favorito apaga sua escolha salva', function() {
      const document = appDocument();
      document.querySelector('[data-remove-favorite-team]').click();
      assert(localStorage.getItem('portalEsportivoFavoriteTeam') === null,
        'A escolha do time permaneceu salva após a remoção.');
      assert(document.getElementById('favorite-team-display').children.length === 0,
        'O time ainda aparece na seção de favoritos.');
    });

    await test('Sair oculta novamente o conteúdo privado', function() {
      const document = appDocument();
      document.getElementById('logout-button').click();
      assert(document.getElementById('private-content').classList.contains('d-none'),
        'O conteúdo privado continua visível após sair.');
    });

    await loadPage('index.html');

    await test('A página inicial contém navegação e seções principais', function() {
      const document = appDocument();
      assert(document.querySelector('a[href="favoritos.html"]'),
        'O link para a página de favoritos não foi encontrado.');
      ['calendario', 'classificacao', 'contato'].forEach(function(sectionId) {
        assert(document.getElementById(sectionId), `A seção ${sectionId} não foi encontrada.`);
      });
    });

    await test('A página inicial adiciona jogos à lista do calendário', function() {
      const document = appDocument();
      const initialCount = document.querySelectorAll('.matches-list .match-card').length;
      document.getElementById('add-match').click();
      assert(document.querySelectorAll('.matches-list .match-card').length === initialCount + 1,
        'O botão não adicionou um jogo à lista do calendário.');
    });

    await test('O formulário de contato indica campos obrigatórios vazios', function() {
      const document = appDocument();
      const form = document.getElementById('contact-form');
      form.requestSubmit();
      assert(form.querySelectorAll('.is-invalid').length > 0,
        'O formulário não indicou os campos obrigatórios vazios.');
    });

    await test('A página inicial salva e mostra o time favorito', function() {
      const document = appDocument();
      document.getElementById('favorite-team-home').value = 'leões';
      document.getElementById('favorite-team-home-form').requestSubmit();
      assert(localStorage.getItem('portalEsportivoFavoriteTeam') === 'leões',
        'A escolha na página inicial não foi salva.');
      assert(document.getElementById('favorite-team-home-display').textContent.includes('Leões do Oeste'),
        'O time escolhido não apareceu na página inicial.');
    });

    await loadPage('favoritos.html');

    await test('O time escolhido na página inicial aparece nos favoritos', function() {
      const document = appDocument();
      assert(document.getElementById('favorite-team').value === 'leões',
        'A seleção da página inicial não sincronizou com favoritos.');
      assert(document.getElementById('favorite-team-display').textContent.includes('Leões do Oeste'),
        'O time escolhido na página inicial não aparece na lista de favoritos.');
    });
  } catch (error) {
    report('Execução do conjunto de testes', error);
  } finally {
    frame.remove();
    restoreStorage();
    status.textContent = `${passed} teste(s) aprovado(s), ${failed} teste(s) com falha. Os dados anteriores foram restaurados.`;
  }
});
